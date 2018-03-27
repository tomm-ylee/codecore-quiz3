Bid.destroy_all
Auction.destroy_all
User.destroy_all

PASSWORD = 'tester'
User.create(username: 'Admin', email: 'admin@email.com', password: PASSWORD, admin: true)

12.times do
  name = Faker::Simpsons.character
  User.create(
    username: name,
    email: "#{name}-#{rand(1..99)}@email.com",
    password: PASSWORD
  )
end

35.times do
  a = Auction.create(
    title: Faker::Simpsons.location,
    details: Faker::Simpsons.quote,
    end_date: DateTime.new(2018, rand(4..12), rand(1..31)),
    reserve_price: rand(50..150),
    user: User.all.sample
  )
  if a.valid?
    4.times do
      Bid.create(
        bid_price: rand(50..150),
        auction: a,
        user: User.all.sample
      )
    end
  end
end

puts "Seeded #{User.all.count} users."
puts "Seeded #{Auction.all.count} auctions."
puts "Seeded #{Bid.all.count} bids."
