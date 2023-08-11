<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Idea;
use App\Models\Upvote;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{

    /**
     * Upvote the specified idea.
     */
    // public function upvoteIdea(Idea $idea, User $user)
    // {
    //     if (Auth::id() !== $user->id) {
    //         return response()->json(['error' => 'Unauthorized'], 403);
    //     }

    //     // Update the upvotes_count for the idea
    //     $idea->upvotes_count++; // Increase the upvotes_count
    //     $idea->save();

    //     return response()->json(['message' => 'Idea upvoted successfully', 'upvotes_count' => $idea->upvotes_count]);
    // }




    
}
