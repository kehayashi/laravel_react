<?php

namespace App\Services\FipeApi\Endpoints\Years;

use App\Services\FipeApi\Entities\Year;
use App\Services\FipeApi\FipeApiService;

class Years
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    function getYears($typeVehicle, $brand, $model) {
        return $this->service
                ->api
                ->get("/$typeVehicle/marcas/$brand/modelos/$model/anos")
                ->json();
    }
}