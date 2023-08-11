<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class IdeaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index(User $user)
    {
        if (Auth::id() !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $ideas = Idea::with('user', 'comments.user','upvotes.user')->get();

        return response()->json($ideas, 200);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        if (Auth::id() !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $idea = new idea;
        $idea->title = $request->input('title');
        $idea->content = $request->input('content');
        $idea->user_id = Auth::id();
        $idea->save();
        return response()->json($idea, 201);
    }


    /**
     * Display the specified idea with comments.
     */
    public function show(Idea $idea)
    {
        $idea = Idea::with('comments')->find($idea->id);
        return response()->json($idea, 200);
        // $idea = Idea::withCount('upvotes', 'comments')->find($idea->id);
        // return response()->json($idea, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Idea $idea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user, Idea $idea)
        {
            if (Auth::id() !== $idea->user_id) {
                return response()->json(['error' => 'unauthorized'], 403);
            }

            $idea->title = $request->input('title');
            $idea->content = $request->input('content');
            $idea->save();

            return response()->json($idea,200);
        }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user,Idea $idea)
    {
        if (Auth::id() !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $idea = Idea::find($idea->id);
        $idea->delete();

        return response()->json(['message' => 'Idea deleted successfully']);
    }

    
}


