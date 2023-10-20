<?php

namespace App\Services\FipeApi;

use Illuminate\Support\Facades\Http;
use App\Services\FipeApi\Endpoints\Years\HasYears;
use App\Services\FipeApi\Endpoints\Brands\HasBrands;
use App\Services\FipeApi\Endpoints\Models\HasModels;
use App\Services\FipeApi\Endpoints\Vehicles\HasVehicles;

/*
 * Fipe API Service
 * https://parallelum.com.br/fipe/api/v1
*/
class FipeApiService
{   
    use HasBrands;
    use HasModels;
    use HasYears;
    use HasVehicles;

    public $api;

    public function __construct() {
        $this->api = Http::withHeaders([
            'Content-Type' => 'Application/json'
        ])->baseUrl('https://parallelum.com.br/fipe/api/v1');
    }
}