<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Status;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;

    public function test_user_can_add_comment()
    {
        $status = Status::factory()->create(['user_id' => $this->user->id]);
        
        $comment = Comment::factory()->create(['status_id' => $status->id]);
      
        $response = $this->actingAs($this->user)->post('/api/comment', $comment->toArray());

        $response->assertStatus(201)
                ->assertJsonPath('data.comment', $comment->comment);
    }

    public function test_user_can_update_comment()
    {
        $status = Status::factory()->create(['user_id' => $this->user->id]);

        $comment = Comment::factory()->create(['status_id' => $status->id]);

        $newcomment = Comment::factory()->create(['status_id' => $status->id]);

        $response = $this->actingAs($this->user)->post("/api/comment/$comment->id", $newcomment->toArray());

        $response->assertStatus(201);

        $this->assertDatabaseHas('comments', [
            'comment' => $newcomment->comment
        ]);

        $this->assertDatabaseMissing('comments', [
            'comment' => $comment->comment
        ]);
    }

    public function test_user_can_delete_comment()
    {
        $status = Status::factory()->create(['user_id' => $this->user->id]);

        $comment = Comment::factory()->create(['status_id' => $status->id]);

        $response = $this->actingAs($this->user)->delete("/api/comment/$comment->id");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('comments', [
            'id' => $comment->id
        ]);
    }


}
