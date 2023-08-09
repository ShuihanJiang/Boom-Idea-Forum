<?php

use Http\Controllers\IdeaController;
use Http\Controllers\CommentController;
use Http\Controllers\UpvoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    // Ideas
    Route::apiResource('ideas', IdeaController::class)->except(['index']);

    // Comments
    Route::post('/ideas/{id}/comments', [CommentController::class, 'store']);
});

Route::get('/ideas', [IdeaController::class, 'index']);