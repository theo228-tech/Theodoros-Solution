<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vente;
use App\Models\Produit;
use App\Models\Stock;
use App\Models\Historique; // 🔥 AJOUT

class VenteController extends Controller
{
    // Lister toutes les ventes
    public function index()
    {
        $ventes = Vente::with(['produit', 'client'])->get();

        $data = $ventes->map(function($v){
            return [
                'id' => $v->id,
                'produit_nom' => $v->produit->nom,
                'client_nom' => $v->client->nom,
                'quantite' => $v->quantite,
                'total' => $v->total,
                'type' => Stock::where('produit_id', $v->produit_id)
                            ->where('quantite_sortie', $v->quantite)
                            ->latest('id')->first()?->type ?? '-',
                'date_vente' => $v->date_vente,
            ];
        });

        return response()->json($data);
    }

    // Créer une vente
    public function store(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'client_id' => 'required|exists:clients,id',
            'quantite' => 'required|integer|min:1',
            'type' => 'required|in:boutique,magasin',
        ]);

        $produit = Produit::find($request->produit_id);

        // Vérifier stock disponible
        $stockDisponible = Stock::where('produit_id', $produit->id)
            ->where('type', $request->type)
            ->sum('quantite_entree') -
            Stock::where('produit_id', $produit->id)
            ->where('type', $request->type)
            ->sum('quantite_sortie');

        if ($request->quantite > $stockDisponible) {
            return response()->json([
                'message' => "Stock insuffisant dans {$request->type} (disponible: $stockDisponible)"
            ], 400);
        }

        $total = $request->quantite * $produit->prix;

        // Enregistrer la vente
        $vente = Vente::create([
            'produit_id' => $produit->id,
            'client_id' => $request->client_id,
            'quantite' => $request->quantite,
            'total' => $total,
            'date_vente' => now(),
        ]);

        // Ajouter la sortie dans le stock
        Stock::create([
            'produit_id' => $produit->id,
            'type' => $request->type,
            'quantite_entree' => 0,
            'quantite_sortie' => $request->quantite,
            'date' => now(),
        ]);

        // 🔥 HISTORIQUE AJOUTÉ (sans rien casser)
        Historique::create([
            'type_action' => 'vente',
            'description' => "Vente créée - Produit: {$produit->nom} - Quantité: {$request->quantite} - Total: {$total} FCFA - Type: {$request->type}"
        ]);

        return response()->json(['message' => 'Vente enregistrée', 'vente' => $vente]);
    }

    // Supprimer une vente
    public function destroy($id)
    {
        $vente = Vente::findOrFail($id);

        $produitNom = $vente->produit->nom ?? 'Produit';
        $quantite = $vente->quantite;
        $total = $vente->total;

        $vente->delete();

        // 🔥 HISTORIQUE SUPPRESSION
        Historique::create([
            'type_action' => 'vente',
            'description' => "Vente supprimée - Produit: {$produitNom} - Quantité: {$quantite} - Total: {$total} FCFA"
        ]);

        return response()->json(['message' => 'Vente supprimée']);
    }
}