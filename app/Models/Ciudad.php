<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    use HasFactory;
    protected $table = 'ciudades';
    public $timestamps = true;
    public $incrementing = true;
    protected $fillable = [
        'CMunicipio',
        'CEstado',
        'Descripcion',
    ];
}
