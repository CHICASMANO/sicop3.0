<?php 
 namespace Controllers;

 use MVC\Router;
 use Exception;
use Model\MetodoEjecucion;

 class MetodoEjecucionController{

    public static function index(Router $router){

        
        $router->render('inicio/index',[



        ]);
    }


    public static function consultar(){
        getHeadersApi();
        $fecha_inicio = $_GET['fecha_inicio']!= ""?$_GET['fecha_inicio']:date("Y-m-d 00:00:00");
        $fecha_fin = $_GET['fecha_fin']!= ""?$_GET['fecha_fin']:date("Y-m-d 23:59:59");
        
/*         $sql = "SELECT a.met_ejec_codigo, a.met_ejec_descripcion, COUNT(o.ope_pla_met_ejec) as total 
        FROM coc_ope_planificada o, coc_metodo_ejec a 
        WHERE o.ope_pla_met_ejec = a.met_ejec_codigo 
        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5)) 
        and ope_pla_inicia between '$fecha_inicio' AND '$fecha_fin' 
        GROUP BY o.ope_pla_met_ejec, a.met_ejec_descripcion, a.met_ejec_codigo
        ORDER BY met_ejec_codigo ASC

        SELECT ope_pla_area, are_codigo, a.are_descripcion, COUNT(o.ope_pla_area) as total2 
        FROM coc_ope_planificada o, coc_area_mision a 
        WHERE o.ope_pla_area = a.are_codigo 
        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5)) 
        and ope_pla_inicia between '$fecha_inicio' AND '$fecha_fin' 
        GROUP BY o.ope_pla_area, a.are_descripcion, are_codigo 
        ORDER BY are_codigo ASC

        SELECT dep_llave, a.dep_desc_md, dep_desc_lg, dep_clase, dep_desc_ct, COUNT(o.ope_pla_dependencia) as total3 
        FROM coc_ope_planificada o, mdep a 
        WHERE o.ope_pla_dependencia = a.dep_llave 
        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5)) 
        and ope_pla_inicia between '$fecha_inicio' AND '$fecha_fin'  
        GROUP BY o.ope_pla_dependencia, dep_llave, a.dep_desc_md, dep_clase, dep_desc_ct, dep_desc_lg 
        ORDER BY dep_desc_ct ASC, dep_clase desc

        SELECT *         
	    FROM coc_operaciones, coc_ope_planificada, coc_coordenadas2, mdep, grados, mper, coc_proposito
	    WHERE ope_codigo = ope_pla_operacion
	    AND prop_codigo = ope_pla_proposito
	    AND ope_pla_codigo = coo_reporte
	    AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5))
	    AND dep_llave = ope_pla_dependencia
	    AND per_catalogo = ope_pla_cat_responsable
	    AND gra_codigo = per_grado
	    AND ope_pla_inicia BETWEEN '$fecha_inicio' AND '$fecha_fin'
        
        SELECT *         
        FROM coc_area_mision, coc_ope_planificada, coc_coordenadas2, mdep, grados, mper
        WHERE are_codigo=ope_pla_area 
        AND ope_pla_codigo = coo_reporte
        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5))
        AND dep_llave = ope_pla_dependencia
        AND per_catalogo = ope_pla_cat_responsable
        AND gra_codigo = per_grado
        AND ope_pla_inicia BETWEEN '$fecha_inicio' AND '$fecha_fin'";

        echo json_encode($sql);
        exit; */

        //echo json_encode($fecha_fin);
        //exit;
        //try {

            $metodos = new MetodoEjecucion();
            $consulta = $metodos->fetchArray(
            
                        "SELECT a.met_ejec_codigo, a.met_ejec_descripcion, COUNT(o.ope_pla_met_ejec) as total 
                        FROM coc_ope_planificada o, coc_metodo_ejec a 
                        WHERE o.ope_pla_met_ejec = a.met_ejec_codigo 
                        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5)) 
                        and ope_pla_inicia between '$fecha_inicio' AND '$fecha_fin' 
                        GROUP BY o.ope_pla_met_ejec, a.met_ejec_descripcion, a.met_ejec_codigo
                        ORDER BY met_ejec_codigo ASC"

            );
            $consulta2 = $metodos->fetchArray(
            
                        "SELECT ope_pla_area, are_codigo, a.are_descripcion, COUNT(o.ope_pla_area) as total2 
                        FROM coc_ope_planificada o, coc_area_mision a 
                        WHERE o.ope_pla_area = a.are_codigo 
                        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5)) 
                        and ope_pla_inicia between '$fecha_inicio' AND '$fecha_fin' 
                        GROUP BY o.ope_pla_area, a.are_descripcion, are_codigo 
                        ORDER BY are_codigo ASC"

            );
            $consulta3 = $metodos->fetchArray(
            
                        "SELECT dep_llave, a.dep_desc_md, dep_desc_lg, dep_clase, dep_desc_ct, COUNT(o.ope_pla_dependencia) as total3 
                        FROM coc_ope_planificada o, mdep a 
                        WHERE o.ope_pla_dependencia = a.dep_llave 
                        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5)) 
                        and ope_pla_inicia between '$fecha_inicio' AND '$fecha_fin'  
                        GROUP BY o.ope_pla_dependencia, dep_llave, a.dep_desc_md, dep_clase, dep_desc_ct, dep_desc_lg 
                        ORDER BY dep_desc_ct ASC, dep_clase desc"

            );
            $consulta4 = $metodos->fetchArray(
            
                        "SELECT *         
	    				FROM coc_operaciones, coc_ope_planificada, coc_coordenadas2, mdep, grados, mper, coc_proposito
	    				WHERE ope_codigo = ope_pla_operacion
	    				AND prop_codigo = ope_pla_proposito
	    				AND ope_pla_codigo = coo_reporte
	    				AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5))
	    				AND dep_llave = ope_pla_dependencia
	    				AND per_catalogo = ope_pla_cat_responsable
	    				AND gra_codigo = per_grado
	    				AND ope_pla_inicia BETWEEN '$fecha_inicio' AND '$fecha_fin'"

            );
            $consulta5 = $metodos->fetchArray(
            
                        "SELECT *         
                        FROM coc_area_mision, coc_ope_planificada, coc_coordenadas2, mdep, grados, mper
                        WHERE are_codigo=ope_pla_area 
                        AND ope_pla_codigo = coo_reporte
                        AND ((ope_pla_situacion = 3) OR (ope_pla_situacion = 10) OR (ope_pla_situacion = 5))
                        AND dep_llave = ope_pla_dependencia
                        AND per_catalogo = ope_pla_cat_responsable
                        AND gra_codigo = per_grado
	    				AND ope_pla_inicia BETWEEN '$fecha_inicio' AND '$fecha_fin'"

            );
            echo json_encode([
                "consulta1" =>$consulta,            
                "consulta2" =>$consulta2,          
                "consulta3" =>$consulta3,         
                "consulta4" =>$consulta4,       
                "consulta5" =>$consulta5
            ]);
            

    
/*         } catch (Exception $e) {
            echo json_encode([
                "detalle" => $e->getMessage(),
                "mensaje" => "ocurrio un error en base de datos",

                "codigo" => 4,
            ]);
           
        } */


    }

 }

?>