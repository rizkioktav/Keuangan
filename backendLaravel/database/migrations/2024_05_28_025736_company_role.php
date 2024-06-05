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
        Schema::create('company_role', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->string('email');
            $table->unsignedBigInteger('role_id');
            $table->timestamps();
            
            $table->foreign('company_id')->references('id')->on('master_company')->onDelete('cascade');
            $table->foreign('email')->references('email')->on('users')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('master_role')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_role');
    }
};
