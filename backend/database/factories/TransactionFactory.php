<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'booking_request_id'=> $this->faker->randomDigit,
            'technician_account_id'=> $this->faker->randomDigit,
            'customer_account_id'=> $this->faker->randomDigit
        ];
    }
}
