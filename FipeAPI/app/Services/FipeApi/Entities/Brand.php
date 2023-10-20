<?php

namespace App\Services\FipeApi\Entities;

class Brand
{
    public $codigo;

    public $nome;

    public function __construct($data)
    {
        $this->codigo = $data['codigo'];
        $this->nome   = $data['nome'];
    }
}