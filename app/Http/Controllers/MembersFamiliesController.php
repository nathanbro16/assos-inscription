<?php

namespace App\Http\Controllers;

use App\Models\Members;
use App\Models\MembersFamilies;
use Illuminate\Http\Request;

class MembersFamiliesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Display a listing of the resource.
     * @param  \App\Models\Registrations  $registrations
     * @return \Illuminate\Http\Response
     */
    public function indexoffamilies($registrations)
    {
        $Families = MembersFamilies::where('registrations_id', $registrations)->get();

        if($Families->count() === 0) {
            return response()->json(['error' => 'not values' ], 202); 
        }
        foreach ($Families as $key => $Familie) {
            $Families[$key]['Members'] = Members::where('members_families_id', $Familie['id'])->get();
        }

        return response()->json(['success' => $Families], 200);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'registrations_id' => 'required|numeric',
            'last_name' => 'required|string',
            'first_name_1' => 'required|string',
            'first_name_2' => 'required|string',
            'first_name_1' => 'required|string',
            'phone_1' => 'required|numeric|digits:10',
            'phone_2' => 'required|numeric|digits:10',
            'email' => 'required|email'
        ]);

        $registrations = Registrations::create([
            'registrations_id' => $request->registrations_id,
            'last_name' => 'required|string',
            'first_name_1' => 'required|string',
            'first_name_2' => 'required|string',
            'first_name_1' => 'required|string',
            'phone_1' => 'required|numeric|digits:10',
            'phone_2' => 'required|numeric|digits:10',
            'email' => 'required|email'
        ]);

        $result = $registrations;

        return response()->json(['success' => $result ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MembersFamilies  $membersFamilies
     * @return \Illuminate\Http\Response
     */
    public function show(MembersFamilies $membersFamilies)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MembersFamilies  $membersFamilies
     * @return \Illuminate\Http\Response
     */
    public function edit(MembersFamilies $membersFamilies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MembersFamilies  $membersFamilies
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MembersFamilies $membersFamilies)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MembersFamilies  $membersFamilies
     * @return \Illuminate\Http\Response
     */
    public function destroy(MembersFamilies $membersFamilies)
    {
        //
    }
}
