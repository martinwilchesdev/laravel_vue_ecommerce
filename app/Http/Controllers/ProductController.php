<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\URL;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductListResource;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::query();
        $search = request('search', '');
        $perPage = request('perPage', 10);
        $sortField = request('sortField', 'id');
        $sortDirection = request('sortDirection', 'desc');

        $query->orderBy($sortField, $sortDirection);
        if (!empty($search)) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('price', 'like', '%' . $search . '%');
        }

        return ProductListResource::collection($query->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        // Se valida la imagen de acuerdo a las reglas definidas en `ProductRequest`
        $data = $request->validated();

        // Se obtiene el id del usuario autenticado y se asociada a los campos `created_by` y `updated_by`
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        /** @var \Illuminate\Http\UploadFile $image  */
        $image = $data['image'] ?? null;

        if ($image) {
            // Se guarda la imagen y se obtiene su ruta relativa
            $relativePath = $this->saveImage($image);

            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();
        }

        $product = Product::create($data);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        $data['updated_by'] = $request->user()->id;

        /** @var \Illuminate\Http\UploadFile $image  */
        $image = $data['image'] ?? null;

        if ($image) {
            // Se guarda la imagen y se obtiene su ruta relativa
            $relativePath = $this->saveImage($image);

            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();
        }

        $product->update($data);

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response([
            'message' => 'product deleted successfully'
        ], Response::HTTP_NO_CONTENT);
    }

    private function saveImage(UploadedFile $image) {
        // Se genera una ruta que inicia con `images/` seguido de un string aleatorio
        $path = 'images/' . Str::random();

        // Si la ruta no existe
        if (!Storage::exists($path)) {
            // Se crea el nuevo directorio en la ruta especificada
            Storage::makeDirectory($path, 0755, true);
        }

        // Si la imagen no puede ser guardada
        if (!Storage::putFileAs('/public' . '/' . $path, $image, $image->getClientOriginalName())) {
            // Se lanza una excepcion
            throw new  \Exception("Unable to save file \"{$image->getClientOriginalName()}\"");
        }

        // Si la imagen se guarda correctamente se retorna la ruta relativa donde se almaceno
        return $path . '/' . $image->getClientOriginalName();
    }
}
