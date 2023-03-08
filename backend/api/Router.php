<?php

class Router
{
    private $routes = array();

    public function addRoutes($routes) {
        foreach($routes as $route) {
            array_push($this->routes, $route);
        }
    }

    public function runRoutes($requestMethod, $pathInfo) {
        foreach($this->routes as $route) {
            if($route['httpMethod'] == $requestMethod && $route['path'] == $pathInfo) {
                $method = $route['controllerMethod'];
                $route['controller']->$method();
                return;
                }
            }
        echo 'route not found.';
    }
}

?>