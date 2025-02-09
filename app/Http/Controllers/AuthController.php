<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        // Se valida si las credenciales de login son invalidas
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User $user */
        $user = Auth::user();
        if (!$user->is_admin) {
            Auth::logout();

            return response([
                'message' => 'You don\'t have permissions to authenticate as admin'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token
        ], Response::HTTP_OK);
    }

    public function logout() {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'message' => 'Logout OK'
        ], Response::HTTP_OK);
    }

    public function getUser(Request $request) {
        return new UserResource($request->user());
    }
}
