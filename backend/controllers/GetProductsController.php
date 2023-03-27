<?php 

class GetProductsController
{
    private $dataBase;

    public function __construct($db) {
        if($_SERVER['PATH_INFO'] == '/getproducts') {
            $this->dataBase = $db;
        }
    }

    public function getProducts() {
        $this->dataBase->queryProducts();
    }
}

?>