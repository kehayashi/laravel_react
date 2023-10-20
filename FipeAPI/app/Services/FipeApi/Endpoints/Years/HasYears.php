<?php

namespace App\Services\FipeApi\Endpoints\Years;

trait HasYears
{
    public function years() {
        return new Years();
    }
}