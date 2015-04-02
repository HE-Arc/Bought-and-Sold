class PagesController < ApplicationController
  
  def home 
    @lots = Lot.where(user_id: current_user.id)
  end
  
  def graphics
    @lots = Lot.where(user_id: current_user.id)
  end
  
  def about
  end

end
