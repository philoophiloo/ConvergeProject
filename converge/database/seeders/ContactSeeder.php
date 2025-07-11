<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::factory()->count(20)->create();
        $this->command->info('✔️ Seeded 20 contacts!');
    }
}
