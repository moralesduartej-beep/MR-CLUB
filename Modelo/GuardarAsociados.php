<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . '/../Modelo/Asociados.php';

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(405);
        throw new Exception("Método HTTP no permitido");
    }

    $json = file_get_contents("php://input");
    $datos = json_decode($json, true);

    if (!is_array($datos) || json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        throw new Exception("Datos JSON inválidos");
    }

    /* Validar los campos requeridos recibidos en minúsculas desde el cliente */
    $campos = ['documento', 'nombres', 'apellidos', 'fechaNacimiento', 'direccionResidencia', 'ciudad', 'telefono', 'email', 'genero', 'Contraseña'];
    
    foreach ($campos as $campo) {
        if (!isset($datos[$campo]) || trim($datos[$campo]) === '') {
            http_response_code(400);
            throw new Exception("Falta el campo requerido: " . $campo);
        }
    }

    if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        throw new Exception("Formato de email inválido");
    }

    $asociado = new Asociados($datos);
    $resultado = $asociado->guardar();
    
    if ($resultado) {
        http_response_code(201);
        echo json_encode(["success" => true, "mensaje" => "Asociado guardado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "mensaje" => "Error al guardar el asociado en BD"]);
    }

} catch (PDOException $e) {
    if ($e->getCode() == '23000') {
        http_response_code(409); // Corregido código de conflicto
        echo json_encode(["success" => false, "mensaje" => "El documento o correo ya se encuentra registrado"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "mensaje" => "Error de BD: " . $e->getMessage()]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "mensaje" => $e->getMessage()]);
}