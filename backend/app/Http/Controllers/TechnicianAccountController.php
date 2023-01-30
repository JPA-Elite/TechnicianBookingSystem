<?php

namespace App\Http\Controllers;

use App\Models\TechnicianAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TechnicianAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TechnicianAccount::all();
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

        // dd($request->all());

        $validated = $request->validate([
            'name' => 'required',
            'gender' => 'required',
            'birthdate' => 'required',
            'age' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:technician_accounts,email',
            'valid_id' => 'required',
            'category' => 'required',
            'password' => 'required|confirmed|min:6',
        ]);
        return TechnicianAccount::create([
            'name' => $validated['name'],
            'gender' => $validated['gender'],
            'birthdate' => $validated['birthdate'],
            'age' => $validated['age'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'valid_id' => $validated['valid_id'],
            'category' => $validated['category'],
            'password' => Hash::make($validated['password']),
            'type' => 'technician',
            'image' => '',
            'email_verified_at' => now(),
            // 'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TechnicianAccount  $ownerAccount
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return TechnicianAccount::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TechnicianAccount  $ownerAccount
     * @return \Illuminate\Http\Response
     */
    public function edit(TechnicianAccount $ownerAccount)
    {
        //
    }

    /**
     * Update the specified
     */
    public function update(Request $request, $id)
    {
        // $validated = $request->validate([
        //     'name' => 'unique:customer_accounts',
        //     'email' => 'email|unique:customer_accounts,email',

        // ]);

        try {
            $cer = TechnicianAccount::find($id);
            if (!$cer) {
                return response()->json([
                    'message' => 'certificate Not Found.',
                ], 404);
            }
            $cer->image = $request->image;

            if ($request->image) {
                // Public storage
                $storage = Storage::disk('tech_profile_images');

                // Old iamge delete
                if ($storage->exists($request->image)) {
                    $storage->delete($request->image);
                }

                // Image name
                $cfn = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                TechnicianAccount::find($id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'address' => $request->address,
                    'gender' => $request->gender,
                    'age' => $request->age,
                    'birthdate' => $request->birthdate,
                    'phone' => $request->phone,
                    'valid_id' => $request->valid_id,
                    'category' => $request->category,
                    'image' => $cfn,
                ]);

                // Image save in public folder
                $storage->put($cfn, file_get_contents($request->image));
            }
            else{
                TechnicianAccount::find($id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'address' => $request->address,
                    'gender' => $request->gender,
                    'age' => $request->age,
                    'birthdate' => $request->birthdate,
                    'phone' => $request->phone,
                    'valid_id' => $request->valid_id,
                    'category' => $request->category
                ]);
            }

            // Return Json Response
            return response()->json([
                'message' => "Product successfully updated.",
            ], 200);
        } catch (Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!",
            ], 500);
        }

        return TechnicianAccount::find($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'gender' => $request->gender,
            'age' => $request->age,
            'birthdate' => $request->birthdate,
            'phone' => $request->phone,
            'valid_id' => $request->valid_id,
            'category' => $request->category,
            'password' => Hash::make($request->password),
            'image' => $request->image,

        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TechnicianAccount  $ownerAccount
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return TechnicianAccount::find($id)->delete();
    }
}
