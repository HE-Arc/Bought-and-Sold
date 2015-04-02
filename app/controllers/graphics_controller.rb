class GraphicsController < ApplicationController
  
  def index
  end
  
  def values
		@Lots = Lot.where(user_id: current_user.id).where(:parent_id => [nil])
    render json: @Lots
  end

end
