
$(function() 
  {
  $.ajax({
    url : "graphics/values",
    success: function(data) {
      var lotsBuy = [];
      var lotsSold = [];
      var dico = new Array();
      
      for (var i = 0; i < data.length; i++) { 
        if(data[i].parent_id !== null)
        {
          for(var j=0; j < data.length; j++)
          {
            if(data[j].id == data[i].parent_id)
            {
              dico[data[j].id] = 0;
            }
          }
          for(j=0; j < data.length; j++)
          {
            if(data[j].id == data[i].parent_id)
            {
                dico[data[j].id] += data[i].price_sold;
            } 
          }
        }
      }

      for (i = 0; i < data.length; i++) { 
        if(data[i].parent_id === null)
        {  
          var tmp = {};
          tmp.pointName=data[i].name;
          tmp.x = i;
          tmp.y = data[i].price_buy;
          lotsBuy.push(tmp);
          tmp = {};
          tmp.pointName=data[i].name;
          tmp.x = i;
          tmp.y = data[i].price_sold;
          if(dico[data[i].id])
            tmp.y += dico[data[i].id];
          lotsSold.push(tmp);
        }
      }
      
      fillHistoryChart(lotsBuy,lotsSold);
    },
    type: "GET"
  });

  function fillHistoryChart(lotsBought,lotsSold)
  {
    $("#shieldui-chart-profits").shieldChart({
      theme: "dark",

      primaryHeader: {
        text: "Profits"
      },
      exportOptions: {
        image: false,
        print: false
      },
      axisX: {
        axisTickText: {
          enabled:false
        },
      },
      axisY: {
        title: {
          text: "Price ($)",
          style: {
            color: "#FFFFFF"
          }
        },
        axisTickText: {
          // format the text as a currency
          format: "{text:c}"
        }
      },
      seriesSettings: {
        bar: {
          dataPointText: {
            enabled: true,
            format: "{point.y:n2}"
          }
        }
      },
      dataSeries: [
        {
          collectionAlias: "Bought",
          seriesType: "bar",
          data: lotsBought
        },
        {
          collectionAlias: "Sold",
          seriesType: "bar",
          data: lotsSold
        }

      ]
    });
  }
});