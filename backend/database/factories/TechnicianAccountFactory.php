<?php

namespace Database\Factories;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TechnicianAccount>
 */
class TechnicianAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [

            'name' => $this->faker->name,
            'gender' => $this->gender(),
            'birthdate' => $this->faker->dateTimeThisCentury->format('Y-m-d'),
            'age' => $this->faker->numberBetween($min = 18, $max = 90),
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->safeEmail,
            'valid_id' => $this->faker->image($dir = null, $width = 640, $height = 480),
            'category' => $this->category(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'type'=> 'technician',
            'image'=> '',


            'email_verified_at' => now(),
            // 'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    private function gender(){
        $array = ['male', 'female'];
        return $array[$this->faker->numberBetween($min = 0, $max = count($array) - 1) ];
    }
    private function category(){
        $array = ['Electrical Service Technician', 'IT Technician', 'Water Technician', 'Medical equipment technician', 'Automotive Technician'];
        return $array[$this->faker->numberBetween($min = 0, $max = count($array) - 1) ];
    }
}
