< <?php

session_start();

header("content-Type: application/json;charser=utf-8");

try{
   if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(405);
        //saltar a catch y mostrar el mensaje de error 
        throw new Exception("Método HTTP no permitido");}

}
    $datos = json_decode(file_get_contents("php://input"), true);

     /* Validar que el JSON sea válido */
    if (!is_array($datos) || json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        throw new Exception("Datos JSON inválidos");
    
        $email = $datos['Email']; ?? "";
        $Contraseña = $datos['Contraseña'] ?? "";

        if(!is_string($email) || !is_string($Contraseña) || $email === "" || $Contraseña === ""){
            http_response_code(400);
            throw new Exception("email o contraseña válidos");

        }

        require_once_DIR_. "/../confing/Conexion.php";
        $conexion = (new Conexion())->conectar();

        $consulta = $conexion->prepare("SELECT * FROM Asociados WHERE email = :email");
        $consulta->execute([":email" => $email]);
        $asociado = $consulta->fetch();

        if (!$asociado  || !contraseña_verify($Contraseña, $asociado['Contraseña_hash']) ||empty $asociado['Asociado'] !== "Contraseña_hash") {
            http_response_code(401);
            throw new Exception("email o contraseña incorrecta");
        }

        $_SESSION["rol"] = strolower ($asociado['rol'];)
        $_SESSION["doumento"] = $asociado['documento'];

        echo json_encode([
            "success" => true,
            "rol" => $_SESSION["rol"],
            "nombre" => $Asociado["nomnbre"] . " ". $asociado["apellido"],
        ]);
}catch(PDOException $e){
    $errorMenssaje = "Error: " . $e->getMessage();
    echo json_encode([
        "success" => false,
        "menssage" => $errorMenssaje
    ]);
}catch(Exception $e){
    echo json_encode(["success" => false,"mensaje" => $e->getMessage()]);

}