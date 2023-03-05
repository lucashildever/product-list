<?php 

    require 'Router.php';
    require '../controllers/GetProductsController.php';

    $pathInfo = $_SERVER['PATH_INFO'];
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    $router = new Router();
    $products = new GetProductsController();

    var_dump($products);

    $router->addRoute('GET', '/api', $products, $products->getAllProducts());

    $router->runRoute($pathInfo, $requestMethod);


?>