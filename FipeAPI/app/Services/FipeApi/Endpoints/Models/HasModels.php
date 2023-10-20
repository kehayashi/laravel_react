<?php

namespace App\Services\FipeApi\Endpoints\Models;

trait HasModels
{
    public function models() {
        return new Models();
    }
}