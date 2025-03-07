<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request) {
        // Se validan los datos recibidos en la peticion mediante $request->validate()
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']); // Se remueve la propiedad remember de `$credentials`

        // Se valida si las credenciales de login son invalidas utilizando `Auth::attemp()`
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User $user */
        $user = Auth::user(); // Se asigna el usuario autenticado a la variable `$user`
        if (!$user->is_admin) {
            Auth::logout();

            return response([
                'message' => 'You don\'t have permissions to authenticate as admin'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Se crea un token de autenticacion para el usuario logueado
        $token = $user->createToken('token')->plainTextToken;

        return response([
            /**
             * Haciendo uso del recurso `UserResource` se asigna a la propiedad user de la response
             * un array que contiene el id, name e email del usuario logueado.
            */
            'user' => new UserResource($user),
            'token' => $token // Se retorna en la response el token generado para el usuario logueado
        ], Response::HTTP_OK);
    }

    public function logout() {
        /** @var User $user */
        $user = Auth::user();

        // Se elimina el token asociado al usuario logueado
        $user->currentAccessToken()->delete();

        return response([
            'message' => 'Logout OK'
        ], Response::HTTP_OK);
    }

    public function getUser(Request $request) {
        // Se obtienen los datos del usuario autenticado
        return new UserResource($request->user());
    }
}
