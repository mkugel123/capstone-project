Rails.application.routes.draw do

  resources :reviews
  resources :categories, only: [:index, :create]
  resources :listings


  get "/less_than/:price", to: "listings#less_than_price"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end


# Create a custom route that takes a parameter of a number. Then take that number in a new action and find all the listings that have a price less than that number. Finish by rendering the json of the users who have made those listings. If no items are found under that price render json that says so.