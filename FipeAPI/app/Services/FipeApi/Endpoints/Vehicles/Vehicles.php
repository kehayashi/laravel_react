<?php

namespace App\Services\FipeApi\Endpoints\Vehicles;

use App\Services\FipeApi\FipeApiService;

class Vehicles
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar veiculos
     * Service instanciado para realizar a requisicao com seu respectivo endpoint
     * @param string $typeVehicle recebe o tipo do veiculo
     * @param int $brand recebe o tipo do veiculo
     * @param string $year recebe o ano do veiculo
     * @return json
     */
    function getVehicle($typeVehicle, $brand, $model, $year) {
       return $this->service
                ->api
                ->get("/$typeVehicle/marcas/$brand/modelos/$model/anos/$year")
                ->json();
    }
}