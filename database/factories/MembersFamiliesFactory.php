<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MembersFamilies>
 */
class MembersFamiliesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'registrations_id' => 4,
            'last_name' => $this->faker->lastName(),
            'first_name_1' => $this->faker->firstNameFemale() ,
            'first_name_2' => $this->faker->firstNameMale(),
            'phone_1' => $this->faker->phoneNumber(),
            'phone_2' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'CheckList' => '{"id": 1, "title": "delectus aut autem", "userId": 1, "completed": false}',
            'locked' => false,
        ];
    }
}
