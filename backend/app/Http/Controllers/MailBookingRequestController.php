<?php

namespace App\Http\Controllers;

use App\Mail\MailBookingRequest;
use App\Models\BookingRequest;
use App\Models\CustomerAccount;
use App\Models\TechnicianAccount;
use Illuminate\Http\Request;
use Mail;

class MailBookingRequestController extends Controller
{
    public function requestBook(Request $request)
    {

        try {

            $validated = $request->validate([
                'subject' => 'required',
                'message' => 'required',
                'date' => 'required',
                'customer_account_id' => 'required',
                'technician_account_id' => 'required',
                'email' => 'required',
            ]);

            $tech_fully_validated = null;
            if ($validated['technician_account_id'] != null) {
                $tech_fully_validated = $validated['technician_account_id'];
            } else {

                if (TechnicianAccount::where('email', $validated['email'])->first() != null) {
                    $tech_fully_validated = TechnicianAccount::where('email', $validated['email'])->first()->id;
                    BookingRequest::create([
                        'subject' => $validated['subject'],
                        'message' => $validated['message'],
                        'date' => $validated['date'],
                        'customer_account_id' => $validated['customer_account_id'],
                        'technician_account_id' => $tech_fully_validated,
                    ]);

                    $user = CustomerAccount::find($validated['customer_account_id']);
                    $data = [
                        'name' => $user->name,
                        'location' => $user->address,
                        'phone' => $user->phone,
                        'email' => $user->email,
                        'subject' => $validated['subject'],
                        'message' => $validated['message'],
                    ];

                    Mail::to($request->email)->send(new MailBookingRequest($data));
                    response()->json(['Check your inbox in your gmail account!']);
                } else {
                    return response()->json("No email available in technician accounts!");
                }

            }



        } catch (Exception $e) {
            response()->json(['Not send, something went wrong!']);
        }

        //    response()->json(['cus id is ' . $cus_id . ' tect id is ' . $tect_id]);

    }
}
