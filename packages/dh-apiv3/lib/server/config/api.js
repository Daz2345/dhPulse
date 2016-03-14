API = {
  authentication: function( apiKey ) {},
  connection: function( request ) {
    var getRequestContents = API.utility.getRequestContents( request ),
        apiKey             = getRequestContents.api_key,
        validUser          = API.authentication( apiKey );

    if ( validUser ) {
      delete getRequestContents.api_key;
      return { owner: validUser, data: getRequestContents };
    } else {
      return { error: 401, message: "Invalid API key." };
    }
  },
  handleRequest: function( context, resource, method ) {
    var connection = API.connection( context.request );
    if ( !connection.error ) {
      API.methods[ resource ][ method ]( context, connection );
    } else {
      API.utility.response( context, 401, connection );
    }
  },
  methods: {
    post: {
      GET: function( context, connection ) {},
      POST: function( context, connection ) {},
      PUT: function( context, connection ) {},
      DELETE: function( context, connection ) {}
    },
    categories: {
      GET: function( context, connection ) {},
      POST: function( context, connection ) {},
      PUT: function( context, connection ) {},
      DELETE: function( context, connection ) {}
    }    
  },
  resources: {},
  utility: {
    getRequestContents: function( request ) {
      switch( request.method ) {
        case "GET":
          return request.query;
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    },
    hasData: function( data ) {},
    response: function( context, statusCode, data ) {},
    validate: function( data, pattern ) {}
  }
};
