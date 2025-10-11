# Rails 8.x (Sprocket) + Active Admin + Bulma 
## Create a Rails Application
```bash
  rails new ruby-rails-crm
```
## Generate a Customer Model
```bash
  rails generate model Customer full_name:string phone_number:string email:string notes:text
  rails db:migate 
```

## Set up Active Admin
### 1. Since the Active Admin doesn't support the Propshaft, Replace it with the Sprocket
```bash
gem "sprockets", "~> 4.2"
gem "sprockets-rails", "~> 3.5"
# gem "propshaft"
```
### 2. Create /app/assets/config/manifest.js
```javascript
//= link_tree ../images
//= link_directory ../javascripts .js
//= link_directory ../stylesheets .css
//= link application.js
//= link application.css
```
### 3. Import Bulma and adjust the way that assets load
```erb
# views/layout/application.html.erb
    <%# Includes all stylesheet files in app/assets/stylesheets %>
    <%#= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <!-- Using Sprockets to manage assets instead of Propshaft -->
    <%#= javascript_importmap_tags %>
    <%= stylesheet_link_tag "application", media: "all", "data-turbo-track": "reload" %>
    <%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>
    
    <!-- Load Bulma CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
```
### 4. Add the Active Admin to the app
```ruby
# Gemfile
gem "devise"
gem "activeadmin", "~> 3.0"
```
```bash
  rails generate devise:install                
  rails generate active_admin:install
  rails db:migrate
  rails db:seed 
```
### 5. Set up dashboard
```ruby
# /app/admin/admin_users.rb
ActiveAdmin.register AdminUser do
  permit_params :email, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end

```
## Enable image feature for the app
```bash
gem "sassc-rails"
gem "image_processing"
```
```bash
  rails active_storage:install   
  rails db:migrate
```
### Set up Active Storage
```ruby
# /config/initializers/ransack_active_storage.rb
Rails.application.config.to_prepare do
  # Allow Ransack to safely query ActiveStorage attachments
  ActiveStorage::Attachment.class_eval do
    def self.ransackable_attributes(auth_object = nil)
      %w[id name record_type record_id blob_id created_at]
    end

    def self.ransackable_associations(auth_object = nil)
      %w[blob record]
    end
  end

  # Allow Ransack to safely query ActiveStorage blobs
  ActiveStorage::Blob.class_eval do
    def self.ransackable_attributes(auth_object = nil)
      %w[id key filename content_type metadata service_name byte_size checksum created_at]
    end

    def self.ransackable_associations(auth_object = nil)
      %w[attachments]
    end
  end
end
```
## Add Customer Model to the Active Admin
```bash
  rails generate active_admin:resource Customer
```
### 1. Set up the Customer Model to allow to be managed on the Active Admin
```ruby
# /app/models/customer.rb
class Customer < ApplicationRecord
  has_one_attached :avatar
  validates :full_name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
  def self.ransackable_associations(auth_object = nil)
    [ "avatar_attachment", "avatar_blob" ]
  end

  def self.ransackable_attributes(auth_object = nil)
    [ "created_at", "email", "full_name", "id", "notes", "phone_number", "updated_at" ]
  end
end
```
