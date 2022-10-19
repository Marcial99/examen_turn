<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billingdata extends Model
{
    use HasFactory;
    protected $table = 'billingsdatas';
    public $timestamps = true;
    public $incrementing = true;
    protected $fillable = [
        'IdBillingdata',
        'FK_IdUser',
        'IqualAddress',
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
