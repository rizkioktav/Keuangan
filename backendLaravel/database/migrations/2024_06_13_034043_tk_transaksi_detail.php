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
        Schema::create('tk_transaksi_detail', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_company');
            $table->unsignedBigInteger('id_transaksi_jenis');
            $table->unsignedBigInteger('id_coa_akun');
            $table->date('tanggal_transaksi');
            $table->decimal('nominal_transaksi', 15, 2);
            $table->string('catatan_transaksi');
            $table->decimal('debit', 15, 2);
            $table->decimal('kredit', 15, 2);
            $table->timestamps();
            
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_company')->references('id')->on('master_company')->onDelete('cascade');
            $table->foreign('id_transaksi_jenis')->references('id')->on('tk_transaksi_jenis')->onDelete('cascade');
            $table->foreign('id_coa_akun')->references('id')->on('tk_coa')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tk_transaksi_detail');
    }
};
