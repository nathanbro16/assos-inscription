<?php

namespace App\Http\Controllers;

use App\Models\Registrations;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegistrationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check()) {
            $registing = Registrations::all();

            return response()->json(['success' => $registing], 200);
        }
        $registing = Registrations::query()
            ->where('IsOpen', true)
            ->get();

        return response()->json(['success' => $registing], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'Titre' => 'required|string',
            'IsSuccess' => 'required|string',
            //'CheckList' => 'required|json',
            'DateOpen' => 'required|date',
            'DateClosed'=> 'required|date|after:DateOpen',
            'IsOpen' => 'required|boolean'
        ]);

        $registrations = Registrations::create([
            'Title' => $request->Titre,
            'IsSuccess' => $request->IsSuccess,
            //'CheckList' => $request->CheckList,
            'CheckList'=> null,
            'DateOpen' => $request->DateOpen,
            'DateClosed'=> $request->DateClosed,
            'IsOpen' => $request->IsOpen,
        ]);

        $result = $registrations;

        return response()->json(['success' => $result ], 200);

    }
    /**
     * Check the specified resource are exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function search($slug)
    {

        if (Auth::check()) {
            if (is_string($slug)) {
                $search = Str::replace('-', ' ', $slug);
                $regist = Registrations::where('Title', $search)
                    ->first();
            }
    
            if (is_numeric($slug)) {
                $regist = Registrations::where('id', $slug)
                    ->first();
    
            }
    
            if ($regist === null) {
                return response()->json(['error' => "Erreur : Aucun formulaire n'a été trouvé !" ], 404);
            }
    
            return response()->json($regist, 200);
        }

        if (is_string($slug)) {
            $search = Str::replace('-', ' ', $slug);
            $regist = Registrations::query()
                ->where('Title', $search)
                ->Where('IsOpen', 1)
                ->first();
        }

        if (is_numeric($slug)) {
            $regist = Registrations::where('id', $slug)
                ->Where('IsOpen', 1)
                ->first();

        }

        if ($regist === null) {
            return response()->json(['error' => "Erreur : Aucun formulaire n'a été trouvé !" ], 404);
        }

        return response()->json($regist, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Registrations  $registrations
     * @return \Illuminate\Http\Response
     */
    public function show(Registrations $registrations)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Registrations  $registrations
     * @return \Illuminate\Http\Response
     */
    public function edit(Registrations $registrations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Registrations  $registrations
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Registrations $registrations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Registrations  $registrations
     * @return \Illuminate\Http\Response
     */
    public function destroy(Registrations $registrations)
    {
        //
    }
}
