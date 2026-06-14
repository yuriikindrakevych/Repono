<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class VerifyLicenseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'key' => ['required', 'string', 'max:64'],
            'domain' => ['required', 'string', 'max:255'],
            'product' => ['nullable', 'string', 'max:255'],
            'version' => ['nullable', 'string', 'max:32'],
        ];
    }
}
