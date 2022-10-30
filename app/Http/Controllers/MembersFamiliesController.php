<?php

namespace App\Http\Controllers;

use App\Models\Members;
use App\Models\MembersFamilies;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

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
            'lastName1' => 'required|string',
            'lastName2' => 'required|string',
            'firstName1' => 'required|string',
            'firstName2' => 'required|string',
            'Phone1' => 'required|numeric|digits:10',
            'Phone2' => 'required|numeric|digits:10',
            'Email1' => 'required|email',
            'Email2' => 'required|email',
            'members' => 'required',
            'TypeIns' => [new Enum(TypeOfRegister::class)],

        ]);

        $result = MembersFamilies::create([
            'registrations_id' => $request->registrations_id,
            'last_name_1' => $request->last_name_1, 
            'last_name_2' => $request->last_name_2, 
            'first_name_1' => $request->first_name_1, 
            'first_name_2' => $request->first_name_2,
            'phone_1' => $request->phone_1,
            'phone_2' => $request->phone_2, 
            'email_1' => $request->email_1,
            'email_2' => $request->email_2,
            'type_of_register' => [new Enum(TypeOfRegister::class)],
        ]);

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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $membersFamilies)
    {
        $Familie = MembersFamilies::find($membersFamilies); 
        $this->validate($request, [
            'last_name' => 'string',
            'first_name_1' => 'string',
            'first_name_2' => 'string',
            'phone_1' => 'numeric|digits:10',
            'phone_2' => 'numeric|digits:10',
            'email' => 'email',
        ]);

        $data = $request->all();

        foreach ($data as $key => $value) {
            if (!empty($value)) {
                $Familie->$key = $value; 
            }
        }

        $Familie->save();
        $Familie['Members'] = Members::where('members_families_id', $Familie['id'])->get();
        return response()->json(['success' => $Familie ], 200);

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
