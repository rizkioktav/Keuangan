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
        Schema::create('periode', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_company');
            $table->year('year');
            $table->decimal('total_asset', 15, 2);
            $table->decimal('total_kewajiban', 15, 2);
            $table->decimal('total_modal', 15, 2);
            $table->timestamp('last_updated_asset')->nullable();
            $table->timestamp('last_updated_kewajiban')->nullable();
            $table->timestamp('last_updated_modal')->nullable();

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
        Schema::dropIfExists('periode');
    }
};
