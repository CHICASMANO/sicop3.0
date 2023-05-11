<?php 
 namespace Controllers;

 use MVC\Router;
 use Exception;
use Model\PlanificarOperacion;

 class PlanificarOperacionController{

    public static function index(Router $router){
        // hasPermission(['SICOP_ADMIIN']);
        $dep_cod = $_SESSION['dep_llave'];
        $orden_ope = PlanificarOperacion::fetchArray("SELECT * FROM coc_ordenes, coc_dep_orden 
                                                    WHERE dep_ord_dependencia = $dep_cod
                                                    AND  ord_codigo = dep_ord_orden
                                                    AND ord_situacion = 1
                                                    AND dep_ord_situacion = 1");

        $orden_mis = PlanificarOperacion::fetchArray("SELECT * FROM coc_area_mision 
                                                    WHERE are_situacion = 1");

        $prop_mis = PlanificarOperacion::fetchArray("SELECT * FROM coc_proposito 
                                                    WHERE prop_situacion = 1 order by prop_descripcion ASC");

        $metodo_ejec = PlanificarOperacion::fetchArray("SELECT * from coc_metodo_ejec 
                                                    WHERE met_ejec_situacion = 1");

        $uni_org = PlanificarOperacion::fetchArray("SELECT * from coc_unidad_organica 
                                                    WHERE uni_org_situacion = 1 ORDER by uni_org_descripcion ASC");

        $instituciones = PlanificarOperacion::fetchArray("SELECT * from coc_instituciones 
                                                    WHERE ins_situacion = 1 ORDER by inst_codigo ASC");

        $departamento = PlanificarOperacion::fetchArray("SELECT * from coc_departamentos
                                                    WHERE dep_situacion = 1 ORDER by dep_codigo ASC");

        $con_dep_llave = PlanificarOperacion::fetchArray("SELECT con_dep_llave FROM con_mdep 
                                                    WHERE con_mdep = $dep_cod");
                                                    
        $cod_dep = $con_dep_llave[0]['con_dep_llave'];
        
        $vehiculos_Asign = PlanificarOperacion::fetchArray("SELECT * FROM vlh_caract_vehiculos, con_mdep, vlh_t_vehiculo, vlh_estado_vehiculo  
                                                    WHERE car_dependencia = con_dep_llave 
                                                    AND car_dependencia = $cod_dep 
                                                    AND car_t_vehiculo = tve_id 
                                                    AND car_estado_vehiculo = est_id_estado 
                                                    AND car_vehi_situacion IN (1,2) 
                                                    AND car_estado_vehiculo IN (1,2) 
                                                    AND car_ubicacion_vehiculo = $cod_dep");



        $router->render('planificar/index', [
            'orden_ope' => $orden_ope,
            'orden_mis' => $orden_mis,
            'prop_mis' => $prop_mis,
            'metodo_ejec' => $metodo_ejec,
            'uni_org' => $uni_org,
            'instituciones' => $instituciones,
            'departamento' => $departamento,
            'vehiculos_Asign' => $vehiculos_Asign,
            
        ]);
    }

    public static function APIcomboOpes(){
        getHeadersApi();
        // hasPermissionApi(['NOMBRE_PERRMISO']);
        $valor= ($_POST);
        //echo json_encode($valor);
        //exit;
        try {
            
            $area_mis = $_POST['area'];
            $sql = "SELECT * FROM coc_operaciones 
                    WHERE ope_area_codigo = $area_mis AND ope_situacion = 1 order by ope_descripcion ASC";
        
            $info = PlanificarOperacion::fetchArray($sql);
        
        
                echo json_encode($info);
         
        
        } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datoss",
        
                "codigo" => 4,
            ]);
        }
    }

    public static function APIcomboMunic(){
        getHeadersApi();
        $valor= ($_POST);
        //echo json_encode($valor);
        //exit;
        try {
            
            $depart_cod = $_POST['departamentos'];
            $sql = "SELECT * FROM coc_municipios
                    WHERE mun_cod_dep = $depart_cod AND mun_situacion = 1 order by mun_desc_lg ASC";
        
            $info = PlanificarOperacion::fetchArray($sql);
        
        
                echo json_encode($info);
         
        
        } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datoss",
        
                "codigo" => 4,
            ]);
        }
    }

    public static function APIbuscar_cat(){
        getHeadersApi();
        $catalogo = filter_var(trim($_GET['catalogo']), FILTER_SANITIZE_NUMBER_INT );
        try {
            
     
            $data = PlanificarOperacion::fetchFirst("SELECT trim(gra_desc_md) as grado, trim(arm_desc_md) as arma,
                                                    trim(per_ape1) || ' ' || trim(per_ape2) || ', ' || trim(per_nom1) || ' ' || trim(per_nom2) as nombre 
                                                    FROM mper inner join grados on per_grado = gra_codigo inner join armas on per_arma = arm_codigo
                                                    WHERE per_catalogo = $catalogo");
            
            echo json_encode($data);
         
        
        } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datoss",
        
                "codigo" => 4,
            ]);
        }
    }

    

    public static function APIcomboLug(){
        getHeadersApi();
        $valor= ($_POST);
        //echo json_encode($valor);
        //exit;
        try {
            
            $mun_codigo = $_POST['municipio'];
            $sql = "SELECT * FROM coc_lugar
                    WHERE lug_cod_mun = $mun_codigo AND lug_situacion = 1 order by lug_descripcion ASC";
        
            $info = PlanificarOperacion::fetchArray($sql);
        
        
                echo json_encode($info);
         
        
        } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datoss",
        
                "codigo" => 4,
            ]);
        }
    }


    public static function APIintituciones(){
        getHeadersApi();
        try {
            
     
            $data = PlanificarOperacion::fetchArray("SELECT * from coc_instituciones 
                                                    WHERE ins_situacion = 1 ORDER by inst_codigo ASC");
            
            echo json_encode($data);
         
        
        } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datoss",
        
                "codigo" => 4,
            ]);
        }
    }



    
    public static function APIVehiculos(){
        getHeadersApi();
        try {
            
            $dep_cod = $_SESSION['dep_llave'];
     
            $con_dep_llave = PlanificarOperacion::fetchArray("SELECT con_dep_llave FROM con_mdep 
            WHERE con_mdep = $dep_cod");
            
            $cod_dep = $con_dep_llave[0]['con_dep_llave'];

            $data = PlanificarOperacion::fetchArray("SELECT * FROM vlh_caract_vehiculos, con_mdep, vlh_t_vehiculo, vlh_estado_vehiculo  
                        WHERE car_dependencia = con_dep_llave 
                        -- AND car_dependencia = $cod_dep 
                        AND car_t_vehiculo = tve_id 
                        AND car_estado_vehiculo = est_id_estado 
                        AND car_vehi_situacion IN (1,2) 
                        AND car_estado_vehiculo IN (1,2) 
                        AND car_ubicacion_vehiculo = $cod_dep");

           // $data = PlanificarOperacion::fetchArray("SELECT * from coc_instituciones 
                                                   // WHERE ins_situacion = 1 ORDER by inst_codigo ASC");
            
            echo json_encode($data);
         
        
        } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datoss",
        
                "codigo" => 4,
            ]);
        }
    }
   /*  public function index2(){
        $valor= ($_POST);
        
        

        
        
    }
 */


 };

    


?>