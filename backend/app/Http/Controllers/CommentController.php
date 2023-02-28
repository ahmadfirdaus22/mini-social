<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'status_id' => 'required',
            'comment' => 'required'
        ]);
        $validated['user_id'] = auth()->id();

        $comments = Comment::create($validated);

        return response()->json([
            'status' => "OK",
            "data" => $comments
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'comment' => 'required'
        ]);
        $validated['user_id'] = auth()->id();

        $comment = Comment::where('id', $id);
        
        $comment->update($validated);

        return response()->json($comment->first(), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Comment::find($id)->delete();

        return response()->noContent();
    }
}
