<?php

namespace App\Http\Controllers;

use App\Models\TechnicianCertificate;
use App\Models\TechnicianAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TechnicianCertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return TechnicianCertificate::all();
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'category' => 'required'
        ]);

        try {

            $cfn = Str::random(32) . "." . $request->image->getClientOriginalExtension();

            TechnicianCertificate::create([
                'image' => $cfn,
                'category' => $request->category,
                'technician_account_id' => $request->technician_account_id,

            ]);
            Storage::disk('cer_images')->put($cfn, file_get_contents($request->image));

            return response()->json(["message" => "Image Uploaded Succesfully"], 200);
        } catch (Exception $e) {
            return response()->json(["message" => "Image failed to upload!"], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TechnicianCertificate  $technicianCertificate
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Product Detail
        $cer = TechnicianAccount::find($id)->certificates;
        if (!$cer) {
            return response()->json([
                'message' => 'Certificates Not Found.',
            ], 404);
        }

        // Return Json Response
        return response()->json([
            'certificates' => $cer,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TechnicianCertificate  $technicianCertificate
     * @return \Illuminate\Http\Response
     */
    public function edit(TechnicianCertificate $technicianCertificate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TechnicianCertificate  $technicianCertificate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $validated = $request->validate([
        //     'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
        // ]);
        try {
            $cer = TechnicianCertificate::find($id);
            if(!$cer){
              return response()->json([
                'message'=>'certificate Not Found.'
              ],404);
            }
            $cer->image = $request->image;

            if ($request->image) {
                // Public storage
                $storage = Storage::disk('cer_images');

                // Old iamge delete
                if ($storage->exists($request->image)) {
                    $storage->delete($request->image);
                }

                // Image name
                $cfn = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                TechnicianCertificate::find($id)->update([

                    'image' => $cfn,
                    'category' => $request->category
                ]);

                // Image save in public folder
                $storage->put($cfn, file_get_contents($request->image));
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TechnicianCertificate  $technicianCertificate
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cer = TechnicianCertificate::find($id);
        $storage = Storage::disk('cer_images');

        // Iamge delete
        if ($storage->exists($cer->image)) {
            $storage->delete($cer->image);
        }

        // Delete Product
        $cer->delete();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully deleted.",
        ], 200);
    }
}
