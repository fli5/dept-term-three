# Getting Started to Create a Web Application With Rails

---
1. #### Use the command to create a new Rails Application ####
    ```bash
    rails new store
    ```
2. #### Directory Structure of the Rails Application ####
   The Rails application includes the following important directories and files:
   * `app/` – Contains models, views, controllers, helpers, mailers, jobs, and assets.
   * `bin/` – Contains scripts to start, set up, update and deploy the application.
   * `config/` – Contains configuration files such as routes and database settings.
   * `db/` – Contains database-related files, including migrations.
   * `Gemfile` – Defines the Ruby gems required by the application.
3. #### Model-View-Controller (MVC) ####
   * `Model` - Manages the data in your application. Typically, your database tables.
   * `View` - Handles rendering responses in different formats like HTML, JSON, XML, etc.
   * `Controller` - Handles user interactions and the logic for each request.
----
1. **Use the command to run Rails server**
    ```bash
    bin/rails server
    ```
2. #### Listening on http://localhost:3000 ####
3. #### Autoloading and Reloading ####
    * Use naming conventions to require files automatically
    * New files or changes to existing files are detected and automatically loaded or reloaded as necessary, once you start the Rails server.

---
1. #### Map a database table to a Rails Model
    ```bash
    bin/rails generate model Product name:string
    ```
   * `Product` - A model name
   * `name:string` - A column name with type of string 
   
   This command will create some files:
   * The migration (_a set of changes we want to make to our database_)  file in the `db/migrate` folder: `<timestamp>_create_products.rb`
   * The `product.rb` file in the `app/models` folder
   * The `product_test.rb` file in the `test/models` folder
2. #### Use the command to run the migration
    ```bash
   bin/rails db:migrate
   ```
   This command applies migrations to the database

---
1. #### Enter the interactive Console ####
    ```bash
   bin/rails console
   ```
   We can test our code in the Rails application using console
---
1. #### Use Active Record to create records ####
    ```ruby
    product = Product.new(name: "T-Shirt")
    product.save
   ```
   or
   ```ruby
    Product.create(name: "Pants")
    ```
2. #### Use Active Record to query records ####
    ```ruby
    Product.all
   ```
3. #### Use Active Record to filter and order records ####
    ```ruby
    Product.where(name:"Pants")
    ```
   ```ruby
    Product.order(name: :asc)
    ```
4. #### Use Active Record to find records ####
   ```ruby
    Product.find(1)
    ```
5. #### Use Active Record to update records ####
   ```ruby
    product=Product.find(1)
    product.update(name: "Shoes")
    ```
6. #### Use Active Record to delete records ####
    ```ruby
    product=Product.find(1)
    product.destroy
    ```
7. #### Validate column by applying validations ####
    ```ruby
    class Product < ApplicationRecord
      validates :name, presence: true
    end
    ```
---
