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
        Schema::create('customer_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_account_id');
            $table->string('description')->nullable();
            $table->string('date_started');
            $table->string('date_ended');
            $table->string('time_started');
            $table->string('time_ended');
            $table->string('status')->default('Ongoing');
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
        Schema::dropIfExists('customer_schedules');
    }
};
