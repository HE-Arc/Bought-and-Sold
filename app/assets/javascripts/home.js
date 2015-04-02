
$(function() 
                  {
  $.ajax({
    url : "graphics/values",
    success: function(data) {
      var lotsBuy = [];
      var lotsSold = [];
      for (var i = 0; i < data.length; i++) { 
        var tmp = {};
					tmp.pointName=data[i].name;
					tmp.x = i;
					tmp.y = data[i].price_buy;
					lotsBuy.push(tmp);
					tmp = {};
					tmp.pointName=data[i].name;
					tmp.x = i;
					tmp.y = data[i].price_sold;
					lotsSold.push(tmp);
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
        title: {
                text: "Creation of batches",
                style: {
                    color: "#FFFFFF"
                }
            },
        axisTickText: {
          format: "",
          step: 4
        }
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