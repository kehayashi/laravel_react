<?php

namespace App\Services\FipeApi\Endpoints\Vehicles;

use App\Services\FipeApi\Entities\Vehicle;
use App\Services\FipeApi\FipeApiService;

class Vehicles
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    function getVehicle($typeVehicle, $brand, $model, $year) {

       return $this->service
                ->api
                ->get("/$typeVehicle/marcas/$brand/modelos/$model/anos/$year")
                ->json();
    }
}