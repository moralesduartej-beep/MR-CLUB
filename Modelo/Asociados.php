<?php

require_once __DIR__ . '/../Config/conexion.php';

class Asociados {

    private $Documento;
    private $Nombres;
    private $Apellidos;
    private $FechaNacimiento;
    private $DireccionResidencia;
    private $Ciudad;
    private $Telefono;
    private $email;
    private $genero;
    private $Contraseña;

    private $conexion;

    public function __construct($datos) {
        $this->Documento = $datos['Documento'] ?? $datos['documento'] ?? '';
        $this->Nombres = $datos['Nombres'] ?? $datos['nombres'] ?? '';
        $this->Apellidos = $datos['Apellidos'] ?? $datos['apellidos'] ?? '';
        $this->FechaNacimiento = $datos['FechaNacimiento'] ?? $datos['fechaNacimiento'] ?? '';
        $this->DireccionResidencia = $datos['direccionResidencia'] ?? $datos['Direccion'] ?? '';
        $this->Ciudad = $datos['Ciudad'] ?? $datos['ciudad'] ?? '';
        $this->Telefono = $datos['Telefono'] ?? $datos['telefono'] ?? '';
        $this->email = $datos['Email'] ?? $datos['email'] ?? '';
        $this->genero = $datos['Genero'] ?? $datos['genero'] ?? '';
        
        $rawPassword = $datos['Contraseña'] ?? $datos['password'] ?? '';
        $this->Contraseña = password_hash($rawPassword, PASSWORD_DEFAULT);

        $conexionDB = new Conexion();
        $this->conexion = $conexionDB->conectar();
    }

    public function guardar() {
        // Asegúrate de que el nombre de la columna para la contraseña en tu BD MySQL coincida (ej: 'password' o 'Contraseña')
        $sql = "INSERT INTO Asociados
                (documento, nombres, apellidos, fechaNacimiento, direccionResidencia, ciudad, telefono, email, genero, password)
                VALUES
                (:documento, :nombres, :apellidos, :fechaNacimiento, :direccionResidencia, :ciudad, :telefono, :email, :genero, :password)";

        $consulta = $this->conexion->prepare($sql);

        // Corregido: La clave del array ahora coincide con :password
        return $consulta->execute([
            ':documento'           => $this->Documento,
            ':nombres'             => $this->Nombres,
            ':apellidos'           => $this->Apellidos,
            ':fechaNacimiento'     => $this->FechaNacimiento,
            ':direccionResidencia' => $this->DireccionResidencia,
            ':ciudad'              => $this->Ciudad,
            ':telefono'            => $this->Telefono,
            ':email'               => $this->email,
            ':genero'              => $this->genero,
            ':password'            => $this->Contraseña
        ]);
    }
}
?>