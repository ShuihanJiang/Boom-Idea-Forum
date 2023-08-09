<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\Upvote;

use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    public function upvoteIdea(Idea $idea)
    {
        $idea = Idea::find($idea->id);
        $user = auth()->user();

        $existingUpvote = Upvote::where('user_id', $user->id)
                                ->where('idea_id', $idea->id)
                                ->first();

        if ($existingUpvote) {
            return response()->json(['error' => 'You have already upvoted this idea.'], 400);
        }

        $upvote = new Upvote();
        $upvote->user_id = $user->id;
        $upvote->idea_id = $idea->id;
        $upvote->save();

        $idea->upvotes++;
        $idea->save();

        return response()->json(['message' => 'Idea upvoted successfully']);
    }
}
