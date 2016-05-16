Template.post_title.events({
  'click a'(e) {
    var target = $(evt.currentTarget).attr('target');
    if (target === "_blank") {
      e.preventDefault();
      var destination = $(evt.currentTarget).attr('href');
      window.open(destination,'_system');
    }
  }
})
