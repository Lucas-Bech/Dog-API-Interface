<?php

class DogFetcher
{
    private $url;

    public function __construct()
    {
        $this->getURL();
    }

    private function getURL() {
      if (isset($_GET['breed']) && $_GET['breed'] != '') {
          $breed = filter_var($_GET['breed'], FILTER_SANITIZE_STRING);
          $this->url = 'https://dog.ceo/api/breed/' . $breed . '/images/random';
      } else {
          $this->url = 'https://dog.ceo/api/breeds/image/random';
      }
    }

    public function fetchDog() {
      $curl_handle = curl_init($this->url);
      curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, true);
      curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);

      $result = curl_exec($curl_handle);
      curl_close($curl_handle);

      $dog = json_decode($result);

      echo $dog->message;
    }

}

$dog = new DogFetcher;
$dog->fetchDog();

?>
