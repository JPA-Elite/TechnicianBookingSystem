<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TechnicianCertificate>
 */
class TechnicianCertificateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'image' => $this->faker->image($dir = null, $width = 640, $height = 480),
            'category' => $this->category(),
            'technician_account_id' => 1
        ];
    }

    private function category(){
        $array = ['Electrical Service Technician', 'IT Technician', 'Water Technician', 'Medical equipment technician', 'Automotive Technician'];
        return $array[$this->faker->numberBetween($min = 0, $max = count($array) - 1) ];
    }
}
