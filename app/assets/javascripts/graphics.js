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
						tmp.pointName = data[i].name;
						tmp.x = i;
						tmp.y = data[i].price_sold-data[i].price_buy;
						lotsBenefits.push(tmp);
						nbSold += data[i].price_sold;
						nbBuy += data[i].price_buy;
				}
				/*
        else
          {
          tmp = {};
          tmp.pointName = data[i].name;
          tmp.x = i;
          tmp.y = 0;
          lotsBenefits.push(tmp);
          }*/

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
				text: "Benefits"
			},
			exportOptions: {
				image: false,
				print: false
			},
			axisX: {
				axisTickText: {
					format: "",
					step : 4
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
					collectionAlias: "Benefits per batch",
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