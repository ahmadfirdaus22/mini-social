<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all user status in specified user
        $data1 = Status::selectRaw('id,user_id,status,created_at')
                        ->where('user_id', auth()->id())
                        ->paginate();

        //Get all user status without exception
        $data2 = Status::selectRaw('id,user_id,status,created_at')
                        ->where('user_id', "!=" ,auth()->id())
                        ->paginate();

        return response()->json([
            'user' => $data1,
            'not_user' => $data2
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated =  $request->validate([    
            "status" => 'required|string'
        ]);
        $validated['user_id'] = auth()->id();

        $status = Status::create($validated);

        return response()->json([
            'status' => "OK",
            "data" => $status
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Status::where('id',$id)
                        ->with('comments')
                        ->first();

        return response()->json([
            'status' => "OK",
            "data" => $data
        ]);
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
        $validated =  $request->validate([
            "status" => 'required|string'
        ]);
        $validated['user_id'] = auth()->id();

        $data = Status::where('id', $id);
        
        $data->update($validated);

        return response()->json($data->first(), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $status = Status::find($id);
        if($status->user_id == auth()->id()){
            $status->delete();
            return response()->noContent();
        }else{
            return response()->json([
                "message" => "You can't delete other user status"
            ]);
        }
    }
}
