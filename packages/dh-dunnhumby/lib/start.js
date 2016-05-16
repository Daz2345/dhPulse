// if (Meteor.isCordova) {
//   Meteor.startup(function() {
//
//     function handleExternalURLs() {
//         // Handle click events for all external URLs
//         if (device.platform.toUpperCase() === 'ANDROID') {
//             $(document).on('click', 'a[href^="http"]', function (e) {
//                 e.preventDefault();
//                 var url = $(this).attr('href');
//                 navigator.app.loadUrl(url, { openExternal: true });
//             });
//         }
//         else if (device.platform.toUpperCase() === 'IOS') {
//           console.log("ios");
//             $(document).on('click', 'a[href^="http"]', function (e) {
//                 e.preventDefault();
//                 var url = $(this).attr('href');
//                 window.open(url, '_system');
//             });
//         }
//         else {
//             // Leave standard behaviour
//         }
//     }
//
//       // Mock device.platform property if not available
//       if (!window.device) {
//           window.device = { platform: 'Browser' };
//       }
//
//       handleExternalURLs();
//   }
//   )
// }
