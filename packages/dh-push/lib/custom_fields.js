Posts.addField({
  fieldName: 'sendNotification',
  fieldSchema: {
    type: Boolean,
    optional: true,
    label: 'Send Push Notification?',      
    autoform: {
        type: "boolean-checkbox"  
    },        
    editableBy: ["dunnhumby", "admin"]
  }
});
