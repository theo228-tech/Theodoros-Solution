<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stock;
use App\Models\Produit;
use App\Models\Historique; // 🔥 AJOUT

class StockController extends Controller
{
    /**
     * 🔹 Afficher tout le stock
     */
    public function index()
    {
        $stocks = Stock::with('produit')->latest()->get();

        return response()->json($stocks);
    }

    /**
     * 🔹 Entrée de stock
     */
    public function entree(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite'   => 'required|numeric|min:1',
            'type'       => 'required|string|in:boutique,magasin',
        ]);

        $produit = Produit::findOrFail($request->produit_id);

        $stock = Stock::create([
            'produit_id'      => $request->produit_id,
            'type'            => $request->type,
            'quantite_entree' => $request->quantite,
            'quantite_sortie' => 0,
            'date'            => now(),
        ]);

        // 🔥 HISTORIQUE ENTREE
        Historique::create([
            'type_action' => 'stock',
            'description' => "Entrée stock - Produit: {$produit->nom} - Quantité: {$request->quantite} - Type: {$request->type}"
        ]);

        return response()->json([
            'message' => 'Stock ajouté avec succès',
            'stock'   => $stock
        ]);
    }

    /**
     * 🔹 Sortie de stock
     */
    public function sortie(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite'   => 'required|numeric|min:1',
            'type'       => 'required|string|in:boutique,magasin',
        ]);

        $produit = Produit::findOrFail($request->produit_id);

        $stock = Stock::create([
            'produit_id'      => $request->produit_id,
            'type'            => $request->type,
            'quantite_entree' => 0,
            'quantite_sortie' => $request->quantite,
            'date'            => now(),
        ]);

        // 🔥 HISTORIQUE SORTIE
        Historique::create([
            'type_action' => 'stock',
            'description' => "Sortie stock - Produit: {$produit->nom} - Quantité: {$request->quantite} - Type: {$request->type}"
        ]);

        return response()->json([
            'message' => 'Stock diminué avec succès',
            'stock'   => $stock
        ]);
    }
}