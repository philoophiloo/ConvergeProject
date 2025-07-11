<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition(): array
    {
        return [
            'organization_id' => Organization::factory(),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'job_title' => $this->faker->jobTitle,
            'department' => $this->faker->randomElement(['IT', 'HR', 'Marketing', 'Finance']),
            'is_primary_contact' => $this->faker->boolean(20), // 20% chance
            'notes' => $this->faker->sentence(),
            'email' => $this->faker->unique()->safeEmail,
            'office_phone_number' => $this->faker->phoneNumber,
            'mobile_phone_number' => $this->faker->e164PhoneNumber,
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
