<?php 

abstract class Product
{
    protected $name;
    protected $sku;
    protected $price;
    protected $type;

    static function generateSku(): string {
        return 'sku-test';
    }

    public function __construct($name, $price, $type) {

        if (isset($this)) {
            $this->$sku = generateSku();
        }

        $this->$name = $name;
        $this->$price = $price;
        $this->$type = $type;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getPrice(): string {
        return $this->price;
    }

    public function getType(): string {
        return $this->type;
    }

    abstract function getTypeSpecificInfo();
}

class Dvd extends Product
{
    private $size;

    public function __construct($name, $price, $type, $size) {
        parent::__construct($name, $price, $type);
        $this->size = $size;
    }

    public function getTypeSpecificInfo(): string {
        return $this->size . 'MB';
    }
}

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;
    private $fullDimensions;

    public function __construct($name, $price, $type, $height, $width, $length) {
        parent::__construct($name, $price, $type);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
        $this->fullDimensions . 'CM' . ' x ' . $this->width . 'CM' . ' x ' . $this->length . 'CM';
    }

    public function getTypeSpecificInfo(): string {
        return $this->fullDimensions;
    }
}

class Book extends Product
{
    private $weight;

    public function __construct($name, $price, $type, $weight) {
        parent::__construct($name, $price, $type);
        $this->weight = $weight;
    }

    public function getTypeSpecificInfo(): string {
        return $this->weight;
    }
}

