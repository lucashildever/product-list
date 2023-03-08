<?php 

    // db connection
    $config = parse_ini_file('../../../../db_config.ini', true);
    
    $source = $config['database']['data_source'];
    $username = $config['database']['db_user'];
    $password = $config['database']['db_password'];

    require_once '../models/DataBaseModel.php';
    
    $db = new DataBaseModel();
    $db->connect($source, $username, $password);
    
    // router
    require_once 'Router.php';
    require_once '../controllers/GetProductsController.php';
    require_once '../controllers/AddProductController.php';
    require_once '../controllers/DeleteProductsController.php';

    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $pathInfo = $_SERVER['PATH_INFO'];

    $getProducts = new GetProductsController($db);
    $addProduct = new AddProductController($db);
    $deleteProducts = new deleteProductsController($db);

    $routes = array([
        'httpMethod' => 'GET',
        'path' => '/api/getproducts',
        'controller' => $getProducts,
        'controllerMethod' => 'getAllProducts'
    ],[
        'httpMethod' => 'POST',
        'path' => '/api/addproduct',
        'controller' => $addProduct,
        'controllerMethod' => 'addProduct'
    ],[
        'httpMethod' => 'DELETE',
        'path' => '/api/deleteproducts',
        'controller' => $deleteProducts,
        'controllerMethod' => 'deleteProducts'
    ]);
    
    $router = new Router();
    $router->addRoutes($routes);
    $router->runRoutes($requestMethod, $pathInfo);

?>