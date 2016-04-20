// Template.dh_post_item.helpers({
//     image: function() {
//         if (this.pictureChoice === undefined) {
//             this.pictureChoice = getRandom(4);

//             var pictures = [
//                 "http://www.dunnhumby.com/sites/default/files/trends_customer.jpg",
//                 "http://www.dunnhumby.com/sites/default/files/The-Inconvenience-of-Convenience_0.jpg",
//                 "http://www.dunnhumby.com/sites/default/files/Blog_Millennials%20are%20Making%20More%20Health%20Related.jpg",
//                 "http://www.dunnhumby.com/sites/default/files/Blog_What%20does%20Value%20mean%20to%20your%20customers%20in%202016.jpg",
//                 "http://www.dunnhumby.com/sites/default/files/Blog_Shoppers_Wishes_Grocery_Stores.jpg"
//             ];

//             return pictures[this.pictureChoice];
//         }
//     },
//     content_back: function() {
//         if (this.colour === undefined) {
//             var colours = ['#009b74', '#e17000', '#b19b00', '#a31a7e'],
//                 colourChoice = getRandom(3);
                
//                 this.colour = colours[colourChoice];

//             return "background: " + this.colour + "! important;";
//         }
//     }
// });

// function getRandom(TotalChoices) {

//     var choices = [];
//     for (var i = 0; i <= TotalChoices; i++) {
//         choices.push(i);
//     }

//     return Random.choice(choices)
// }
// function addCategoryClass(postClass, post) {
//     if (!!post.category) {
        
//         var masterCats = ['Alerts', 'Availability', 'Strategy'];
        
//         Categories.find({$in: {_id: post.categories}}).name
        
//         var categoryClass = post.category;
//         return postClass + " " + categoryClass;
//     }
//     return postClass;
// }
// // add callback that adds "category" CSS classes
// Telescope.callbacks.add("postClass", addCategoryClass);