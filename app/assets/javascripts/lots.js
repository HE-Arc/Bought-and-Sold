$(function() 
  {

  $.ajax({
    url : "lots/values",
    success: function(multipleData) {
      var data = multipleData[0];
      var categories = multipleData[1];

      var lots = [];
      for (var i = 0; i < data.length; i++) { 
        var tmp = {};
        tmp.name="<a href=lots/"+data[i].id+"> "+data[i].name+"</a>";
        tmp.description = data[i].description;
        if (data[i].categorie_id){
          for (var j = 0; j < categories.length; j++) { 
            if(data[i].categorie_id == categories[j].id)
            {
              tmp.categorie = "<a href=categories/"+data[i].categorie_id+"> "+categories[j].name+"</a>";
            }
          }
        }
        else
        {
          tmp.categorie = "-";
        }

        tmp.date_buy = data[i].date_buy.split(' ')[0];

        if(data[i].parent_id){
          tmp.price_buy = "0";
        }
        else
        {
          tmp.price_buy = data[i].price_buy;
        }
        tmp.date_sold = (data[i].date_sold+"").split(' ')[0];
        tmp.price_sold = data[i].price_sold;
        if(data[i].parent_id){
          for (var j = 0; j < data.length; j++) { 
            if(data[i].parent_id == data[j].id)
            {
              tmp.parent_name = "<a href=lots/"+data[j].id+"> "+data[j].name+"</a>";
            }
          }
        }
        else
        {
          tmp.parent_name = "-"
        }
        tmp.created_at =data[i].created_at.split(' ')[0];
        tmp.edit = "<a href=lots/"+data[i].id+"/edit>Edit "
        lots.push(tmp);
      }


      fillList(lots);

    },
    type: "GET"
  });

  function fillList(lots)
  {
    $("#shieldui-grid1").shieldGrid({
      dataSource: {
        data: lots
      },
      sorting: {
        multiple: true
      },
      rowHover: false,
      paging: {
        pageSize:15
      },
      columns: [
        { field: "name", title: "Name" },
        { field: "categorie", title: "Categorie" },                
        { field: "description", title: "Description" },
        { field: "date_buy", title: "Buy Date", format: "{0:MM/dd/yyyy}" },
        { field: "price_buy", title: "Buy Price",format: "{0} $" },
        { field: "date_sold", title: "Sold Date",format: "{0:MM/dd/yyyy}" },
        { field: "price_sold", title: "Sold Price",format: "{0} $" },
        { field: "parent_name", title: "Parent" },
        { field: "created_at", title: "Created at",format: "{0:dd/mm/yyyy}" },
        { field: "edit", width:"60px", title: "Edit" },
      ],

    });
  }               
});