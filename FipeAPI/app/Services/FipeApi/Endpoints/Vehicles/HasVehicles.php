<?php

namespace App\Services\FipeApi\Endpoints\Vehicles;

trait HasVehicles
{
    public function vehicles() {
        return new Vehicles();
    }
}