<?php

class Router
{
    private $routes = array();

    // addRoute('GET', '/path', 'GetProductsController', 'getAllProducts');
    public function addRoute($httpMethod, $path, $controller, $controllerMethod) {
        $this->routes[] = [
            'httpMethod' => $httpMethod,
            'path' => $path,
            'controller' => $controller,
            'controllerMethod' => $controllerMethod
        ];
    }

    // o método http atual e o path atual
    public function runRoute($httpMethod, $path) {
        foreach($this->routes as $route) {
            if($route['httpMethod'] == $httpMethod && $route['path'] == $path) {
                $controller = new $route['controller']();
                $controller->$route['controllerMethod']();
                return;
            } else {
                echo 'route not found';
            }
        }
    }
}

?>