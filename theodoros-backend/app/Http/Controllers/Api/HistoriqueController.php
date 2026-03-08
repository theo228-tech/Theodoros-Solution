<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Historique;

class HistoriqueController extends Controller
{
    /**
     * 🔹 Lister tout l’historique
     * Option filtre par type ?type=produit
     */
    public function index(Request $request)
    {
        $query = Historique::latest();

        // 🔥 Filtre par type si fourni
        if ($request->has('type')) {
            $query->where('type_action', $request->type);
        }

        $historiques = $query->get();

        return response()->json($historiques);
    }

    /**
     * 🔹 Supprimer une ligne d’historique (optionnel)
     */
    public function destroy($id)
    {
        $historique = Historique::findOrFail($id);
        $historique->delete();

        return response()->json([
            'message' => 'Historique supprimé'
        ]);
    }
}