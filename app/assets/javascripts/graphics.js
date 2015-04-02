$(document).ready(function() {
  $.ajax({
    url : "graphics/values",
    success: function(data) {
      var lotsBenefits = [];
      var tmp = {};
      var nbBuy = 0;
      var nbSold = 0;
      for (var i = 0; i < data.length; i++) { 
        if(data[i].price_sold != 0){
          tmp = {};
          //lotsBenefits.push(data[i].price_buy-data[i].price_sold);
          tmp.pointName = data[i].name;
          tmp.x = i;
          tmp.y = data[i].price_sold-data[i].price_buy;
          lotsBenefits.push(tmp);
          nbSold += 1;
        }
        nbBuy += 1;
      }
      var total = nbBuy+nbSold;

      fillBenefits(lotsBenefits);
      fillPercentage((nbBuy/total)*100,(nbSold/total)*100);
    },
    type: "GET"
  });

  function fillBenefits(lotsBenefits){
    $("#shieldui-chart-benefits").shieldChart({
      theme: "dark",

      primaryHeader: {
        text: "Benefits"
      },
      exportOptions: {
        image: false,
        print: false
      },
      axisX: {
        axisTickText: {
          format: "",
          step: 10
        }
      },
      axisY: {
        axisTickText: {
          // format the text as a currency
          format: "{text:c}"
        }
      },
      seriesSettings: {
        bar: {
          dataPointText: {
            enabled: true,
          }
        }
      },
      dataSeries: [
        {
          collectionAlias: "Benefits",
          seriesType: "bar",
          data: lotsBenefits
        }
      ]
    });
  }

  function fillPercentage(valueBuy,valueSold)
  {
    $("#shieldui-chart-bought-sold").shieldChart({
      theme: "dark",

      primaryHeader: {
        text: "Bought'n'Sold"
      },
      exportOptions: {
        image: false,
        print: false
      },
      dataSeries: [
        {
          collectionAlias: "buy : blue | sold : orange",
          seriesType: "pie",
          data: [valueBuy,valueSold]
        }]
    });
  }
});