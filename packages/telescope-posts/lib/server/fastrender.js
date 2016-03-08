var getDays = function (daysCount) {
  var daysArray = [];
  // var days = this.days;
  for (var i = 0; i < daysCount; i++) {
    daysArray.push({
      date: moment().subtract(i, 'days').startOf('day').toDate(),
      index: i
    });
  }
  return daysArray;
};

Posts.fastRenderSubscribe = function (params) {

  var fr = this;

  // generate cat array
  var categories = [];
  var index = 0;
  while (!!params.query["cat["+index+"]"]) {
    categories.push(params.query["cat["+index+"]"]);
    delete params.query["cat["+index+"]"];
    index++;
  }

  if (categories.length) {
    params.query.cat = categories;
  }
  
  if (!params.query.limit) {
    params.query.limit = Settings.get('postsPerPage', 10);
  }

  // special case for daily view
  if (params.query.view === "daily") {

    var daysCount = params.days ? params.days : 5;
    var days = getDays(daysCount);
    var subscriptionTerms = {};

    days.forEach(function (day) {
      
      subscriptionTerms = {
        view: "top",
        date: day.date,
        after: moment(day.date).format("YYYY-MM-DD"),
        before: moment(day.date).format("YYYY-MM-DD")
      };

      // fr.subscribe('postsListUsers', subscriptionTerms);
    
    });

      fr.subscribe('postsList', subscriptionTerms);

  } else {

    fr.subscribe('postsList', params.query);
    // fr.subscribe('postsListUsers', params.query);

  }
};

Meteor.startup(function () {

  FlowRouter.route("/", Posts.fastRenderSubscribe);
  
  FlowRouter.route("/posts/:_id/:slug?", function (params) {
    var postId = params._id;
    this.subscribe('singlePost', postId);
    // this.subscribe('postUsers', postId);
    this.subscribe('commentsList', {view: 'postComments', postId: postId});
  });

});