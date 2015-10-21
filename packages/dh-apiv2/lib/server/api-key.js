Meteor.methods({
  initApiKey: function( userId ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );

    var newKey = Random.hexString( 32 );

    try {
       var key = APIKeys.insert({
        "owner": userId,
        "key": newKey
       });
       return key;
    } catch( exception ) {
      return exception;
    }
  }
});

Meteor.publish( 'APIKey', function(){
  var user = this.userId;
  var data = APIKeys.find( { "owner": user }, {fields: { "key": 1 } } );

  if ( data ) {
    return data;
  }

  return this.ready();
});