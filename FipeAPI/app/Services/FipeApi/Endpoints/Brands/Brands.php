<?php

namespace App\Services\FipeApi\Endpoints\Brands;

use App\Services\FipeApi\FipeApiService;

class Brands
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar marcas
     * Service instanciado para realizar a requisicao com seu respectivo endpoint
     * @param string $typeVehicle recebe o tipo do veiculo
     * @return json
     */
    function getBrand($typeVehicle) {
        return $this->service
                ->api
                ->get('/'.$typeVehicle.'/marcas')
                ->json();
    }
}