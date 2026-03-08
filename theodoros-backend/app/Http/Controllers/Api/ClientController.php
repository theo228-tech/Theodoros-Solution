<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Historique; // 🔥 AJOUT

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'email' => 'nullable|email|unique:clients,email',
            'telephone' => 'nullable',
            'adresse' => 'nullable'
        ]);

        $client = Client::create($request->all());

        // 🔥 HISTORIQUE AJOUT
        Historique::create([
            'type_action' => 'client',
            'description' => "Client {$client->nom} ajouté"
        ]);

        return response()->json($client);
    }

    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $request->validate([
            'nom' => 'required',
            'email' => 'nullable|email|unique:clients,email,' . $id,
            'telephone' => 'nullable',
            'adresse' => 'nullable'
        ]);

        $client->update($request->all());

        // 🔥 HISTORIQUE MODIFICATION
        Historique::create([
            'type_action' => 'client',
            'description' => "Client {$client->nom} modifié"
        ]);

        return response()->json($client);
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $nom = $client->nom;

        $client->delete();

        // 🔥 HISTORIQUE SUPPRESSION
        Historique::create([
            'type_action' => 'client',
            'description' => "Client {$nom} supprimé"
        ]);

        return response()->json(['message' => 'Client supprimé']);
    }
}