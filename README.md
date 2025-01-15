# Laravel

Inicializar un proyecto de con el instalador de Laravel

```sh
composer global require laravel/installer
laravel new example-name
```

Crear un modelo y su respectiva migracion

```sh
php artisan make:model ModelName -m
```

Crear un controlador.

> Se definen las rutas api en el controlador, se crea la clase request en donde se podran añadir las reglas de validacion de las peticiones realizadas y se asocia el modelo al controlador

```bash
php artisan make:controller --api --requests --model=ModelName
```

## Migrations

Ejecutar migraciones

```sh
php artisan migrate
```

## Seeders

Ejecutar un Seeder especifico

```sh
php artisan db:seed --class=SeederName
```

## Resources

Los recursos son una capa entre el controlador y la respuesta actual que es retornada.

Crear un nuevo recurso (permite transformar un recurso en un arreglo)

```sh
php artisan make:resource ResourceName
```
