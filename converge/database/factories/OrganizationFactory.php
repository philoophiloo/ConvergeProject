<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\Industry;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'description' => $this->faker->sentence,
            'industry_id' => Industry::factory(), // create related industry
            'website' => $this->faker->url,
            'logo_url' => $this->faker->imageUrl(200, 200, 'business'),
            'founded_date' => $this->faker->date(),
            'tax_id' => strtoupper($this->faker->bothify('KRA###??')),
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
