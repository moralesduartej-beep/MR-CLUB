<?php

require_once __DIR__.'/../config/conexion.php';
class Actidivad{
    
    private $conexion;

    public function__copnstruct()
    {
        $conexionDB = new Conexion();
        $this->conrxion = $conexionDB->conectar();
    }

    public function obtenerActividades(){
        $sgl = "SELECT * FROM  actividades ORDER BY fechaEvento ASC";
        $consulta = $this->conexion->prepare($sgl);
        $consulta->execute();
        return $consulta->fetchAll();//el fetchAll trae todas las actividades 


    }

    public function guardar(){
        sql = "INSERT INTO Actividades (nombreActividades,fechaevento,muunicipio)
         VALUES(:nombreActividaad, :fechaevento , :municipio)"
        $consulta = $this->conexion->prepare(sgl);
        return $consulta->execute([
            ":nombreActividad" => $datos['nombreActividad'],
            ":fechaevento" => $datos['fechaevento'],
            ":municipio" => $datos['municipio'],
        ]);
    }
    public function eliminar($idActividad){
    $sql ="DELETE FROM Acividades  WHERE idActividades  = : idActividad";
    $consulta = $this->conexion->prepare($sql);
    $consulta->execute([ ':idActividad ' => $idActividad ]);
    return $consulta->rowCount() > 0;//retorna true si se elimino alguna fila 
  }

  public function editar($datos){
    $sql = "UPDATE actiidades SET nombreActivida, fechaevento = :fechaevento, muniicipio, totalrecaudado = : totalrecaudado WHERE idActividad = :idActividad";
    $consulta = $this->conexion->prepare($sql);
    return $this->execute([
        "nombreActividad" => $datos['nombreActividad'],
        ":fechaevento"=> $datos['fechaevento'],
        "municipio"=> $datos['municipio'],
        "totalrecaudado"=> $datos['totalrecaudado'],
        "idActividad"=> $datos['idActividad'],
    ]);
     if($consulta->rowCount() > 0){
return true;
    }

    $verificar =$this->conexion->prepare('SELECT 1 FROM Actividades WERE idActividades = :idActividades');
    $verificar->execute(['idActividades'=> $datos['idActiidades']]);

    return (bool)$verificar->rowCount(); //retorna true si el registro existe,false si no

}