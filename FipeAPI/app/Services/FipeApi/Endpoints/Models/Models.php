<?php

namespace App\Services\FipeApi\Endpoints\Models;

use App\Services\FipeApi\FipeApiService; 

class Models
{   
    private $service;

    public function __construct() {
        $this->service = new FipeApiService();
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar modelos
     * Service instanciado para realizar a requisicao com seu respectivo endpoint
     * @param string $typeVehicle recebe o tipo do veiculo
     * @param int $brand recebe o tipo do veiculo
     * @return json
     */
    function getModels($typeVehicle, $brand) {
        return $this->service
                ->api
                ->get("/$typeVehicle/marcas/$brand/modelos")
                ->json('modelos');
    }
}