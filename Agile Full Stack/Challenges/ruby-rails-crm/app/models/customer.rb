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
