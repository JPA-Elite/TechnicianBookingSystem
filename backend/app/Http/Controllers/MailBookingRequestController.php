<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\MailBookingRequest;

class MailBookingRequestController extends Controller
{
    public function requestBook(){
        $data = [
            'subject' => 'Techbook Booking Request Notification',
            'body' => 'New request from customer'
        ];

        try {
            Mail::to('joshua.algadipe@student.passerellesnumeriques.org')->send(new MailBookingRequest($data) );
            return response()->json(['Check your inbox in your gmail account!']);
        }

        catch (Exception $e){
            return response()->json(['Not send, something went wrong!']);
        }

    }
}
