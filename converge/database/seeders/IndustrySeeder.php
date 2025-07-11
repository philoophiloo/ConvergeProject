<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Industry;

class IndustrySeeder extends Seeder
{
    public function run(): void
    {
        dump('🧪 IndustrySeeder is running...');

        Industry::factory()->count(10)->create();

        $this->command->info('✔️ IndustrySeeder completed!');
    }
}
