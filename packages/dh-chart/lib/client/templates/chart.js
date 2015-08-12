var Colourpalette = ['#A31A7E', '#B19B00', '#009B74', '#E17000', '#fec575', '#d1e391', '#bbb8dc', '#a3dad9'];

Template.singlePostChart.rendered = function() {
        
    var chartValues = this.data;
    var chartRotated = (chartValues.chartType == 'Bar') ? true : false ;
    var chartTypeVal = (chartValues.chartType == 'Column') ? 'bar' : chartValues.chartType.toLowerCase() ;
    var xAxisType = chartValues.chartXaxisType;
    var xAxisCats = (xAxisType == 'category') ? Papa.parse(chartValues.chartXaxisCategories).data : "";
    var chData = Papa.parse(chartValues.chartData).data;
    var yAxisFormat = (chartValues.chartYaxisFormat === undefined) ? "" : chartValues.chartYaxisFormat;
    var showSubChart = chartValues.ShowSubChart;


    var chart = c3.generate({
        bindto: this.find('.chart'),
        data: {
            rows: chData,
            type: chartTypeVal
        },
        color: {
            pattern: Colourpalette
        },
        subchart: {
            show: showSubChart
        },
        axis: {
            rotated: chartRotated,
            x: {
                type: xAxisType,
                categories: xAxisCats
            },
            y: {
                format: function (d) { return "" & yAxisFormat & " " & "" + d; }
            }
        }
    });
    
};