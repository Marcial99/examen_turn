<?php

namespace App\Http\Controllers;

use App\Http\Requests\MayoristaRequest;
use App\Models\Address;
use App\Models\Billingdata;
use App\Models\Ciudad;
use App\Models\CodigoPostal;
use App\Models\Colonia;
use App\Models\Estado;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MayoristaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $mayoristas = User::all();
        $status = $request->session()->get('status');
        return Inertia::render('Mayorista/Mayoristas', [
            'mayoristas' => $mayoristas
        ])->with($status);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $colonias  = Colonia::all();
        return Inertia::render('Mayorista/MayoristaCreate');
    }

    public function cp(Request $request)
    {
        $cp = CodigoPostal::where('CCp', $request->cp)->first();
        if ($cp) {
            return response(json_encode($cp), 200);
        } else {
            return response('No encontrado', 404);
        }
    }

    public function neighborhoods(Request $request)
    {
        $colonias  = Colonia::where('CCodigoPostal', $request->cp)->get();
        return response(json_encode($colonias), 200);
    }

    public function ciudad(Request $request)
    {
        $cp = CodigoPostal::where('CCp', $request->cp)->first();
        if ($cp) {
            $ciudad = Ciudad::where('CMunicipio', $cp->CMunicipio)->where('CEstado', $cp->CEstado)->first();
            return response(json_encode($ciudad), 200);
        } else {
            return response(json_encode([]), 200);
        }
    }

    public function estado(Request $request)
    {
        $cp = CodigoPostal::where('CCp', $request->cp)->first();
        if ($cp) {
            $estado = Estado::where('CEstado', $cp->CEstado)->first();
            return response(json_encode($estado), 200);
        } else {
            return response(json_encode([]), 200);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MayoristaRequest $request)
    {
        //

        $mayorista = User::create([
            'Name' => $request->usuario['nombre'],
            'Company' => $request->usuario['empresa'],
            'Email' => $request->usuario['email'],
            'Phone' => $request->usuario['telefono'],
            'Discount' => $request->usuario['descuento'],
            'BusinessName' => $request->facturacionInfo['razon'],
            'Cfdi' => $request->facturacionInfo['cfdi'],
            'Rfc' => $request->facturacionInfo['rfc'],
            'Status' => 1
        ]);

        Address::create([
            'FK_IdUser' => $mayorista->id,
            'ContactName' => $request->envio['nombre_contacto'],
            'Address' => $request->envio['direccion'],
            'PostalCode' => $request->envio['cp'],
            'Neighborhood' => $request->envio['colonia'],
            'City' => $request->envio['ciudad'],
            'State' => $request->envio['estado'],
            'Email' => $request->envio['email'],
            'Phone' => $request->envio['telefono'],
            'Status' => 1
        ]);

        Billingdata::create([
            'FK_IdUser' => $mayorista->id,
            'ContactName' => $request->facturacion['nombre_contacto'],
            'Address' => $request->facturacion['direccion'],
            'PostalCode' => $request->facturacion['cp'],
            'Neighborhood' => $request->facturacion['colonia'],
            'City' => $request->facturacion['ciudad'],
            'State' => $request->facturacion['estado'],
            'Email' => $request->facturacion['email'],
            'Phone' => $request->facturacion['telefono'],
            'Status' => 1
        ]);

        return redirect()->route('mayorista.index')->with(['status' => 'correcto']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
