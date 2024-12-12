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

Crear un nuevo recurso

```sh
php artisan make:resource ResourceName
```

Los recursos permiten obtener valores especificos al realizar una consulta.
