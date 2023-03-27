<?php 

class deleteProductsController
{
    private $dataBase;

    public function __construct($db) {
        if($_SERVER['PATH_INFO'] == '/deleteproducts') {
            $this->dataBase = $db;
        }
    }

    public function deleteProducts() {
        $this->dataBase->removeProducts($_REQUEST['ids']);
    }
}

?>