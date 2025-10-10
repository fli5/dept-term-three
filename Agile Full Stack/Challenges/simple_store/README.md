## Create a new Rails project

```bash
  rails new store
```

## Start the Rails development server

```bash
  bin/rails server
```

## Generate the Product model

```bash
  bin/rails generate model Product title:string description:text price:decimal stock_quantity:integer
```

## Generate the Category model

```bash
  bin/rails generate model Category name:string
```

## Generate the Products controller

```bash
  bin/rails generate controller Products index --skip-routes
```

## Add a category reference to products

```bash
  rails g migration add_category_to_products category:references
```

## Run all database migrations

```bash
  bin/rails db:migrate
```

## Seed the database with data

```bash
  rails db:seed
```
