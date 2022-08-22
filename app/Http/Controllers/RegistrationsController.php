<?php

namespace App\Http\Controllers;

use App\Models\Registrations;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
        $registing = Registrations::all();

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
        if (is_string($slug)) {
            $search = Str::replace('-', ' ', $slug);
            $regist = Registrations::query()
                ->where('Title', $search)
                ->get();
        }

        if (is_numeric($slug)) {
            $regist = Registrations::query()
                ->where('id', $slug)
                ->get();
        }

        if ($regist->count() === 0) {
            return response()->json(['Error' => "Aucun formulaire trouvé !" ], 404);
        }

        if ($regist->count() > 1) {
            return response()->json(['Error' => "Trop de formulaire ont le même titre !" ], 404);
        }
        
        return response()->json(['success' => [
            "List" => $regist
        ] ], 200);
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
