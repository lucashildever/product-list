<?php 

abstract class ProductsModel
{
    protected $sku;
    protected $name;
    protected $price;

    public function __construct($sku, $name, $price) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }

    
    public function getSku(): string {
        return strval($this->sku);
    }

    public function getName(): string {
        return strval($this->name);
    }

    public function getPrice(): float {
        return $this->price;
    }

    abstract function getType();
    abstract function getTypeSpecificInfo();
}

class Dvd extends ProductsModel
{
    private $type = 'dvd';
    private $size;

    public function __construct($sku, $name, $price, $size) {
        parent::__construct($sku, $name, $price);
        $this->size = $size;
    }

    public function getType(): string {
        return $this->type;
    }

    public function getTypeSpecificInfo(): string {
        return $this->size . 'MB';
    }
}

class Furniture extends ProductsModel
{
    private $type = 'furniture';
    private $dimensions;

    public function __construct($sku, $name, $price, $dimensions) {
        parent::__construct($sku, $name, $price);
        $this->dimensions = $dimensions;
    }

    public function getType(): string {
        return $this->type;
    }

    public function getTypeSpecificInfo(): string {
        return $this->dimensions;
    }
}

class Book extends ProductsModel
{
    private $type = 'book';
    private $weight;

    public function __construct($sku, $name, $price, $weight) {
        parent::__construct($name, $price);
        $this->weight = $weight;
    }

    public function getType(): string {
        return $this->type;
    }

    public function getTypeSpecificInfo(): string {
        return $this->weight . 'KG';
    }
}

?>