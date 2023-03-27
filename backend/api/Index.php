<?php 

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: *");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit;
    }

    // db connection
    $config = parse_ini_file('../../../db_config.ini', true);
    
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

    $getProducts = new GetProductsController($db);
    $addProduct = new AddProductController($db);
    $deleteProducts = new deleteProductsController($db);

    $routes = array([
        'httpMethod' => 'GET',
        'path' => '/getproducts',
        'controller' => $getProducts,
        'controllerMethod' => 'getProducts'
    ],[
        'httpMethod' => 'GET',
        'path' => '/addproduct',
        'controller' => $addProduct,
        'controllerMethod' => 'addProduct'
    ],[
        'httpMethod' => 'GET',
        'path' => '/deleteproducts',
        'controller' => $deleteProducts,
        'controllerMethod' => 'deleteProducts'
    ]);

    // $routes = array([
    //     'httpMethod' => 'GET',
    //     'path' => '/getproducts',
    //     'controller' => $getProducts,
    //     'controllerMethod' => 'getProducts'
    // ],[
    //     'httpMethod' => 'POST',
    //     'path' => '/addproduct',
    //     'controller' => $addProduct,
    //     'controllerMethod' => 'addProduct'
    // ],[
    //     'httpMethod' => 'DELETE',
    //     'path' => '/deleteproducts',
    //     'controller' => $deleteProducts,
    //     'controllerMethod' => 'deleteProducts'
    // ]);
    
    $router = new Router();
    $router->addRoutes($routes);
    $router->runRoutes();

?>