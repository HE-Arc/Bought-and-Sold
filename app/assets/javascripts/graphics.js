$(document).ready(function() {
	$.ajax({
		url : "graphics/values",
		success: function(data) {
			var lotsBenefits = [];
			var tmp = {};
			var nbBuy = 0;
			var nbSold = 0;
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
                    if(dico[data[j].id] !== 0){
                      dico[data[j].id] += data[i].price_sold;
                    }
                    else{
                      dico[data[j].id] = data[i].price_sold;
                    }
                  } 
               }
          }
      }
      
      for (i = 0; i < data.length; i++) { 
        if(data[i].parent_id === null)
          {
          if(data[i].price_sold !== 0){
            tmp = {};
            tmp.pointName = data[i].name;
            tmp.x = i;
            tmp.y = (data[i].price_sold+dico[data[i].id])-data[i].price_buy;
            lotsBenefits.push(tmp);
            }
          }
        nbSold += data[i].price_sold;
        nbBuy += data[i].price_buy;
			}

			fillBenefits(lotsBenefits);
			fillPercentage(nbBuy,nbSold);
		},
		type: "GET"
	});

	function fillBenefits(lotsBenefits){
		$("#shieldui-chart-benefits").shieldChart({
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
					collectionAlias: "Profit per batch",
					color: "#CCCCCC",
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
					collectionAlias: "Total",
					seriesType: "pie",
					data: [
						["Buy",valueBuy],
						 { collectionAlias: "Sold", y: valueSold, selected: true }
					]
				}]
		});
	}
});