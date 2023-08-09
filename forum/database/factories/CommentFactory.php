<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Idea;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->paragraph(3),
            'user_id' => $this->faker->numberBetween(1, 10),
            'idea_id' => $this->faker->numberBetween(1, 20)
            // 'user_id' => User::factory(),
            // 'idea_id' => Idea::factory()
        ];
    }
}
