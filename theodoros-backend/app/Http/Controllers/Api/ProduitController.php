<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use App\Models\Historique;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    // 🔵 Liste des produits avec calcul des stocks
    public function index()
    {
        $produits = Produit::with('stocks')->get();

        $data = $produits->map(function ($produit) {

            $quantite_boutique = $produit->stocks
                ->where('type', 'boutique')
                ->sum('quantite_entree')
                - $produit->stocks
                ->where('type', 'boutique')
                ->sum('quantite_sortie');

            $quantite_magasin = $produit->stocks
                ->where('type', 'magasin')
                ->sum('quantite_entree')
                - $produit->stocks
                ->where('type', 'magasin')
                ->sum('quantite_sortie');

            return [
                'id' => $produit->id,
                'nom' => $produit->nom,
                'prix' => $produit->prix,
                'quantite_boutique' => $quantite_boutique,
                'quantite_magasin' => $quantite_magasin,
                'quantite_totale' => $quantite_boutique + $quantite_magasin,
                'total' => ($quantite_boutique + $quantite_magasin) * $produit->prix
            ];
        });

        return response()->json($data);
    }

    // 🟢 Ajouter un produit
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prix' => 'required|numeric'
        ]);

        $produit = Produit::create([
            'nom' => $request->nom,
            'prix' => $request->prix
        ]);

        // 🔥 Historique
        Historique::create([
            'type_action' => 'produit',
            'description' => "Produit {$produit->nom} ajouté (Prix: {$produit->prix})"
        ]);

        return response()->json($produit, 201);
    }

    // 🟡 Voir un produit
    public function show($id)
    {
        $produit = Produit::findOrFail($id);
        return response()->json($produit);
    }

    // 🟠 Modifier un produit
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $produit->update([
            'nom' => $request->nom,
            'prix' => $request->prix
        ]);

        // 🔥 Historique
        Historique::create([
            'type_action' => 'produit',
            'description' => "Produit {$produit->nom} modifié"
        ]);

        return response()->json($produit);
    }

    // 🔴 Supprimer un produit
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $nom = $produit->nom;

        $produit->delete();

        // 🔥 Historique
        Historique::create([
            'type_action' => 'produit',
            'description' => "Produit {$nom} supprimé"
        ]);

        return response()->json([
            'message' => 'Produit supprimé avec succès'
        ]);
    }
}