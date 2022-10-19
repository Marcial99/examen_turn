<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table = 'addresses';
    public $timestamps = true;
    public $incrementing = true;
    protected $fillable = [
        'idAddress',
        'FK_IdUser',
        'ContactName',
        'Address',
        'PostalCode',
        'Neighborhood',
        'City',
        'State',
        'Email',
        'Phone',
        'Type',
        'Status',
    ];
}
