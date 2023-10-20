<?php

namespace App\Services\FipeApi\Endpoints\Years;

use App\Services\FipeApi\FipeApiService;

class Years
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar ano
     * Service instanciado para realizar a requisicao com seu respectivo endpoint
     * @param string $typeVehicle recebe o tipo do veiculo
     * @param int $brand recebe o tipo do veiculo
     * @param int $model recebe o modelo do veiculo
     * @return json
     */
    function getYears($typeVehicle, $brand, $model) {
        return $this->service
                ->api
                ->get("/$typeVehicle/marcas/$brand/modelos/$model/anos")
                ->json();
    }
}