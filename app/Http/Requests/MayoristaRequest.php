<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MayoristaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            //
            'usuario.nombre' => 'required|max:200',
            'usuario.empresa' => 'required|max:200',
            'usuario.email' => 'required|email',
            'usuario.telefono' => 'required|max:10'
        ];
    }
}
