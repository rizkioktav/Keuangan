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
        Schema::create('tk_coa_kategori', function (Blueprint $table) {
            $table->id();
            $table->string('coa_kategori');
            $table->timestamps();
        });

        
        // Insert data default
        DB::table('tk_coa_kategori')->insert([
            ['coa_kategori' => 'kas dan bank'],
            ['coa_kategori' => 'akun hutang'],
            ['coa_kategori' => 'akun piutang'],
            ['coa_kategori' => 'harta lancar'],
            ['coa_kategori' => 'harta tetap'],
            ['coa_kategori' => 'kewajiban lancar'],
            ['coa_kategori' => 'kewajiban jangka panjang'],
            ['coa_kategori' => 'modal'],
            ['coa_kategori' => 'pendapatan'],
            ['coa_kategori' => 'beli asset'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tk_coa_kategori');
    }
};
