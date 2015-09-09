Template.d3Viz.helpers({
    myTemplate: function() {
        return this.d3Type.toLowerCase();
    }
});

Template.chord.rendered = function() {

    var matrix = Papa.parse(this.data.d3Data).data

    ArrayStringToNumber(matrix);

    var chord = d3.layout.chord()
        .padding(.05)
        .sortSubgroups(d3.descending)
        .matrix(matrix);

    var width = $(".chordViz").parent().width(), //Math.min(window.outerWidth, 960),
        height = width * 0.6,
        innerRadius = Math.min(width, height) * .41,
        outerRadius = innerRadius * 1.1;

    var fill = d3.scale.ordinal()
        .domain(d3.range(4))
        .range(["#353433", "#e17000", "#009B74", "#A31A7E"]);

    var svg = d3.select(".chordViz").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("g").selectAll("path")
        .data(chord.groups)
        .enter().append("path")
        .style("fill", function(d) {
            return fill(d.index);
        })
        .style("stroke", function(d) {
            return fill(d.index);
        })
        .style("fill-opacity", .67)
        .style("stroke", "#000")
        .style("stroke-width", ".5px")
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .on("mouseover", fade(.1))
        .on("mouseout", fade(1));

    var ticks = svg.append("g").selectAll("g")
        .data(chord.groups)
        .enter().append("g").selectAll("g")
        .data(groupTicks)
        .enter().append("g")
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + outerRadius + ",0)";
        });

    ticks.append("line")
        .attr("x1", 1)
        .attr("y1", 0)
        .attr("x2", 5)
        .attr("y2", 0)
        .style("stroke", "#000");

    ticks.append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function(d) {
            return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
        })
        .style("text-anchor", function(d) {
            return d.angle > Math.PI ? "end" : null;
        })
        .text(function(d) {
            return d.label;
        });

    svg.append("g")
        .attr("class", "chord")
        .selectAll("path")
        .data(chord.chords)
        .enter().append("path")
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("fill", function(d) {
            return fill(d.target.index);
        })
        .style("opacity", 1);

    // Returns an array of tick angles and labels, given a group.
    function groupTicks(d) {
        var k = (d.endAngle - d.startAngle) / d.value;
        return d3.range(0, d.value, 1000).map(function(v, i) {
            return {
                angle: v * k + d.startAngle,
                label: i % 5 ? null : v / 1000 + "k"
            };
        });
    }

    // Returns an event handler for fading a given chord group.
    function fade(opacity) {
        return function(g, i) {
            svg.selectAll(".chord path")
                .filter(function(d) {
                    return d.source.index != i && d.target.index != i;
                })
                .transition()
                .style("opacity", opacity);
        };
    }

};

Template.tree.rendered = function() {
    var width = $(".treeViz").parent().width(), //Math.min(window.outerWidth, 960),
        height = width * 0.6,
        diameter = Math.min(width, height) * .41,
        duration = 2000;

    d3.selectAll("input").on("change", change);

    function change() {
        if (this.value === "radialtree")
            transitionToRadialTree();
        else if (this.value === "radialcluster")
            transitionToRadialCluster();
        else if (this.value === "tree")
            transitionToTree();
        else
            transitionToCluster();
    };

    function transitionToRadialTree() {

        var nodes = radialTree.nodes(root), // recalculate layout
            links = radialTree.links(nodes);

        svg.transition().duration(duration)
            .attr("transform", "translate(" + (width / 2) + "," +
                (height / 2) + ")");
        // set appropriate translation (origin in middle of svg)

        link.data(links)
            .transition()
            .duration(duration)
            .style("stroke", "#fc8d62")
            .attr("d", radialDiagonal); //get the new radial path

        node.data(nodes)
            .transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            });

        node.select("circle")
            .transition()
            .duration(duration)
            .style("stroke", "#984ea3");

    };

    function transitionToRadialCluster() {

        var nodes = radialCluster.nodes(root), // recalculate layout
            links = radialCluster.links(nodes);

        svg.transition().duration(duration)
            .attr("transform", "translate(" + (width / 2) + "," +
                (height / 2) + ")");
        // set appropriate translation (origin in middle of svg)

        link.data(links)
            .transition()
            .duration(duration)
            .style("stroke", "#66c2a5")
            .attr("d", radialDiagonal); //get the new radial path

        node.data(nodes)
            .transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            });

        node.select("circle")
            .transition()
            .duration(duration)
            .style("stroke", "#4daf4a");

    };

    function transitionToTree() {

        var nodes = tree.nodes(root), //recalculate layout
            links = tree.links(nodes);

        svg.transition().duration(duration)
            .attr("transform", "translate(40,0)");

        link.data(links)
            .transition()
            .duration(duration)
            .style("stroke", "#e78ac3")
            .attr("d", diagonal); // get the new tree path

        node.data(nodes)
            .transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        node.select("circle")
            .transition()
            .duration(duration)
            .style("stroke", "#377eb8");

    };

    function transitionToCluster() {

        var nodes = cluster.nodes(root), //recalculate layout
            links = cluster.links(nodes);

        svg.transition().duration(duration)
            .attr("transform", "translate(40,0)");

        link.data(links)
            .transition()
            .duration(duration)
            .style("stroke", "#8da0cb")
            .attr("d", diagonal); //get the new cluster path

        node.data(nodes)
            .transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        node.select("circle")
            .transition()
            .duration(duration)
            .style("stroke", "#e41a1c");

    };

    var root; // store data in a variable accessible by all functions

    var tree = d3.layout.tree()
        .size([height, width - 160]);

    var cluster = d3.layout.cluster()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    var radialTree = d3.layout.tree()
        .size([360, diameter])
        .separation(function(a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

    var radialCluster = d3.layout.cluster()
        .size([360, diameter])
        .separation(function(a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

    var radialDiagonal = d3.svg.diagonal.radial()
        .projection(function(d) {
            return [d.y, d.x / 180 * Math.PI];
        });


    var svg = d3.select(".treeViz").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,0)");

    var root = getData(),
        nodes = cluster.nodes(root),
        links = cluster.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .style("stroke", "#8da0cb")
        .style("fill", "none")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .style("font", "10px sans-serif")
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    node.append("circle")
        .attr("r", 4.5)
        .style("stroke", "#e41a1c");
    /*
        node.append("text")
            .attr("dx", function (d) { return d.children ? -8 : 8; })
            .attr("dy", 3)
            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .text(function (d) { return d.name; });
    */

};

Template.circle.rendered = function() {
    
    var width = $(".circleViz").parent().width(), 
        height = width * 0.6,    
        margin = 20,
        diameter = height;

    var color = d3.scale.linear()
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.layout.pack()
        .padding(2)
        .size([diameter - margin, diameter - margin])
        .value(function(d) {
            return d.size;
        })

    var svg = d3.select(".circleViz").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var root = JSON.parse(this.data.d3Data),
        focus = root,
        nodes = pack.nodes(root),
        view;

    console.log(root)

        var circle = svg.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function(d) {
                return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            })
            .style("fill", function(d) {
                return d.children ? color(d.depth) : null;
            })
            .on("click", function(d) {
                if (focus !== d) zoom(d), d3.event.stopPropagation();
            });

        var text = svg.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function(d) {
                return d.parent === root ? 1 : 0;
            })
            .style("display", function(d) {
                return d.parent === root ? null : "none";
            })
            .text(function(d) {
                return d.name;
            });

        var node = svg.selectAll("circle,text");

        d3.select("body")
            // .style("background", color(-1))
            .on("click", function() {
                zoom(root);
            });

        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            var focus0 = focus;
            focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                    var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                    return function(t) {
                        zoomTo(i(t));
                    };
                });

            transition.selectAll("text")
                .filter(function(d) {
                    return d.parent === focus || this.style.display === "inline";
                })
                .style("fill-opacity", function(d) {
                    return d.parent === focus ? 1 : 0;
                })
                .each("start", function(d) {
                    if (d.parent === focus) this.style.display = "inline";
                })
                .each("end", function(d) {
                    if (d.parent !== focus) this.style.display = "none";
                });
        }

        function zoomTo(v) {
            var k = diameter / v[2];
            view = v;
            node.attr("transform", function(d) {
                return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
            });
            circle.attr("r", function(d) {
                return d.r * k;
            });
        }

    d3.select(self.frameElement).style("height", diameter + "px");
};

////////////////////////////////////////////////////////////////////////

//Used to convert Array with string values into Array with Numbers

function ArrayStringToNumber(arrayVal) {
    for (var i = 0; i < arrayVal.length; i++) {
        for (var j = 0; j < arrayVal[i].length; j++) {
            arrayVal[i][j] = +arrayVal[i][j];
        }
    }
}

// funciton to create flare.json

    function getData() {
        return {
            "name": "flare",
            "children": [{
                "name": "analytics",
                "children": [{
                    "name": "cluster",
                    "children": []
                }, {
                    "name": "graph",
                    "children": [{
                        "name": "BetweennessCentrality",
                        "size": 3534
                    }, {
                        "name": "LinkDistance",
                        "size": 5731
                    }, {
                        "name": "MaxFlowMinCut",
                        "size": 7840
                    }, {
                        "name": "ShortestPaths",
                        "size": 5914
                    }, {
                        "name": "SpanningTree",
                        "size": 3416
                    }]
                }, {
                    "name": "optimization",
                    "children": [{
                        "name": "AspectRatioBanker",
                        "size": 7074
                    }]
                }]
            }, {
                "name": "animate",
                "children": [{
                    "name": "interpolate",
                    "children": [{
                        "name": "ArrayInterpolator",
                        "size": 1983
                    }, {
                        "name": "ColorInterpolator",
                        "size": 2047
                    }, {
                        "name": "DateInterpolator",
                        "size": 1375
                    }, {
                        "name": "Interpolator",
                        "size": 8746
                    }, {
                        "name": "MatrixInterpolator",
                        "size": 2202
                    }, {
                        "name": "NumberInterpolator",
                        "size": 1382
                    }, {
                        "name": "ObjectInterpolator",
                        "size": 1629
                    }, {
                        "name": "PointInterpolator",
                        "size": 1675
                    }, {
                        "name": "RectangleInterpolator",
                        "size": 2042
                    }]
                }, {
                    "name": "ISchedulable",
                    "size": 1041
                }, {
                    "name": "Parallel",
                    "size": 5176
                }, {
                    "name": "Pause",
                    "size": 449
                }, {
                    "name": "Scheduler",
                    "size": 5593
                }, {
                    "name": "Sequence",
                    "size": 5534
                }, {
                    "name": "Transition",
                    "size": 9201
                }, {
                    "name": "Transitioner",
                    "size": 19975
                }, {
                    "name": "TransitionEvent",
                    "size": 1116
                }, {
                    "name": "Tween",
                    "size": 6006
                }]
            }, {
                "name": "data",
                "children": [{
                    "name": "converters",
                    "children": [{
                        "name": "Converters",
                        "size": 721
                    }, {
                        "name": "DelimitedTextConverter",
                        "size": 4294
                    }, {
                        "name": "GraphMLConverter",
                        "size": 9800
                    }, {
                        "name": "IDataConverter",
                        "size": 1314
                    }, {
                        "name": "JSONConverter",
                        "size": 2220
                    }]
                }, {
                    "name": "DataField",
                    "size": 1759
                }, {
                    "name": "DataSchema",
                    "size": 2165
                }, {
                    "name": "DataSet",
                    "size": 586
                }, {
                    "name": "DataSource",
                    "size": 3331
                }, {
                    "name": "DataTable",
                    "size": 772
                }, {
                    "name": "DataUtil",
                    "size": 3322
                }]
            }]
        };
    }