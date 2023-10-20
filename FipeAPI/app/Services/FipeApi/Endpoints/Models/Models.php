<?php

namespace App\Services\FipeApi\Endpoints\Models;

use App\Services\FipeApi\Entities\Model;
use App\Services\FipeApi\FipeApiService; 

class Models
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    function getModels($typeVehicle, $idBrand) {
        return $this->service
                ->api
                ->get("/$typeVehicle/marcas/$idBrand/modelos")
                ->json('modelos');
    }
}