<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodigoPostal extends Model
{
    use HasFactory;
    protected $table = 'codigos_postales';
    public $timestamps = true;
    public $incrementing = true;
    protected $fillable = [
        'CCp',
        'CEstado',
        'CMunicipio',
        'CLocalidad'
    ];
}
