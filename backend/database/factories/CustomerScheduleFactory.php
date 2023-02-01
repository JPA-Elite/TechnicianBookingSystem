<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerSchedule>
 */
class CustomerScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'customer_account_id' => 1,
            'description'=> $this->faker->paragraph(2),
            'date_started' => $this->faker->dateTimeThisCentury->format('Y-m-d'),
            'date_ended' => $this->faker->dateTimeThisCentury->format('Y-m-d'),
            'time_started' => $this->faker->time(),
            'time_ended' => $this->faker->time(),
            'status' => $this->status()
        ];
    }
    private function status()
    {
        $array = ['Ongoing', 'Done'];
        return $array[$this->faker->numberBetween($min = 0, $max = count($array) - 1)];
    }
}
