$(document).ready(function() {

	// get IP from provider
	var ipurl = "https://freegeoip.net/json/";
	$.getJSON(ipurl, function(locate) {
		document.getElementById("demo").innerHTML = locate.city;
		// get lat/long from ip location array
		var url = 'https://api.apixu.com/v1/current.json?key=053480a560f4447daae235921171803&q=' + locate.latitude + ',' + locate.longitude;

		$.getJSON(url, function(data) {
			// get required data from APIUX.com's location array for further manipulation
			var code = data.current.is_day;

			console.log(data);
			console.log(code);
			// use 'data.current.is_day' to determine day/night
			var darkOutside = function nightOrDay(condition) {
				if (data.current.is_day === 0) {
					// convey 'night'
					day_part = "night"
						// add '-n' to the end of the weather icon code data
					return data.current.condition.code + "-n"
				} else {
					day_part = "day"
					return data.current.condition.code + "-d"
				}

			};
			// output required data to html page
			document.getElementById("weathericon").className = "owf owf-3x owf-" + darkOutside(code);
			document.getElementById("weather").innerHTML = data.current.condition.text;
			document.getElementById("temp").innerHTML = data.current.temp_c + "&#176;C";
			document.getElementById("feels").innerHTML = data.current.feelslike_c + "&#176;C";
			document.getElementById("day_part").innerHTML = day_part;
			// OPTIONAL use of inbuilt icons from APIUX.com
			document.getElementById("icon").innerHTML = "<img src='https://" + data.current.condition.icon + "'/>";


		});
	});
 });
