<?php

namespace Controllers;

use MVC\Router;

class AppController {
    public static function index(Router $router){
       $cualquiera = 10;
        $router->render('inicio/index', [
            "cualquiera"=>$cualquiera,
        ]);
    }

}