<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $table = "statuses";

    protected $guarded = [];

    public function comments()
    {
        return  $this->hasMany(Comment::class, 'status_id', 'id')
                ->join('users', 'users.id', 'comments.user_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
