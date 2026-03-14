class Task
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :description, type: String
  field :status, type: String, default: "pending"

  validates :title, presence: true, uniqueness: true
  validates :status, inclusion: { in: %w[pending completed] }
end