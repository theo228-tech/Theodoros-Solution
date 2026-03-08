<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Stock;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'quantite',
        'prix'
    ];
     public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}