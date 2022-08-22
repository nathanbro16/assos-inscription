<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\MembersFamilies;
use App\Models\Members;
use Illuminate\Support\Arr;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $numbers = [1, 2, 3, 4];
        // \App\Models\User::factory(10)->create();
        MembersFamilies::factory(1)
            ->has(Members::factory(Arr::random($numbers)))
            ->create();

        
    }
}
