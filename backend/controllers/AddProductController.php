<?php

require_once '../models/ProductsModel.php';

class AddProductController
{
    private $data = [
        'dataBase' => null,
        'sku' => null,
        'name' => null,
        'price' => null,
        'type' => null,
        'type_info' => null,
        'requestMethod' => null,
        'productInstance' => null
    ];

    public function __construct($db) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->data['dataBase'] = $db;
            $this->data['sku'] = $_POST['sku'];
            $this->data['name'] = $_POST['name'];
            $this->data['price'] = $_POST['price'];
            $this->data['type'] = $_POST['type'];
            $this->data['type_info'] = $_POST['type_info'];
            $this->data['requestMethod'] = 'POST';
            
        }
    }

    private function defineProductClass(){
        switch($this->data['type']) {
            case 'dvd':
                $this->data['productInstance'] = new Dvd($this->data['sku'], $this->data['name'], $this->data['price'], $this->data['type_info']);
                break;
                case 'furniture':
                $this->data['productInstance'] = new Furniture($this->data['sku'], $this->data['name'], $this->data['price'], $this->data['type_info']);
                break;
                case 'book':
                $this->data['productInstance'] = new Book($this->data['sku'], $this->data['name'], $this->data['price'], $this->data['type_info']);
                break;
            default:
                break;
        }
    }

    public function addProduct() {
        $this->defineProductClass();
        $this->data['dataBase']->insertProduct($this->data['productInstance']);
    }
}

?>