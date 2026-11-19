<?php
require __DIR__ . '/../Config/conexion.php';
$conexion = (new Conexion())->conectar();

$hash = password_hash('123456', PASSWORD_DEFAULT);
$c = $conexion->prepare("UPDATE asociados SET contraseña = :h WHERE email = 'johan@gmail.com'");
$c->execute([':h' => $hash]);

echo "Filas actualizadas: " . $c->rowCount();