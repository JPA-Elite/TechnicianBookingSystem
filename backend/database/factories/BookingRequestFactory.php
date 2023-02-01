<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingRequest>
 */
class BookingRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'subject' => $this->faker->paragraph(1),
            'message' => $this->faker->paragraph(1),
            'date' => $this->faker->dateTimeThisCentury->format('Y-m-d'),
            'customer_account_id' => 1,
            'technician_account_id' => 1,
        ];
    }
}
