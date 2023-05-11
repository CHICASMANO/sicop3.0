<?php 
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
require_once __DIR__ . '/../includes/app.php';


use MVC\Router;
use Controllers\AppController;
use Controllers\MetodoEjecucionController;
use Controllers\PlanificarOperacionController;

$router = new Router();
$router->setBaseURL('/' . $_ENV['APP_NAME']);

$router->get('/', [AppController::class,'index']);


$router->get('/planificar', [PlanificarOperacionController::class,'index']);
$router->post('/API/planificar/combo_opes', [PlanificarOperacionController::class,'APIcomboOpes']);
$router->post('/API/planificar/combo_munic', [PlanificarOperacionController::class,'APIcomboMunic']);
$router->post('/API/planificar/combo_lug', [PlanificarOperacionController::class,'APIcomboLug']);
$router->get('/API/planificar/buscar_cat', [PlanificarOperacionController::class,'APIbuscar_cat']);
$router->get('/API/planificar/buscar_inst', [PlanificarOperacionController::class,'APIintituciones']);
$router->get('/API/planificar/buscar_veh', [PlanificarOperacionController::class,'APIVehiculos']);



$router->get('/inicio/consulta', [MetodoEjecucionController::class,'consultar']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
