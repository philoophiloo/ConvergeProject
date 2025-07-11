<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Organization;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        Organization::factory()->count(10)->create();
        $this->command->info('✔️ Seeded 10 organizations!');
    }
}
