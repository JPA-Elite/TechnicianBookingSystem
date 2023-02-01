<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerAccountController;
use App\Http\Controllers\TechnicianAccountController;
use App\Http\Controllers\TechnicianCertificateController;
use App\Http\Controllers\TechnicianFeedbackController;
use App\Http\Controllers\TechnicianScheduleController;
use App\Http\Controllers\CustomerScheduleController;
use App\Http\Controllers\CustomerFeedbackController;
use App\Http\Controllers\TechnicianNotificationController;
use App\Http\Controllers\MailBookingRequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post("/register/technician", [TechnicianAccountController::class, 'store']);
Route::post("/register/customer", [CustomerAccountController::class, 'store']);
Route::post('/login/technician', [AuthController::class, "loginTechnicianAcc"]);
Route::post('/login/customer', [AuthController::class, "loginCustomerAcc"]);



Route::middleware('auth:sanctum')->group(function () {

    Route::get("technician", [TechnicianAccountController::class, 'index']);
    Route::get("technician/{id}", [TechnicianAccountController::class, 'show']);
    Route::put("technician/{id}", [TechnicianAccountController::class, 'update']);

    Route::patch("technician/{id}", [TechnicianAccountController::class, 'update']);

    Route::put("technician-password/{id}", [TechnicianAccountController::class, 'update']);
    Route::patch("technician-password/{id}", [TechnicianAccountController::class, 'update']);

    Route::delete("technician/{id}", [TechnicianAccountController::class, 'destroy']);

    Route::get("customer", [CustomerAccountController::class, 'index']);
    Route::get("customer/{id}", [CustomerAccountController::class, 'show']);
    Route::put("customer/{id}", [CustomerAccountController::class, 'update']);
    Route::patch("customer/{id}", [CustomerAccountController::class, 'update']);
    Route::delete("customer/{id}", [CustomerAccountController::class, 'destroy']);
    Route::post("feedback/customer", [CustomerFeedbackController::class, 'store']);
    Route::post("schedule/customer", [CustomerScheduleController::class, 'store']);
    Route::get("schedule/customer/{id}", [CustomerScheduleController::class, 'show']);

    Route::get("schedule/{id}", [TechnicianScheduleController::class, 'show']);
    Route::post("schedule", [TechnicianScheduleController::class, 'store']);

    Route::post("feedback", [TechnicianFeedbackController::class, 'store']);

    Route::post('customer/logout', [AuthController::class, "logoutCustomerAcc"]);
    Route::post('technician/logout', [AuthController::class, "logoutTechnicianAcc"]);

    Route::post('certificate', [TechnicianCertificateController::class, "store"]);
    Route::get('certificate', [TechnicianCertificateController::class, "index"]);
    Route::get('certificate/{id}', [TechnicianCertificateController::class, "show"]);
    Route::put('certificate/{id}', [TechnicianCertificateController::class, "update"]);
    Route::patch('certificate/{id}', [TechnicianCertificateController::class, "update"]);
    Route::delete('certificate', [TechnicianCertificateController::class, "destroy"]);


    Route::apiResource('technician-notification',TechnicianNotificationController::class);

    Route::post('send-email-request',[MailBookingRequestController::class, 'requestBook']);




});

Route::middleware(['auth:sanctum', 'email_verified'])->get('/user', function (Request $request) {
    return $request->user();
});
