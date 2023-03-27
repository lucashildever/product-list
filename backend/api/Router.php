<?php

class Router
{
    private $routes = array();

    public function addRoutes($routes) {
        foreach($routes as $route) {
            array_push($this->routes, $route);
        }
    }

    public function runRoutes() {
        foreach($this->routes as $route) {
            if($route['httpMethod'] == $_SERVER['REQUEST_METHOD'] && $route['path'] == $_SERVER['PATH_INFO']) {
                $method = $route['controllerMethod'];
                $route['controller']->$method();
                return;
                }
            }
        http_response_code(404);
        echo 'route not found.';
    }
}

?>