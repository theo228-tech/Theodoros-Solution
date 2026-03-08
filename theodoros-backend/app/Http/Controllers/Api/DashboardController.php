<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use App\Models\Client;
use App\Models\Vente;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Récupérer tous les produits
        $produits = Produit::all();

        // Produits rupture Boutique
        $produitsRuptureBoutique = Stock::where('type','boutique')
            ->select('produit_id', DB::raw('COALESCE(SUM(quantite_entree) - SUM(quantite_sortie),0) as stock'))
            ->groupBy('produit_id')
            ->having('stock', '<=', 0)
            ->count();

        // Produits rupture Magasin
        $produitsRuptureMagasin = Stock::where('type','magasin')
            ->select('produit_id', DB::raw('COALESCE(SUM(quantite_entree) - SUM(quantite_sortie),0) as stock'))
            ->groupBy('produit_id')
            ->having('stock', '<=', 0)
            ->count();

        $stats = [
            'totalProduits' => $produits->count(),
            'totalClients' => Client::count(),
            'ventesAujourdhui' => Vente::whereDate('date_vente', now())->sum('total'),
            'produitsRuptureBoutique' => $produitsRuptureBoutique,
            'produitsRuptureMagasin' => $produitsRuptureMagasin,
        ];

        return response()->json($stats);
    }
}
    