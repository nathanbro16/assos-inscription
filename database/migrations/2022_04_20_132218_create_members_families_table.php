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
        Schema::create('members_families', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId("registrations_id")->constrained();
            $table->string('last_name_1');
            $table->string('first_name_1');
            $table->string('first_name_2')->nullable();
            $table->string('phone_1')->unique();
            $table->string('phone_2')->unique()->nullable();
            $table->string('email_1')->unique();
            $table->json('CheckList');
            $table->boolean('locked')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members_families');
    }
};
