<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tk_transaksi_jenis', function (Blueprint $table) {
            $table->id();
            $table->string('transaksi_jenis');
            $table->timestamps();
        });

        // Insert data default
        DB::table('tk_transaksi_jenis')->insert([
            ['transaksi_jenis' => 'pemasukan'],
            ['transaksi_jenis' => 'pengeluaran'],
            ['transaksi_jenis' => 'hutang'],
            ['transaksi_jenis' => 'piutang'],
            ['transaksi_jenis' => 'tanam modal'],
            ['transaksi_jenis' => 'tarik modal'],
            ['transaksi_jenis' => 'transfer uang'],
            ['transaksi_jenis' => 'modal'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tk_transaksi_jenis');
    }
};
