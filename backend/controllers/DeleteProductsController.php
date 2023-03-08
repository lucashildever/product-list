<?php 

class deleteProductsController
{
    private $dataBase;

    public function __construct($db) {
        $this->dataBase = $db;
    }

    public function deleteProducts() {
        $this->dataBase->removeProducts();
    }
}

?>