module Api
  class PropertiesController < ApplicationController
    # https://api.rubyonrails.org/classes/ActiveStorage/Attached/One.html
    skip_before_action :verify_authenticity_token
    
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def create 
      user = User.find_by(id: params[:user][:user_id])
      return render json: { error: 'cannot find user' }, status: :not_found if !user

      @property = user.properties.create(property_params)
  
      if @property.save!
        render 'api/properties/create', status: :created
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def update 
      @property = Property.find_by(id: params[:id])

      @last_property = Property.order(id: :desc).first
      return render json: { error: 'not_found' }, status: :not_found if !@last_property

      render 'api/properties/update', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property
      render 'api/properties/show', status: :ok
      
    end

    private

    def set_property 
      @property = Property.find(params[:id])
    end

    def property_params 
      params.require(:property).permit(:id, :title, :description,
      :property_type, :price_per_night, :max_guests, :bedrooms, :city, :country, :beds, :baths, :user, images: [])
    end
  end
end
