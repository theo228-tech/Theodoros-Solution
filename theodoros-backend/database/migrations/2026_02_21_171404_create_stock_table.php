<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock', function (Blueprint $table) {
    $table->id();
    $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
    $table->enum('type', ['boutique', 'magasin'])->default('magasin');
    $table->integer('quantite_entree')->default(0);
    $table->integer('quantite_sortie')->default(0);
    $table->date('date');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock');
    }
};
