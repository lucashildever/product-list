<?php 

abstract class ProductsModel
{
    protected $name;
    protected $sku;
    protected $price;

    static function generateSku(): string {
        return 'sku-test';
    }

    public function __construct($name, $price) {

        if (isset($this)) {
            $this->sku = $this->generateSku();
        }

        $this->name = $name;
        $this->price = $price;
    }

    public function getName(): string {
        return strval($this->name);
    }

    public function getPrice(): string {
        return strval($this->price);
    }

    abstract function getTypeSpecificInfo();
}

class Dvd extends ProductsModel
{
    private $size;
    private $type = 'dvd';

    public function __construct($name, $price, $size) {
        parent::__construct($name, $price);
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
    private $height;
    private $width;
    private $length;
    private $fullDimensions;
    private $type = 'furniture';

    public function __construct($name, $price, $height, $width, $length) {
        parent::__construct($name, $price);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
        $this->fullDimensions = $this->height . 'CM' . ' x ' . $this->width . 'CM' . ' x ' . $this->length . 'CM';
    }

    public function getType(): string {
        return $this->type;
    }

    public function getTypeSpecificInfo(): string {
        return $this->fullDimensions;
    }
}

class Book extends ProductsModel
{
    private $weight;
    private $type = 'book';

    public function __construct($name, $price, $weight) {
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

$dvd1 = new Dvd('banda-lapada', 3, 'dvd', 50);

echo '<p>banda lapada</p>';
echo 'type: ' . $dvd1->getType() . '</br>';
echo 'name: ' . $dvd1->getName() . '</br>';
echo 'price: ' . $dvd1->getPrice() . '</br>';
echo 'info: ' . $dvd1->getTypeSpecificInfo() . '</br>';

$sofa = new Furniture('sofa', 300, 1, 3, 4);
echo '<p>sofá</p>';
echo 'type: ' . $sofa->getType() . '</br>';
echo 'info: ' . $sofa->getTypeSpecificInfo() . '</br>';

$alice = new Book('alice in wonderland', 300, 0.5);
echo '<p>alice</p>';
echo 'type: ' . $alice->getType() . '</br>';
echo 'info: ' . $alice->getTypeSpecificInfo() . '</br>';

?>