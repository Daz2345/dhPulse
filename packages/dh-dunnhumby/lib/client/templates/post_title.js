Template.post_title.events({
  'click a'(e) {
    var target = $(e.currentTarget).attr('target');
    if (target === "_blank") {
      e.preventDefault();
      var destination = $(e.currentTarget).attr('href');
      window.open(destination,'_system');
    }
  }
})
