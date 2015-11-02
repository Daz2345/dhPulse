var colourPalette = ['#A31A7E', '#B19B00', '#009B74', '#E17000', '#fec575', '#d1e391', '#bbb8dc', '#a3dad9'];

Template.chart.rendered = function() {

    var chartValues = this.data,
        grouped = (chartValues.chartType.indexOf("Stacked ") > -1) ? true : false,
        chartTypeBase = chartValues.chartType.replace("Stacked ", ""),
        chartTypeVal = (chartTypeBase === 'Column') ? 'bar' : chartTypeBase.toLowerCase(),
        chartRotated = chartTypeBase === 'bar',
        xAxisType = chartValues.chartXaxisType,
        xAxisCats = (xAxisType === 'category') ? Papa.parse(chartValues.chartXaxisCategories).data : "",
        chData = Papa.parse(chartValues.chartData).data,
        chartColours = (chartValues.chartColours === undefined) ? colourPalette : Papa.parse(chartValues.chartColours.split(",").join("\n")).data,
        yAxisFormat = (chartValues.chartYaxisFormat === undefined) ? "" : chartValues.chartYaxisFormat,
        showSubChart = chartValues.ShowSubChart,
        groupData = (grouped) ? chData[0] : [];

    console.log(chartColours)

    var chart = c3.generate({
        bindto: this.find('.chart'),
        data: {
            rows: chData,
            type: chartTypeVal,
            groups: [
                groupData
                ]
        },
        color: {
            pattern: chartColours
        },
        subchart: {
            show: showSubChart
        },
        axis: {
            rotated: chartRotated,
            x: {
                type: xAxisType,
                categories: xAxisCats,
                padding: {
                    top: 0,
                    bottom: 0
                }
            },
            y: {
                tick: {
                    format: d3.format(yAxisFormat)
                },
                padding: {
                    top: 0,
                    bottom: 0
                }
            }
        },
        transition: {
            duration: 2500
        }
    });

};