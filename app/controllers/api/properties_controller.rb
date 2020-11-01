module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def create 
      @property = Property.new(property_params)
    end

    def update 

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
      params.require(:property).permit(:property)
    end
  end
end