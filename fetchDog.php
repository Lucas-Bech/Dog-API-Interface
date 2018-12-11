<?php
# Portability
ini_set("Allow_url_fopen", 1);

class Dog_API
{
    private $url, $breed;

    public function __construct()
    {
        # Filter
        if (isset($_GET['breed'])) {
            $breed = filter_var($_GET['breed'], FILTER_SANITIZE_STRING);
            $url   = 'https://dog.ceo/api/breed/' . $breed . '/images/random';
        } else {
            $url = 'https://dog.ceo/api/breeds/image/random';
        }
        # Fetch JSON
        $json   = file_get_contents($url);
        $dog    = json_decode($json);
        $imgURL = $dog->message;

        echo $imgURL;
    }
}
$dog = new Dog_API;
?>
