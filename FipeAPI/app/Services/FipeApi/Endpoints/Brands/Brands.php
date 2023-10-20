<?php

namespace App\Services\FipeApi\Endpoints\Brands;

use App\Services\FipeApi\Entities\Brand;
use App\Services\FipeApi\FipeApiService;

class Brands
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    function getBrand($typeVehicle) {
        return $this->service
                ->api
                ->get('/'.$typeVehicle.'/marcas')
                ->json();
    }
}