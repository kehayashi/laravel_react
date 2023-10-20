<?php

namespace App\Services\FipeApi\Endpoints\Brands;

trait HasBrands
{
    public function brands() {
        return new Brands();
    }
}