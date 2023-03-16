<?php 

class deleteProductsController
{
    private $dataBase;

    public function __construct($db) {
        $this->dataBase = $db;
    }

    public function deleteProducts() {
        if($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $this->dataBase->removeProducts($_REQUEST['ids']);
        }
    }
}

?>