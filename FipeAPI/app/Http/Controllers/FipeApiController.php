<?php

namespace App\Http\Controllers;

use App\Services\FipeApi\FipeApiService;
use Illuminate\Http\Request;

class FipeApiController extends Controller
{   
    public function getBrands(Request $request) {

        $typeVehicle = htmlspecialchars($request->type, ENT_QUOTES);
        
        $service = new FipeApiService(); 
        $json = $service
            ->brands()
            ->getBrand($typeVehicle);

        return $json;
    }

    public function getModels(Request $request) {

        $typeVehicle = htmlspecialchars($request->type, ENT_QUOTES);
        $brand = filter_var($request->brand, FILTER_VALIDATE_INT);
        
        $service = new FipeApiService(); 
        $json = $service
            ->models()
            ->getModels($typeVehicle, $brand);

        return $json;
    }

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
