// /**
// * Stockalerts schema
// * @type {SimpleSchema}
// */
// Stockalerts.schema = new SimpleSchema({
//   /**
//     ID
//   */
//   _id: {
//     type: String,
//     optional: true
//   },
//   /**
//     Timetstamp of alert creation
//   */
//   createdAt: {
//     type: Date,
//     optional: true
//   },
//   /**
//     Title
//   */
//   alertTitle: {
//     type: String,
//     optional: false,
//     max: 500,
//     editableBy: ["admin"],
//     autoform: {
//       order: 20
//     }
//   },  
//   /**
//     alertType
//   */
//   alertType: {
//     type: String,
//     optional: false,
//     editableBy: ["admin"]
//   },
//   /**
//     Latitude
//   */
//   latitude: {
//     type: Number,
//     optional: false
//   },
//   /**
//     Longitude
//   */
//   longitude: {
//     type: Number,
//     optional: false
//   }, 
//   /**
//     EAN
//   */
//   EAN: {
//     type: Number,
//     optional: true
//   },
//   /**
//     SKU
//   */
//   SKU: {
//     type: Number,
//     optional: true
//   },
//   /**
//     Product Description
//   */
//   productDescription: {
//     type: String,
//     optional: true
//   },
//   /**
//     product picture
//   */
//   productPictureURL: {
//     type: String,
//     optional: true,
//     editableBy: ["admin"],
//     autoform: {
//       type: "bootstrap-url",
//       order: 10
//     }
//   },
//   /**
//     Currently on Promotion
//   */
//   promotion: {
//     type: Boolean,
//     optional: true
//   },
//   /**
//     Recommended Retail Price
//   */
//   RRP: {
//     type: Number,
//     decimal: true,
//     optional: true
//   },
//   /**
//     Expected Daily Sales
//   */
//   ExpectedDailySales: {
//     type: Number,
//     decimal: true,
//     optional: true
//   },
//     /**
//     Retailer Name
//   */
//   retailerName: {
//     type: String,
//     optional: true
//   },
//   /**
//     Store Name
//   */
//   storeName: {
//     type: String,
//     optional: true
//   }
// });

// // schema transforms
// Meteor.startup(function(){
//   // needs to happen after every fields were added
//   Stockalerts.internationalize();
// });

// /**
// * Attach schema to Posts collection
// */
// Stockalerts.attachSchema(Stockalerts.schema);

// Stockalerts.allow({
//   update: _.partial(Telescope.allowCheck, Stockalerts),
//   remove: _.partial(Telescope.allowCheck, Stockalerts)
// });

