Meteor.startup(function(){
      Meteor.AppCache.config({onlineOnly: ['/img/dhPulse_desktop_v1.gif', '/img/dhPulse_desktop_v2.gif', '/img/dhPulse_mobile_v1.gif']});
})