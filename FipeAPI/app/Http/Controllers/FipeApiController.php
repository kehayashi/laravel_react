<?php

namespace App\Http\Controllers;

use App\Services\FipeApi\FipeApiService;
use Illuminate\Http\Request;

class FipeApiController extends Controller
{   
    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar marcas
     * Service para realizar a requisicao com seu respectivo endpoint
     * @param Request recebe o tipo do veiculo(type)
     * @return json resposta da requisição a API com as marcas encontradas
     */
    public function getBrands(Request $request) {

        $typeVehicle = htmlspecialchars($request->type, ENT_QUOTES);
        
        $service = new FipeApiService(); 
        $json = $service
            ->brands()
            ->getBrand($typeVehicle);

        return $json;
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar modelos
     * Service para realizar a requisicao com seu respectivo endpoint
     * @param Request recebe o tipo do veiculo(type) e marca(brand)
     * @return json com a resposta da requisição a API com os modelos encontrados
     */
    public function getModels(Request $request) {

        $typeVehicle = htmlspecialchars($request->type, ENT_QUOTES);
        $brand = filter_var($request->brand, FILTER_VALIDATE_INT);
        
        $service = new FipeApiService(); 
        $json = $service
            ->models()
            ->getModels($typeVehicle, $brand);

        return $json;
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar anos
     * Service para realizar a requisicao com seu respectivo endpoint
     * @param Request recebe o tipo do veiculo(type), marca(brand), modelo(model)
     * @return json com a resposta da requisição a API com os anos encontrados
     */
    public function getYears(Request $request) {

        $typeVehicle = htmlspecialchars($request->type, ENT_QUOTES);
        $brand = filter_var($request->brand, FILTER_VALIDATE_INT);
        $model = filter_var($request->model, FILTER_VALIDATE_INT);
        
        $service = new FipeApiService(); 
        $json = $service
            ->years()
            ->getYears($typeVehicle, $brand, $model);

        return $json;
    }

    /**
     * Método responsável por chamar o serviço para requisição para a API. Consultar veiculos
     * Service para realizar a requisicao com seu respectivo endpoint
     * @param Request recebe o tipo do veiculo(type), marca(brand), modelo(model) e ano(year)
     * @return json com a resposta da requisição a API com os dados de um veiculo
     */
    public function getVehicle(Request $request) {

        $typeVehicle = htmlspecialchars($request->type, ENT_QUOTES);
        $brand = filter_var($request->brand, FILTER_VALIDATE_INT);
        $model = filter_var($request->model, FILTER_VALIDATE_INT);
        $year = htmlspecialchars($request->year, ENT_QUOTES);
        
        $service = new FipeApiService(); 
        $json = $service
            ->vehicles()
            ->getVehicle($typeVehicle, $brand, $model, $year);

        return $json;
    }
}
