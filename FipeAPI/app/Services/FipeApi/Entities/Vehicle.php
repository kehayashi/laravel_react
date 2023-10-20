<?php

namespace App\Services\FipeApi\Entities;

class Vehicle
{
    public $tipoVeiculo;

    public $valor;

    public $marca;

    public $modelo;

    public $anoModelo;

    public $combustivel;

    public $codigoFipe;

    public $mesReferencia;

    public function __construct($data)
    {   
        $this->tipoVeiculo   = $data['TipoVeiculo'];
        $this->valor         = $data['Valor'];
        $this->marca         = $data['Marca'];
        $this->modelo        = $data['Modelo'];
        $this->anoModelo     = $data['AnoModelo'];
        $this->combustivel   = $data['Combustivel'];
        $this->codigoFipe    = $data['CodigoFipe'];
        $this->mesReferencia = $data['MesReferencia'];
    }
}