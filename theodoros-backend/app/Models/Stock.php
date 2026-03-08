<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'produit_id',
        'type',            // "boutique" ou "magasin"
        'quantite_entree',
        'quantite_sortie',
        'date'
    ];

    /**
     * Relation avec le produit
     */
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    /**
     * Calculer le stock total pour un produit
     */
    public static function stockTotal($produit_id, $type = null)
    {
        $query = self::where('produit_id', $produit_id);

        if ($type) {
            $query->where('type', $type); // si on veut filtrer boutique ou magasin
        }

        return $query->selectRaw('SUM(quantite_entree - quantite_sortie) as stock_total')
                     ->value('stock_total') ?? 0;
    }
}