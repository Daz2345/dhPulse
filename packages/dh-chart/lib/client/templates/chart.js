var colourPalette = ['#A31A7E', '#B19B00', '#009B74', '#E17000', '#fec575', '#d1e391', '#bbb8dc', '#a3dad9'];

Template.chart.rendered = function() {
        
    var chartValues = this.data,
        chartTypeVal = (chartValues.chartType === 'Column') ? 'bar' : chartValues.chartType.toLowerCase(),
        chartRotated = chartTypeVal === 'bar',
        xAxisType = chartValues.chartXaxisType,
        xAxisCats = (xAxisType === 'category') ? Papa.parse(chartValues.chartXaxisCategories).data : "",
        chData = Papa.parse(chartValues.chartData).data,
        yAxisFormat = (chartValues.chartYaxisFormat === undefined) ? "" : chartValues.chartYaxisFormat,
        showSubChart = chartValues.ShowSubChart;

    console.log(yAxisFormat)

    var chart = c3.generate({
        bindto: this.find('.chart'),
        data: {
            rows: chData,
            type: chartTypeVal
        },
        color: {
            pattern: colourPalette
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
                tick: {
                format: d3.format(yAxisFormat)
                },
                min: 0
            }
        },
        transition: {
            duration: 2500
        }
    });
};