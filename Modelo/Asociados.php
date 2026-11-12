<?php

require_once __DIR__ . '/../Config/conexion.php';

class Asociados {

    private $Documento;
    private $Nombres;
    private $Apellidos;
    private $fechaNacimiento;
    private $DireccionResidencia;
    private $Ciudad;
    private $Telefono;
    private $email;
    private $genero;
    private $Contraseña;

    private $conexion;

    public function __construct($datos) {
        $this->documento = $datos['documento'] ?? $datos['documento'] ?? '';
        $this->nombres = $datos['nombres'] ?? $datos['nombres'] ?? '';
        $this->apellidos = $datos['apellidos'] ?? $datos['apellidos'] ?? '';
        $this->fechaNacimiento = $datos['fechaNacimiento'] ?? $datos['fechaNacimiento'] ?? '';
        $this->direccionResidencia = $datos['direccionResidencia'] ?? $datos['direccionResidencia'] ??'';
        $this->ciudad = $datos['ciudad'] ?? $datos['ciudad'] ?? '';
        $this->telefono = $datos['telefono'] ?? $datos['telefono'] ?? '';
        $this->email = $datos['email'] ?? $datos['email'] ?? '';
        $this->genero = $datos['genero'] ?? $datos['genero'] ?? '';
        
        $rawPassword = $datos['Contraseña'] ?? $datos['Contraseña'] ?? '';
        $this->Contraseña = password_hash($rawPassword, PASSWORD_DEFAULT);

        $conexionDB = new Conexion();
        $this->conexion = $conexionDB->conectar();
    }

    public function guardar() {
        // Nombre de la tabla corregido a 'asociados' en minúsculas
        $sql = "INSERT INTO asociados
                (documento, nombres, apellidos, fechaNacimiento, direccionResidencia, ciudad, telefono, email, genero, Contraseña)
                VALUES
                (:documento, :nombres, :apellidos, :fechaNacimiento, :direccionResidencia, :ciudad, :telefono, :email, :genero, :pass)";

        $consulta = $this->conexion->prepare($sql);

        return $consulta->execute([
            ':documento'           => $this->documento,
            ':nombres'             => $this->nombres,
            ':apellidos'           => $this->apellidos,
            ':fechaNacimiento'     => $this->fechaNacimiento,
            ':direccionResidencia' => $this->direccionResidencia,
            ':ciudad'              => $this->ciudad,
            ':telefono'            => $this->telefono,
            ':email'               => $this->email,
            ':genero'              => $this->genero,
            ':pass'          => $this->Contraseña
        ]);
    }
}