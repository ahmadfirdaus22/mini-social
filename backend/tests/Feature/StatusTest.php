<?php

namespace Tests\Feature;

use App\Models\Status;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StatusTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;

    public function test_user_can_get_all_own_status()
    {
        Status::factory()->count(5)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->get('/api/status');

        $response->assertStatus(200)
                ->assertJsonPath('user.total', 5);
    }

    public function test_user_can_get_all_another_user_status()
    {
        Status::factory()->count(5)->create();

        $response = $this->actingAs($this->user)->get('/api/status');

        $response->assertStatus(200)
                ->assertJsonPath('not_user.total', 5);
    }

    public function test_user_can_get_one_status()
    {
        $status = Status::factory()->create();

        $response = $this->actingAs($this->user)->get("/api/status/$status->id");

        $response->assertStatus(200)
                ->assertJsonPath('data.status', $status->status);
    }

    public function test_user_can_create_status()
    {
        $status = Status::factory()->create();

        $response = $this->actingAs($this->user)->post('/api/status', $status->toArray());

        $response->assertStatus(201)
                ->assertJsonPath('data.status', $status->status);

        $this->assertDatabaseHas('statuses', [
            'id' => $status->id
        ]);
    }

    public function test_user_can_update_status()
    {
        $status = Status::factory()->create(['user_id' => $this->user->id]);

        $new = Status::factory()->create(['user_id' => $this->user->id]);
   
        $response = $this->actingAs($this->user)->post("/api/status/$status->id", $new->toArray());
       
        $response->assertStatus(201);

        $this->assertDatabaseHas('statuses',[
            "status" => $new->status
        ]);
    }

    public function test_user_can_delete_own_status()
    {
        $status = Status::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->delete("/api/status/$status->id");
      
        $response->assertStatus(204);

        $this->assertDatabaseMissing('statuses',[
            'id' => $status->id
        ]);
    }

    public function test_user_cannot_delete_another_user_status()
    {
        $status = Status::factory()->create();

        $response = $this->actingAs($this->user)->delete("/api/status/$status->id");
      
        $response->assertStatus(200);

        $this->assertDatabaseHas('statuses',[
            'id' => $status->id
        ]);
    }
}
