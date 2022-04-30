<?php

namespace App\Http\Controllers;

use App\Models\Registrations;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Registrations  $registrations
     * @return \Illuminate\Http\Response
     */
    public function show(Registrations $registrations)
    {
        //
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
