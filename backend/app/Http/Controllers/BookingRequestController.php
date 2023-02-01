<?php

namespace App\Http\Controllers;

use App\Models\BookingRequest;
use Illuminate\Http\Request;

class BookingRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BookingRequest::all();
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
            'subject' => 'required',
            'message' => 'required',
            'date' => 'required',
            'customer_account_id' => 'required',
            'technician_account_id' => 'required'
        ]);
        return BookingRequest::create([
            'subject' =>  $validated['subject'],
            'message' => $validated['message'],
            'date' => $validated['date'],
            'customer_account_id' => $validated['customer_account_id'],
            'technician_account_id' => $validated['technician_account_id'],
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BookingRequest  $bookingRequest
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return BookingRequest::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BookingRequest  $bookingRequest
     * @return \Illuminate\Http\Response
     */
    public function edit(BookingRequest $bookingRequest)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BookingRequest  $bookingRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        return BookingRequest::find($id)->update([
            'subject' => $request -> subject,
            'message' => $request -> message,
            'date' => $request ->  date ,
            'customer_account_id' => $request -> customer_account_id,
            'technician_account_id' => $request ->  technician_account_id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BookingRequest  $bookingRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return BookingRequest::find($id)->delete();
    }
}
