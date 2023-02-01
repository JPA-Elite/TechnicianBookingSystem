<?php

namespace App\Http\Controllers;

use App\Models\CustomerNotification;
use Illuminate\Http\Request;
use App\Models\CustomerAccount;

class CustomerNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CustomerNotification::all();
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
        $cus_id = CustomerNotification::where('email',  $request->email)->first()->id;

        return CustomerNotification::create([
            'customer_account_id' =>   $cus_id ,
            'message' => $request->message,

        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CustomerNotification  $customerNotification
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CustomerAccount::find($id) -> notifications;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CustomerNotification  $customerNotification
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomerNotification $customerNotification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerNotification  $customerNotification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomerNotification $customerNotification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CustomerNotification  $customerNotification
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        CustomerNotification::find($id)->delete();
    }
}
