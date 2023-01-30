<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\CustomerAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CustomerAccount::all();
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
        $validated = $request->validate([
            'name' => 'required',
            'gender' => 'required',
            'birthdate' => 'required',
            'age' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:customer_accounts,email',
            'password' => 'required|confirmed|min:6'
        ]);
        return CustomerAccount::create([
            'name'=> $validated['name'],
            'gender' => $validated['gender'],
            'birthdate' => $validated['birthdate'],
            'age' => $validated['age'],
            'address'=> $validated['address'],
            'phone'=> $validated['phone'],
            'email'=> $validated['email'],
            'password'=>Hash::make($validated['password']),
            'type'=> 'customer',
            'image' => '',
            'email_verified_at' => now(),
            // 'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CustomerAccount  $customerAccount
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CustomerAccount::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CustomerAccount  $customerAccount
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomerAccount $customerAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerAccount  $customerAccount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $validated = $request->validate([
        //     'name' => 'unique:customer_accounts',
        //     'email' => 'email|unique:customer_accounts,email',

        // ]);
        return CustomerAccount::find($id)->update([
            'name'=> $request->name,
            'email'=> $request->email,
            'address'=> $request->address,
            'gender'=>$request->gender,
            'age'=> $request->age,
            'birthdate'=>$request->birthdate,
            'phone'=>$request->phone,
            'password'=>Hash::make($request->password),
            'image'=>$request->image


        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CustomerAccount  $customerAccount
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return CustomerAccount::find($id)->delete();
    }
}
