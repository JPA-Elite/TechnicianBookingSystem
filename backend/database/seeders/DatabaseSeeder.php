<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TechnicianAccount;
use App\Models\TechnicianSchedule;
use App\Models\TechnicianFeedback;
use App\Models\TechnicianNotification;
use App\Models\CustomerAccount;
use App\Models\Book;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        TechnicianAccount::factory(10)->create();
        CustomerAccount::factory(10)->create();
        TechnicianSchedule::factory(10)->create();
        TechnicianFeedback::factory(10)->create();
        TechnicianNotification::factory(10)->create();





    }


}
