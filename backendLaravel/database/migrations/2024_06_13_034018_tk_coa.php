<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tk_coa', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_coa_kategori');
            $table->integer('coa_kode');
            $table->string('coa_nama');
            $table->enum('coa_tipe', ['debit', 'kredit']);
            $table->string('coa_deskripsi')->nullable();
            $table->decimal('saldo_debit', 15, 2)->nullable();
            $table->decimal('saldo_kredit', 15, 2)->nullable();
            $table->timestamps();

            $table->foreign('id_coa_kategori')->references('id')->on('tk_coa_kategori')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tk_coa');
    }
};
