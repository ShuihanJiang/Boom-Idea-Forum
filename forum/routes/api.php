<?php

use App\Http\Controllers\IdeaController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UpvoteController;
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

// //a protected group of routes
// Route::middleware('auth:sanctum')->group(function () {
//     // Ideas
//     Route::apiResource('ideas', IdeaController::class)->except(['index']);

//     // Comments 
//     Route::post('/ideas/{id}/comments', [CommentController::class, 'store', 'destroy']);

//     // Upvotes
//     Route::post('/ideas/{id}/upvotes', [UpvoteController::class, 'upvoteIdea']);
// });

// Route::get('/ideas', [IdeaController::class, 'index']);
Route::middleware(['auth:sanctum'])->group(function () {
    // any route in here is protected
    // Route::apiResource('users.ideas', IdeaController::class);
});
Route::apiResource('users.ideas', IdeaController::class);