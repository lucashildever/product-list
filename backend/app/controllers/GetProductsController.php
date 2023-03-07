<?php 

class GetProductsController
{
    private $dataBase;

    public function __construct($db) {
        $this->dataBase = $db;
    }

    public function getAllProducts() {
        $this->dataBase->queryProducts();
    }
}

?>