<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colonia extends Model
{
    use HasFactory;
    protected $table = 'colonias';
    public $timestamps = true;
    public $incrementing = true;
    protected $fillable = [
        'CColonia',
        'CCodigoPostal',
        'CNombreAsentamiento',
    ];
}
