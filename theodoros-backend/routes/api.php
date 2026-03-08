<?php
/*
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\VenteController;
use App\Http\Controllers\Api\HistoriqueController;

Route::get('/test', function () {
    return response()->json([
    ]);
});
Route::get('/dashboard', [DashboardController::class, 'index']);

//Route::apiResource('produits', ProduitController::class);

Route::get('/produits', [ProduitController::class, 'index']);
Route::post('/produits', [ProduitController::class, 'store']);
Route::put('/produits/{id}', [ProduitController::class, 'update']);
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']);
Route::post('/stock/entree', [StockController::class, 'entree']);
Route::post('/stock/sortie', [StockController::class, 'sortie']);
Route::get('/produits/{id}', [ProduitController::class, 'show']); // déjà fait 

Route::get('/clients', [ClientController::class, 'index']);
Route::post('/clients', [ClientController::class, 'store']);
Route::put('/clients/{id}', [ClientController::class, 'update']);
Route::delete('/clients/{id}', [ClientController::class, 'destroy']);

Route::get('/ventes', [VenteController::class, 'index']);
Route::post('/ventes', [VenteController::class, 'store']);
Route::delete('/ventes/{id}', [VenteController::class, 'destroy']);

Route::get('/stock', [StockController::class, 'index']);

Route::post('/feedback', [FeedbackController::class, 'store']);
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/comments', [CommentController::class, 'index']);


Route::get('/historiques', [HistoriqueController::class, 'index']);
Route::delete('/historiques/{id}', [HistoriqueController::class, 'destroy']);
*/



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\VenteController;
use App\Http\Controllers\Api\HistoriqueController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\CommentController;

/* TEST */
Route::get('/test', fn() => response()->json([]));

/* DASHBOARD */
Route::get('/dashboard', [DashboardController::class, 'index']);

/* PRODUITS (CRUD complet) */
Route::apiResource('produits', ProduitController::class);

/* STOCK */
Route::get('/stock', [StockController::class, 'index']);
Route::post('/stock/entree', [StockController::class, 'entree']);
Route::post('/stock/sortie', [StockController::class, 'sortie']);

/* CLIENTS */
Route::apiResource('clients', ClientController::class)->only([
    'index', 'store', 'update', 'destroy'
]);

/* VENTES */
Route::apiResource('ventes', VenteController::class)->only([
    'index', 'store', 'destroy'
]);

/* HISTORIQUES */
Route::get('/historiques', [HistoriqueController::class, 'index']);
Route::delete('/historiques/{id}', [HistoriqueController::class, 'destroy']);

/* FEEDBACK & COMMENTS */
Route::post('/feedback', [FeedbackController::class, 'store']);
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/comments', [CommentController::class, 'index']);