
//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

/**
 * Generate HTML body from Markdown on post insert
 */
Stockalerts.before.insert(function (userId, doc) {
  if(!!doc.createdAt)
    doc.createdAt = new Date;
});
