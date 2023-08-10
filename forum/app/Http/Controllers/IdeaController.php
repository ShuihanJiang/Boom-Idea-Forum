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
    //view ideas, along with the corresponding counts of upvotes and comments
    // public function index()
    // { 
    //     $ideas = Idea::withCount('upvotes', 'comments')->get();
    //     return response()->json($ideas,200);
    // }
    public function index(User $user)
    {
        // if (Auth::id() !== $user->id) {
        //     return response()->json(['error' => 'Unauthorized'], 403);
        // }
        // to get user's idea $user->ideas 
        return response()->json($user->ideas);
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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $idea = Idea::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'user_id' => auth()->user()->id,
        ]);

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
    public function update(Request $request, Idea $idea)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $idea = Idea::find($idea->id);
        $idea->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return response()->json($idea,200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea)
    {
        $idea = Idea::find($idea->id);
        $idea->delete();

        return response()->json(['message' => 'Idea deleted successfully']);
    }

    
}
