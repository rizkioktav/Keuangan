<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdCompanyToTkCoaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tk_coa', function (Blueprint $table) {
            $table->unsignedBigInteger('id_company')->nullable()->after('id');

            // Menambahkan foreign key
            $table->foreign('id_company')->references('id')->on('master_company')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tk_coa', function (Blueprint $table) {
            // Drop foreign key
            $table->dropForeign(['id_company']);
            $table->dropColumn('id_company');
        });
    }
}

