Template.poll.helpers({
    'hasVoted' : function() {
        var hasVotedValue = _.contains(this.poll.pollVoters, Meteor.user()._id);
        return hasVotedValue;
    },
    'awaitingVotes' : function() {
        return this.poll.pollVoters.length < 1;
    }
});


Template.poll.events({
    'submit form': function(){
        var post = this;        
        var user = Meteor.user();
        event.preventDefault();
        Meteor.call("pollVote", post._id, $("input[name='Options']:checked").val(), user);
    }
});

var colourPalette = ['#A31A7E', '#B19B00', '#009B74', '#E17000', '#fec575', '#d1e391', '#bbb8dc', '#a3dad9'];

// to be completed!!
// Template.chart.helpers({
//     colourPalette: function() {
//         return ['#A31A7E', '#B19B00', '#009B74', '#E17000', '#fec575', '#d1e391', '#bbb8dc', '#a3dad9'];
//     },
//     chartValues: function() {
//         return this.data
//     },
    
// })

Template.pollResult.rendered = function() {

    var chartData = Posts.findOne({'_id' : FlowRouter.getParam("_id")}).poll.pollOptions;
    var chartColours = colourPalette;
    var categoryTitles;

    for (var i = 0, len = chartData.length; i < len; i++) {
        if (chartData[i].Voters === undefined) {
            chartData[i].Count = 0;
        }
        if (chartData[i].Count === undefined) {
            chartData[i].Count = chartData[i].Voters.length;
        }
    }

    categoryTitles = _.pluck(chartData, 'Option');
    // chartData = _.pluck(chartData, 'Count');    
    
    var chart;
    
    chart = c3.generate({
        bindto: this.find('.chart'),
        data: {
            json: chartData,
            type: 'bar',
            keys: {
                value: ['Count']
            },
            names: {Count: "Votes"}
        },
        color: {
            pattern: chartColours
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                categories: categoryTitles,
                padding: {
                    top: 0,
                    bottom: 0
                }
            },
            y: {
                padding: {
                    top: 0,
                    bottom: 0
                }
            }
        },
        transition: {
            duration: 500
        }
    });
        
    // Tracker.autorun(function() {
        
    //     chart.unload({
    //         json: chartData
    //     });
        
    //     chartData = Posts.findOne({'_id' : FlowRouter.getParam("_id")}).poll.pollOptions;        

    //     chart.load({
    //         json: chartData
    //     });
    // });
        
};