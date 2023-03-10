<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
 
        $request->validate([
            'email' => "nullable|string|email",
            'phone' => "nullable|string",
            'password' => 'required|string'
        ]);
        
        if($request->has('email')){
            $credentials = $request->only('email', 'password');
        }else if($request->has('phone')){
            $credentials = $request->only('phone', 'password');
        }
        
        
        $token = Auth::attempt($credentials);
        
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Refresh an authenticated session.
     */
    public function refresh()
    {
        $token = auth()->refresh();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Checking a Token
     */
    public function check()
    {
        $token = Auth::check();
        return response()->json([
            'status' => $token
        ]);
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        auth()->logout(true);

        return response()->noContent(); 
    }

}
