Users.addField({
  fieldName: 'API_Enabled',
  fieldSchema: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    editableBy: ["admin"],
    autoform: {    
        group: 'API'
    }
  }
});