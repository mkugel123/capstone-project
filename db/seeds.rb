# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Book Listings..."

5.times do

  Listing.create(
    title: Faker::Book.title,
    image: Faker::Placeholdit.image,
    content: Faker::Lorem.paragraph,
    price: rand(5..60), # random number between 0 and 60
    user_id: rand(1..2),
    category_id: 2
  )
end

puts "Finished Seeding Book Listings"

puts "Seeding Camera Listings..."

5.times do

  Listing.create(
    title: Faker::Camera.brand_with_model,
    image: Faker::Placeholdit.image,
    content: Faker::Lorem.paragraph,
    price: rand(5..60), # random number between 0 and 60
    user_id: rand(1..2),
    category_id: 1
  )
end

puts "Finished Seeding Camera Listings"

puts "Seeding Car Listings..."

5.times do

  Listing.create(
    title: Faker::Vehicle.make_and_model,
    image: Faker::Placeholdit.image,
    content: Faker::Lorem.paragraph,
    price: rand(5..60), # random number between 0 and 60
    user_id: rand(1..2),
    category_id: 4
  )
end

puts "Finished Seeding Car Listings"


