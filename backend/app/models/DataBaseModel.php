<?php 

class DataBaseModel
{
    public $dataBase;

    public function connect($src, $user, $pass) {
        try {
            $this->dataBase = new PDO($src, $user, $pass);
            $this->dataBase->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'ERROR: ' . $e->getMessage();
        }
    }

    public function queryProducts() {
        $stmt = $this->dataBase->prepare('SELECT * FROM tb_products');
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($result);
    }

    public function insertProduct($productInstance) {
        $sku = $productInstance->getSku();
        $name = $productInstance->getName();
        $price = $productInstance->getPrice();
        $type = $productInstance->getType();
        $type_info = $productInstance->getTypeSpecificInfo();

        $stmt = $this->dataBase->prepare('INSERT INTO tb_products (sku, name, price, type_info, type) VALUES (:sku, :name, :price, :type_info, :type)');

        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':type_info', $type_info);

        try {
            $stmt->execute();
            echo 'Data inserted succesflully';
        } catch(PDOException $e) {
            echo "error: " . $e->getMessage();
        }
    }
}

?>