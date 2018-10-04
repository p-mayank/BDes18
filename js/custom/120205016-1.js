var All = [0, 16376]
var Argentina = [0, 644]
var Austria = [645, 981]
var Belgium = [982, 1301]
var Brazil = [1302, 1813]
var Cameroon = [1814, 2010]
var Chile = [2011, 2338]
var Colombia = [2339, 2576]
var CostaRica = [2577, 2765]
var Croatia = [2766, 2987]
var CzechRepublic = [2988, 3181]
var Denmark = [3182, 3500]
var EastGermany = [3501, 3656]
var Ecuador = [3657, 3807]
var England = [3808, 4861]
var Estonia = [4862, 5003]
var France = [5004, 5540]
var Germany = [5541, 6150]
var Ghana = [6151, 6364]
var Greece = [6365, 6588]
var Honduras = [6589, 6813]
var Hungary = [6814, 7248]
var Iran = [7249, 7532]
var Israel = [7533, 7714]
var Italy = [7715, 8284]
var IvoryCoast = [8285, 8415]
var Japan = [8416, 8925]
var Luxembourg = [8926, 8991]
var Mexico = [8992, 9365]
var Netherlands = [9366, 9785]
var NewZealand = [9786, 10186]
var Nigeria = [10187, 10451]
var NorthernIreland = [10452, 10700]
var Paraguay = [10701, 11000]
var Poland = [11001, 11416]
var Portugal = [11417, 11961]
var Romania = [11962, 12379]
var Russia = [12380, 12591]
var Scotland = [12592, 13376]
var Serbia = [13377, 13490]
var Slovenia = [13491, 13624]
var SouthKorea = [13625, 13929]
var SovietUnion = [13930, 14302]
var Spain = [14303, 14819]
var Sweden = [14820, 15203]
var Switzerland = [15204, 15427]
var Turkey = [15428, 15706]
var Ukraine = [15707, 15904]
var Uruguay = [15905, 16265]
var India = [16266, 16376]
var UnitedStates = [16377, 16967]
var Canada = [163968, 17211]
var Australia = [17212, 17486]
var SouthAfrica = [17487, 17772]
var Czechoslovakia = [177773, 18024]
var Peru = [18025, 18285]
var Pakistan = [18400, 18473]
var Qatar = [18474, 18569]
var MonteNegro = [18569, 18636]
var Venezuela = [18637, 18754]
var Egypt = [18755, 18992]
var Algeria = [18993, 19263]
var SaudiArabia = [19649, 19767]
var China = [19768, 20016]
var Finland = [20017, 20215]
var Norway = [20215, 20506]


function loader(config) {
  return function() {
    var radius = Math.min(config.width, config.height) / 2;
    var tau = 2 * Math.PI;

    var arc = d3.svg.arc()
      .innerRadius(radius * 0.2)
      .outerRadius(radius * 0.4)
      .startAngle(0);

    var svg = d3.select(config.container).append("svg")
      .attr("id", config.id)
      .attr("width", config.width)
      .attr("height", config.height)
      .append("g")
      .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")")

    var background = svg.append("path")
      .datum({
        endAngle: 0.33 * tau
      })
      .style("fill", "#4D4D4D")
      .attr("d", arc)
      .call(spin, 1500)

    function spin(selection, duration) {
      selection.transition()
        .ease("linear")
        .duration(duration)
        .attrTween("transform", function() {
          return d3.interpolateString("rotate(0)", "rotate(360)");
        });

      setTimeout(function() {
        spin(selection, duration);
      }, duration);
    }

    function transitionFunction(path) {
      path.transition()
        .duration(7500)
        .attrTween("stroke-dasharray", tweenDash)
        .each("end", function() {
          d3.select(this).call(transition);
        });
    }

  };
}


var myLoader = loader({
  width: 960,
  height: 500,
  container: "#loader_container",
  id: "loader"
});
myLoader();

var myLoader = loader({
  width: 960,
  height: 500,
  container: ".loaderContainer1",
  id: "loader"
});
myLoader();



// load data
d3.csv("js/custom/viz/data.csv", function(error, data) {

  d3.select("body").select('#loader_container').remove();

  function scatterPlotter(idname) {

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 80
      },
      width = 720 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // setup x
    var xValue = function(d) {
      // if (d.Height != null ) {
        // if (d.MeanYear > 1930) {
          return d.MeanYear;
        // }
      // }
      }, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) {
        return xScale(xValue(d));
      }, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) {
      // if (d.Height != null) {
        return d.Height;
      // }
      }, // data -> value
      yScale = d3.scale.linear().range([height, 0]), // value -> display
      yMap = function(d) {
        return yScale(yValue(d));
      }, // data -> display
      yAxis = d3.svg.axis().scale(yScale).orient("left");

    // add the graph canvas to the body of the webpage
    var svg = d3.select("body").select(idname).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        // return "<span style='color:white'>" + d.PlayerName + " " + "<br/> Height: " + d.Height + "<br>MeanYear: " + d.MeanYear + "<br>Goals: " + d.Goals + "<br>Appearances: " + d.Appearances + "</span>";
        return "<span style='color:white'>" + d.PlayerName + " | " + "Goals: " + d.Goals  + "</span>";
      })

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").select(idname).append("div")
      .attr("class", "tooltip")

    function svgDotsRemove() {
      svg.selectAll(".dot").remove()
    }

    // don't want dots overlapping axis, so add in buffer to data domain
    // yScale.domain([1.62, 2.03]);
    // xScale.domain([1920, 2025]);

    var min = 1.99
    var max = 1.99

    data.forEach(function(d){
      if (d.Height < min && d.Height != "") {
        min = d.Height
      } else {}
      if (d.Height > max && d.Height != "") {
        max = d.Height
      }
    })

    var minYear = 1990

    data.forEach(function(d){
      // console.log(d.MeanYear)
      if (d.MeanYear < minYear && d.MeanYear > 1900  && d.MeanYear != null  && d.MeanYear != "" && d.MeanYear != NaN ) {
        minYear = d.MeanYear
      } else {}

    })


    // console.log(minYear+ "  "+ maxYear)

    yScale.domain([min, max]);
    xScale.domain([minYear, 2014]);

    // x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Mean Year");

    // y-axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("color", "#gg00aa")
      .text("Height (in meters)");

    var count = 0;

    // draw dots

    function scatterPlot(bubbleSize, bubbleCountry, bubbleForward, bubbleMidfielder, bubbleDefender, bubbleGoalkeeper) {

      svg.call(tip);

      svg.selectAll(".dot")
        .data(function() {
          return data.slice(bubbleCountry[0], bubbleCountry[1])
        })
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) {
          function what(d) {
            if (bubbleSize == "Appearances") {
              return Math.sqrt((d.Appearances) * 5.5)
            } else if (bubbleSize == "Combined" && d.Position == "Forward") {
              return (d.Goals) * 0.7
            } else if (bubbleSize == "Goals per match" && d.Appearances > 15) {
              return Math.sqrt((d.Goals / d.Appearances) * 800)
            } else if (bubbleSize == "None") {
              return 12
            } else if (bubbleSize == "Goals") {
              return Math.sqrt((d.Goals) * 10)
            } else {
              return (d.Appearances) * 0.25
            }
          }

          return what(d)*0.8

        })
        .attr("opacity", 0.675)
        .attr("cx", xMap)
        .style("fill", function(d) {
          bubbleCountry = String(bubbleCountry)
          if (d.Position == bubbleGoalkeeper) {
            return "#3498db"
          } else if (d.Position == bubbleForward) {
            return "#e74c3c"
          } else if (d.Position == bubbleMidfielder) {
            return "#2ecc71"
          } else {
            return "#f1c40f"
          }
        })
        .attr("cy", yMap)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);
    }



    scatterPlot("Appearances", Germany, "Forward", "Midfielder", "Defender", "Goalkeeper");

    // draw legend
    //var legend = svg.selectAll(".legend")
    //    .data(data)
    //  .enter().append("g")
    //    .attr("class", "legend")
    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    //legend.append("rect")
    //    .attr("x", width - 18)
    //    .attr("width", 18)
    //    .attr("height", 18)
    //   .style("fill", color);

    // draw legend text
    //legend.append("text")
    //    .attr("x", width - 24)
    //    .attr("y", 9)
    //    .attr("dy", ".35em")
    //    .style("text-anchor", "end")
    //    .text("Country")

    d3.select("#countrySelector").selectAll("input")
      .on("change", countryChange);

    d3.select("#sizeSelector").selectAll("input")
      .on("change", sizeChange);

    var valueCountry;
    var valueSize;

    function countryChange() {
      valueCountry = eval(this.value);

      var radios = document.getElementsByName('size');

      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          svgDotsRemove();
          scatterPlot(radios[i].value, valueCountry, "Forward", "Midfielder", "Defender", "Goalkeeper");

          // only one radio can be logically checked, don't check the rest
          break;
        }
      }

    }

    function sizeChange() {
      valueSize = this.value;

      var radios = document.getElementsByName('country');

      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

          svgDotsRemove();
          scatterPlot(valueSize, eval(radios[i].value), "Forward", "Midfielder", "Defender", "Goalkeeper");
          // only one radio can be logically checked, don't check the rest
          break;
        }
      }
    }
  }

  var scatterplotbighuge = "#scatterplotbighuge";
  scatterPlotter(scatterplotbighuge);

})

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white'>" + "PlayerName: " + d.PlayerName + "<br>BirthPlace: " + d.BirthPlace + "<br>Country: " + d.Country /*+ "<br>Goals: " + d.Goals + "<br>Appearances: " + d.Appearances +"</span>";*/
  })


d3.json("js/custom/viz/europe.json", function(error, map) {

  d3.select("body").select('.loaderContainer1').remove();

  var width = 720,
    height = 584;

  var projection = d3.geo.albers()
    .scale(900)
    .translate([width / 2, height / 2])
    .rotate([-17.0333, 0])
    .center([0, 51.1167])

  var svg = d3.select("body").select("#europefull").append("svg")
    .attr("width", width)
    .attr("height", height);

  var g = svg.append("g");

  g.append("path")
    .datum(topojson.feature(map, map.objects.layer1))
    .attr("d", d3.geo.path().projection(projection));

  svg.call(tip);

  // load and display the cities
  d3.csv("js/custom/viz/europe-data.csv", function(error, data) {

    function europe(bubbleSize, bubbleForward, bubbleMidfielder, bubbleDefender, bubbleGoalkeeper) {

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return projection([d.Longitude, d.Latitude])[0];
        })
        .attr("cy", function(d) {
          return projection([d.Longitude, d.Latitude])[1];
        })
        .attr("fill", function(d) {

          if (d.Position == bubbleForward) {
            return "#e74c3c"
          } else if (d.Position == bubbleMidfielder) {
            return "#2ecc71"
          } else if (d.Position == bubbleDefender) {
            return "#f1c40f"
          } else if (d.Position == bubbleGoalkeeper) {
            return "#3498db"
          }

        })
        .attr("visibility", function(d) {
          if (d.Position == bubbleForward) {
            return ""
          } else if (d.Position == bubbleMidfielder) {
            return ""
          } else if (d.Position == bubbleDefender) {
            return ""
          } else if (d.Position == bubbleGoalkeeper) {
            return ""
          } else {
            return "hidden"
          }
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .attr("opacity", 0.7)
        .attr("r", function(d) {
          if (bubbleSize == "Appearances") {
            return (d.Appearances * 0.071)
          } else if (bubbleSize == "Goals") {
            return (d.Goals * 0.3)
          }
        })
    }


    function svgDotsRemove() {
      svg.selectAll("circle").remove()
    }

    europe("Appearances", "Forward", "Midfielder", "Defender", "Goalkeeper");

    d3.select("#positionSelector").selectAll("input")
      .on("change", positionChange);


    function positionChange() {

      var radios = document.getElementsByName('position');

      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

          svgDotsRemove()

          if (radios[i].value == "Defender") {
            europe("Appearances", null, null, "Defender", null);
          } else if (radios[i].value == "Forward") {
            europe("Appearances", "Forward", null, null, null);
          } else if (radios[i].value == "All") {
            europe("Appearances", "Forward", "Midfielder", "Defender", "Goalkeeper");
          } else if (radios[i].value == "Midfielder") {
            europe("Appearances", null, "Midfielder", null, null);
          } else {
            europe("Appearances", null, null, null, "Goalkeeper");
          }

          break;
        }
      }
    }

  });


})



var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white'>" + "PlayerName:  " + d.PlayerName + "<br>Appearances:  " + d.Appearances + "<br>BirthPlace:  " + d.BirthPlace + "<br>Country:  " + d.Country /*+ "<br>Goals: " + d.Goals + "<br>Appearances: " + d.Appearances +"</span>";*/
  })

var europeCountries = [
  "Austria", "Belgium", "Croatia", "Czechoslovakia", "CzechRepublic", "Denmark", "EastGermany", "England", "Estonia", "France", "Germany", "Greece", "Hungary", "Italy", "Luxembourg", "Netherlands", "NorthernIreland", "Poland", "Portugal", "Romania", "Russia", "Scotland", "Serbia", "Slovenia", "SovietUnion", "Spain", "Sweden", "Switzerland", "Ukraine", "Czechoslovakia", "MonteNegro", "Finland", "Norway", "MonteNegro"
]

var europeColors = [
  "#F22613",
  "#96281B",
  "#9A12B3",
  "#DB0A5B",
  "#663399",
  "#9A12B3",
  "#674172",
  "#3498DB",
  "#8E44AD",
  "#9B59B6",
  "#C5EFF7",
  "#81CFE0", //
  "#5C97BF",
  "#87D37C",
  "#4ECDC4",
  "#26A65B",
  "#03C9A9",
  "#DCC6E0",
  "#2ECC71",
  "#F7CA18",
  "#E87E04",
  "#DCC6E0",
  "#F9690E",
  "#F22613",
  "#F22613",
  "#F22613",
  "#26A65B",
  "#F39C12",
  "#1BA39C",
  "#F89406",
  "#F39C12",
  "#F27935",
  "#ECF0F1",
  "#ECF0F1",
  "#26A65B"
]


d3.json("js/custom/viz/europe.json", function(error, map) {

  var width = 720;
  var height = 584;

  var projection = d3.geo.albers()
    .scale(900)
    .translate([width / 2, height / 2])
    .rotate([-17.0333, 0])
    .center([0, 51.1167])

  var svg = d3.select("body").select("#europemaptime").append("svg")
    .attr("width", width)
    .attr("height", height);

  var g = svg.append("g");

  g.append("path")
    .datum(topojson.feature(map, map.objects.layer1))
    .attr("d", d3.geo.path().projection(projection));

  var Counter = 1;

  // load and display the cities
  d3.csv("js/custom/viz/europe-data-year-sorted-min.csv", function(error, data) {


    // This is the way I used to code (a year back)
    // Cannot be more ashamed of myself
    var sliceCounter = [1871, 0, 1872, 3, 1872.5, 5, 1873, 8, 1874, 10, 1875, 13, 1875.5, 14, 1876, 15, 1876.5, 16, 1877, 19, 1877.5, 20, 1878, 21, 1878.5, 24, 1879, 32, 1879.5, 33, 1880, 37, 1880.5, 38, 1881, 42, 1881.5, 44, 1882, 51, 1882.5, 52, 1883, 60, 1883.5, 62, 1884, 69, 1885, 72, 1885.5, 75, 1886, 85, 1887, 90, 1887.5, 95, 1888, 104, 1888.5, 110, 1889, 124, 1889.5, 129, 1890, 138, 1890.5, 144, 1891, 154, 1891.5, 156, 1892, 167, 1892.5, 169, 1893, 177, 1893.5, 185, 1894, 195, 1894.5, 199, 1895, 208, 1895.5, 210, 1896, 217, 1896.5, 220, 1897, 229, 1897.5, 231, 1898, 245, 1898.5, 248, 1899, 253, 1899.5, 254, 1900, 261, 1900.5, 264, 1901, 273, 1901.5, 276, 1902, 289, 1902.5, 291, 1903, 300, 1903.5, 302, 1904, 314, 1904.5, 317, 1905, 327, 1905.5, 328, 1906, 343, 1906.5, 353, 1907, 362, 1907.5, 368, 1908, 382, 1908.5, 388, 1909, 399, 1909.5, 403, 1910, 424, 1910.5, 429, 1911, 436, 1911.5, 442, 1912, 464, 1912.5, 473, 1913, 489, 1913.5, 499, 1914, 511, 1914.5, 512, 1915, 516, 1915.5, 523, 1916, 526, 1916.5, 531, 1917, 538, 1917.5, 544, 1918, 546, 1918.5, 549, 1919, 556, 1919.5, 559, 1920, 574, 1920.5, 583, 1921, 608, 1921.5, 619, 1922, 641, 1922.5, 666, 1923, 693, 1923.5, 705, 1924, 742, 1924.5, 762, 1925, 791, 1925.5, 808, 1926, 843, 1926.5, 855, 1927, 885, 1927.5, 903, 1928, 928, 1928.5, 949, 1929, 980, 1929.5, 998, 1930, 1029, 1930.5, 1056, 1931, 1088, 1931.5, 1115, 1932, 1152, 1932.5, 1176, 1933, 1220, 1933.5, 1244, 1934, 1280, 1934.5, 1308, 1935, 1345, 1935.5, 1377, 1936, 1419, 1936.5, 1443, 1937, 1475, 1937.5, 1498, 1938, 1532, 1938.5, 1547, 1939, 1579, 1939.5, 1587, 1940, 1616, 1940.5, 1627, 1941, 1650, 1941.5, 1665, 1942, 1687, 1942.5, 1699, 1943, 1705, 1943.5, 1715, 1944, 1722, 1944.5, 1729, 1945, 1744, 1945.5, 1752, 1946, 1770, 1946.5, 1781, 1947, 1803, 1947.5, 1825, 1948, 1856, 1948.5, 1877, 1949, 1915, 1949.5, 1938, 1950, 1978, 1950.5, 1999, 1951, 2031, 1951.5, 2058, 1952, 2110, 1952.5, 2147, 1953, 2182, 1953.5, 2201, 1954, 2247, 1954.5, 2280, 1955, 2331, 1955.5, 2365, 1956, 2423, 1956.5, 2449, 1957, 2496, 1957.5, 2526, 1958, 2575, 1958.5, 2601, 1959, 2645, 1959.5, 2669, 1960, 2718, 1960.5, 2754, 1961, 2808, 1961.5, 2838, 1962, 2883, 1962.5, 2912, 1963, 2951, 1963.5, 2981, 1964, 3026, 1964.5, 3054, 1965, 3101, 1965.5, 3133, 1966, 3180, 1966.5, 3209, 1967, 3259, 1967.5, 3291, 1968, 3339, 1968.5, 3370, 1969, 3413, 1969.5, 3440, 1970, 3481, 1970.5, 3507, 1971, 3574, 1971.5, 3607, 1972, 3658, 1972.5, 3691, 1973, 3733, 1973.5, 3770, 1974, 3823, 1974.5, 3863, 1975, 3916, 1975.5, 3950, 1976, 4016, 1976.5, 4054, 1977, 4109, 1977.5, 4162, 1978, 4214, 1978.5, 4254, 1979, 4294, 1979.5, 4339, 1980, 4400, 1980.5, 4439, 1981, 4499, 1981.5, 4542, 1982, 4584, 1982.5, 4625, 1983, 4679, 1983.5, 4727, 1984, 4792, 1984.5, 4828, 1985, 4882, 1985.5, 4917, 1986, 4973, 1986.5, 5017, 1987, 5075, 1987.5, 5122, 1988, 5197, 1988.5, 5237, 1989, 5302, 1989.5, 5343, 1990, 5412, 1990.5, 5463, 1991, 5546, 1991.5, 5599, 1992, 5696, 1992.5, 5752, 1993, 5852, 1993.5, 5920, 1994, 6031, 1994.5, 6102, 1995, 6218, 1995.5, 6290, 1996, 6383, 1996.5, 6456, 1997, 6553, 1997.5, 6615, 1998, 6717, 1998.5, 6784, 1999, 6903, 1999.5, 6976, 2000, 7067, 2000.5, 7131, 2001, 7223, 2001.5, 7290, 2002, 7421, 2002.5, 7481, 2003, 7600, 2003.5, 7691, 2004, 7797, 2004.5, 7880, 2005, 8006, 2005.5, 8083, 2006, 8193, 2006.5, 8270, 2007, 8370, 2007.5, 8441, 2008, 8559, 2008.5, 8633, 2009, 8766, 2009.5, 8867, 2010, 9005, 2010.5, 9138, 2011, 9297, 2011.5, 9436, 2012, 9631, 2012.5, 9762, 2013, 9948, 2013.5, 10099]


    var reset = "false"

    function europeTime(interval, k) {

      var svg = d3.select("body").select("#europemaptime").select("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg.append("g");

      var datanew = data.slice(sliceCounter[k], sliceCounter[k + 2])

      d3.select("body").select("#timer1")
        .data(datanew)
        .text(function(d) {
          var str = d.MeanYear;
          if (str.indexOf(".") > -1) {
            str = str.substring(0, str.length - 2);
          }
          return str
        })

      g.selectAll("circle")
        .data(datanew)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return projection([d.Longitude, d.Latitude])[0]
        })
        .attr("cy", function(d) {
          return projection([d.Longitude, d.Latitude])[1]
        })
        .attr("r", 2.5)
        .attr("fill", "#F7CA18")
        // .attr("fill", function(d) {
        //     if (d.Position == "Forward") {
        //         return "#e74c3c"
        //     } else if (d.Position == "Midfielder") {
        //         return "#2ecc71"
        //     } else if (d.Position == "Defender") {
        //         return "#f1c40f"
        //     } else if (d.Position == "Goalkeeper") {
        //         return "#3498db"
        //     } else {
        //         return "#e74c3c"
        //     }
        // })
        .attr("opacity", 0.7)
        .attr("visibility", function(d) {
          if (d.Country == "Turkey") {
            return "hidden"
          } else {
            return ""
          }
        })
        //.on("mouseover", tip.show)
        //.on("mouseout", tip.hide);

      // This is the way I used to code (a year back)
      // Cannot be more ashamed of myself
      if (sliceCounter[k] < 10098) {
        setTimeout(
          function() {
            if (reset == "false") {
              k = k + 2;
              //j = k+sliceCounter[k+1];
              console.log(k)
              europeTime(500, k
                  //k+20
                )
                //g.selectAll("circle").remove()
            } else {
              Counter = 0;
            }
          }, 50)

      }

    }


    d3.select('#europeMapRun').on('click', function() {
      reset = "false"
      Counter = 0;
      europeTime(500, 1)
    });

    d3.select('#europeMapReset').on('click', function() {
      reset = "true"
      Counter = 0;
      d3.select("body").select("#europemaptime").selectAll("circle").remove()
      d3.select("body").select("#timer1")
        .style('font-size', function(d) {
          return "90px"
        })
        .text("1871")
    });


  });


})




d3.json("js/custom/viz/world-110m2.json", function(error, map) {

    var width = 780,
      height = 432;

  var sliceCounter = [1871, 0, 1872, 3, 1872.5, 5, 1873, 8, 1874, 10, 1875, 13, 1875.5, 14, 1876, 15, 1876.5, 16, 1877, 19, 1877.5, 20, 1878, 21, 1878.5, 24, 1879, 32, 1879.5, 33, 1880, 37, 1880.5, 38, 1881, 42, 1881.5, 44, 1882, 51, 1882.5, 52, 1883, 60, 1883.5, 62, 1884, 69, 1885, 72, 1885.5, 75, 1886, 85, 1887, 90, 1887.5, 95, 1888, 104, 1888.5, 110, 1889, 124, 1889.5, 129, 1890, 138, 1890.5, 144, 1891, 154, 1891.5, 156, 1892, 167, 1892.5, 169, 1893, 177, 1893.5, 185, 1894, 195, 1894.5, 199, 1895, 208, 1895.5, 210, 1896, 217, 1896.5, 220, 1897, 229, 1897.5, 231, 1898, 245, 1898.5, 248, 1899, 253, 1899.5, 254, 1900, 261, 1900.5, 264, 1901, 273, 1901.5, 276, 1902, 289, 1902.5, 291, 1903, 300, 1903.5, 302, 1904, 315, 1904.5, 318, 1905, 328, 1905.5, 329, 1906, 344, 1906.5, 354, 1907, 364, 1907.5, 371, 1908, 385, 1908.5, 393, 1909, 404, 1909.5, 409, 1910, 431, 1910.5, 436, 1911, 445, 1911.5, 451, 1912, 474, 1912.5, 484, 1913, 500, 1913.5, 510, 1914, 522, 1914.5, 524, 1915, 529, 1915.5, 536, 1916, 541, 1916.5, 548, 1917, 556, 1917.5, 564, 1918, 566, 1918.5, 570, 1919, 579, 1919.5, 584, 1920, 601, 1920.5, 611, 1921, 638, 1921.5, 649, 1922, 674, 1922.5, 699, 1923, 737, 1923.5, 749, 1924, 791, 1924.5, 814, 1925, 862, 1925.5, 881, 1926, 918, 1926.5, 937, 1927, 978, 1927.5, 1004, 1928, 1038, 1928.5, 1064, 1929, 1103, 1929.5, 1124, 1930, 1195, 1930.5, 1225, 1931, 1261, 1931.5, 1293, 1932, 1336, 1932.5, 1363, 1933, 1412, 1933.5, 1439, 1934, 1493, 1934.5, 1523, 1935, 1569, 1935.5, 1602, 1936, 1653, 1936.5, 1680, 1937, 1718, 1937.5, 1743, 1938, 1783, 1938.5, 1803, 1939, 1841, 1939.5, 1849, 1940, 1887, 1940.5, 1899, 1941, 1924, 1941.5, 1942, 1942, 1968, 1942.5, 1982, 1943, 1991, 1943.5, 2001, 1944, 2011, 1944.5, 2019, 1945, 2039, 1945.5, 2050, 1946, 2073, 1946.5, 2091, 1947, 2117, 1947.5, 2145, 1948, 2181, 1948.5, 2204, 1949, 2249, 1949.5, 2279, 1950, 2328, 1950.5, 2356, 1951, 2397, 1951.5, 2427, 1952, 2481, 1952.5, 2529, 1953, 2569, 1953.5, 2595, 1954, 2652, 1954.5, 2691, 1955, 2762, 1955.5, 2806, 1956, 2880, 1956.5, 2916, 1957, 2971, 1957.5, 3011, 1958, 3074, 1958.5, 3108, 1959, 3166, 1959.5, 3201, 1960, 3264, 1960.5, 3306, 1961, 3371, 1961.5, 3419, 1962, 3471, 1962.5, 3514, 1963, 3562, 1963.5, 3603, 1964, 3661, 1964.5, 3695, 1965, 3758, 1965.5, 3798, 1966, 3865, 1966.5, 3904, 1967, 3967, 1967.5, 4012, 1968, 4083, 1968.5, 4129, 1969, 4195, 1969.5, 4243, 1970, 4311, 1970.5, 4355, 1971, 4437, 1971.5, 4485, 1972, 4549, 1972.5, 4598, 1973, 4675, 1973.5, 4726, 1974, 4804, 1974.5, 4861, 1975, 4938, 1975.5, 4991, 1976, 5068, 1976.5, 5122, 1977, 5202, 1977.5, 5276, 1978, 5358, 1978.5, 5422, 1979, 5492, 1979.5, 5559, 1980, 5660, 1980.5, 5718, 1981, 5811, 1981.5, 5879, 1982, 5945, 1982.5, 6008, 1983, 6092, 1983.5, 6159, 1984, 6263, 1984.5, 6331, 1985, 6421, 1985.5, 6484, 1986, 6582, 1986.5, 6654, 1987, 6750, 1987.5, 6832, 1988, 6969, 1988.5, 7047, 1989, 7160, 1989.5, 7231, 1990, 7351, 1990.5, 7433, 1991, 7571, 1991.5, 7661, 1992, 7816, 1992.5, 7920, 1993, 8082, 1993.5, 8190, 1994, 8358, 1994.5, 8467, 1995, 8659, 1995.5, 8796, 1996, 8971, 1996.5, 9116, 1997, 9295, 1997.5, 9406, 1998, 9593, 1998.5, 9715, 1999, 9940, 1999.5, 10101, 2000, 10290, 2000.5, 10421, 2001, 10633, 2001.5, 10779, 2002, 11004, 2002.5, 11136, 2003, 11382, 2003.5, 11548, 2004, 11763, 2004.5, 11912, 2005, 12163, 2005.5, 12312, 2006, 12534, 2006.5, 12685, 2007, 12910, 2007.5, 13066, 2008, 13307, 2008.5, 13478, 2009, 13727, 2009.5, 13927, 2010, 14195, 2010.5, 14492, 2011, 14862, 2011.5, 15162, 2012, 15558, 2012.5, 15912, 2013, 16288, 2013.5, 16556]


  var gCounter = 1871;
  var Counter = 1;



  // load and display the cities
  d3.csv("js/custom/viz/data-year-sorted-min.csv", function(error, data) {


        var projection = d3.geo.mercator()
          .scale(122)
          .translate([width / 2, height / 2])
          .rotate([0, 0])
          .center([10, 25])



    var svg = d3.select("body").select("#worldmaptime").append("svg")
      .attr("width", width)
      .attr("height", height);

    var g = svg.append("g");

    g.append("path")
      .datum(topojson.feature(map, map.objects.countries))
      .attr("d", d3.geo.path().projection(projection));

    var reset = "false"

    function europeTime(interval, k) {

      var svg = d3.select("body").select("#worldmaptime").select("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg.append("g");

      var datanew = data.slice(sliceCounter[k], sliceCounter[k + 2])

      d3.select("body").select("#timer")
        .data(datanew)
        .text(function(d) {
          var str = d.MeanYear;
          if (str.indexOf(".") > -1) {
            str = str.substring(0, str.length - 2);
          }
          return str
        })

      g.selectAll("circle")
        .data(datanew)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return projection([d.Longitude, d.Latitude])[0]
        })
        .attr("cy", function(d) {
          return projection([d.Longitude, d.Latitude])[1]
        })
        .attr("r", 3)
        /*
                  if (d.Appearances < 50 ) {
                    return (d.Appearances*0.13)
                  }
                  else if (d.Appearances > 50 && d.Appearances < 80) {
                    return d.Appearances*0.09
                  }
                  else {
                    return d.Appearances*0.07
                  }
                })*/
        .attr("fill", "#F7CA18")
        .attr("opacity", 0.7)


      //.on("mouseover", tip.show)
      //.on("mouseout", tip.hide);

      if (sliceCounter[k] < 16555) {
        //setInterval(svgDotsRemoveMap(), 5000);
        setTimeout(
          function() {
            if (reset == "false") {
              k = k + 2;
              europeTime(500, k)
            } else {
              Counter = 0;
            }
          }, 100)

      }

    }

    d3.select('#worldMapRun').on('click', function() {
      reset = "false"
      europeTime(500, 1)
    });

    d3.select('#worldMapReset').on('click', function() {
      reset = "true"
      d3.select("body").select("#worldmaptime").selectAll("circle").remove()
      Counter = 0;
      d3.select("body").select("#timer")
        .style('font-size', function(d) {
          return "90px"
        })
        .text("1871")
    });

  });

})


d3.json("js/custom/viz/world-110m2.json", function(error, map) {

  var width = 780,
    height = 432;

  var projection = d3.geo.mercator()
    .scale(122)
    .translate([width / 2, height / 2])
    .rotate([0, 0])
    .center([10, 25])

  var svg = d3.select("body").select("#worldmap").append("svg")
    .attr("width", width)
    .attr("height", height);


  var g = svg.append("g");


  g.append("path")
    .datum(topojson.feature(map, map.objects.countries))
    .attr("d", d3.geo.path().projection(projection));

  svg.call(tip);

  // load and display the cities
  d3.csv(
    //"js/custom/viz/latin-america-data.csv",
    "js/custom/viz/latin-america-data.csv",
    function(error, data) {
      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          //if (d.Longitude > -29.727282 || d.Longitude <  -101.094470) {
          //  if (d.Latitude > 22.134179 || d.Latitude < -58.339667)
          //console.log(d.PlayerName)
          //console.log(d.BirthPlace)
          //  console.log(d.Country)
          return projection([d.Longitude, d.Latitude])[0];
          //}
          //else {}

        })
        .attr("cy", function(d) {
          //if (d.Longitude > -29.727282 || d.Longitude <  -101.094470) {
          //  if (d.Latitude > 22.134179 || d.Latitude < -58.339667)
          //console.log(d.PlayerName)
          //console.log(d.BirthPlace)
          return projection([d.Longitude, d.Latitude])[1];
          //}
          //else {}
          //return projection([d.Longitude, d.Latitude])[1];
        })
        .attr("r", function(d) {
          //if (bubbleSize == "Appearances") {
          return (d.Appearances * 0.09)
            //}
            //else if (bubbleSize == "Goals") {
            //  return (d.Goals*0.3)
            //}
        })
        .attr("fill", function(d) {
          return "#36D7B7"
            /*if (d.Position == bubbleForward) { return "#e74c3c" }
            else if (d.Position == bubbleMidfielder) { return "#2ecc71" }
            else if (d.Position == bubbleDefender) { return "#f1c40f" }
            else if (d.Position == bubbleGoalkeeper) { return "#3498db" }*/
        })
        /*.attr("visibility", function(d) {
          if (d.Position == bubbleForward) {  return "" }
          else if (d.Position == bubbleMidfielder) {  return "" }
          else if (d.Position == bubbleDefender) {  return "" }
          else if (d.Position == bubbleGoalkeeper) {  return "" }
          else { return "hidden" }})*/
        .attr("opacity", 0.70)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);


      // zoom and pan
      var zoom = d3.behavior.zoom()
        .on("zoom", function() {
          g.attr("transform", "translate(" +
            d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
          g.selectAll("circle")
            .attr("d", path.projection(projection));
          g.selectAll("path")
            .attr("d", path.projection(projection));

        });

      //svg.call(zoom)

    });

})


d3.json("js/custom/viz/world-110m2.json", function(error, map) {

    var width = 780,
      height = 432;

      var projection = d3.geo.mercator()
        .scale(122)
        .translate([width / 2, height / 2])
        .rotate([0, 0])
        .center([10, 25])



  var svg = d3.select("body").select("#worldmap2").append("svg")
    .attr("width", width)
    .attr("height", height);


  var g = svg.append("g");


  g.append("path")
    .datum(topojson.feature(map, map.objects.countries))
    .attr("d", d3.geo.path().projection(projection));

  svg.call(tip);

  // load and display the cities
  d3.csv("js/custom/viz/europe-data.csv", function(error, data) {
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        //if (d.Longitude <  -14.590261) {
        //  if (d.Latitude > 22.134179 || d.Latitude < -58.339667)
        //console.log(d.PlayerName)
        //console.log(d.BirthPlace)
        //  console.log(d.Country)
        return projection([d.Longitude, d.Latitude])[0];
        //}
        //else {}

      })
      .attr("cy", function(d) {
        //if (d.Longitude <  -14.590261) {
        //  if (d.Latitude > 22.134179 || d.Latitude < -58.339667)
        //console.log(d.PlayerName)
        //console.log(d.BirthPlace)
        //  console.log(d.Country)
        return projection([d.Longitude, d.Latitude])[1];
        //}
        //else {}
        //return projection([d.Longitude, d.Latitude])[1];
      })
      .attr("r", function(d) {
        //if (bubbleSize == "Appearances") {
        return (d.Appearances * 0.085)
          //}
          //else if (bubbleSize == "Goals") {
          //  return (d.Goals*0.3)
          //}
      })
      .attr("fill", function(d) {
        return "#36D7B7"
          /*if (d.Position == bubbleForward) { return "#e74c3c" }
          else if (d.Position == bubbleMidfielder) { return "#2ecc71" }
          else if (d.Position == bubbleDefender) { return "#f1c40f" }
          else if (d.Position == bubbleGoalkeeper) { return "#3498db" }*/
      })
      /*.attr("visibility", function(d) {
        if (d.Position == bubbleForward) {  return "" }
        else if (d.Position == bubbleMidfielder) {  return "" }
        else if (d.Position == bubbleDefender) {  return "" }
        else if (d.Position == bubbleGoalkeeper) {  return "" }
        else { return "hidden" }})*/
      .attr("opacity", 0.70)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);


    // zoom and pan
    var zoom = d3.behavior.zoom()
      .on("zoom", function() {
        g.attr("transform", "translate(" +
          d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
        g.selectAll("circle")
          .attr("d", path.projection(projection));
        g.selectAll("path")
          .attr("d", path.projection(projection));

      });

    //svg.call(zoom)

  });

})
