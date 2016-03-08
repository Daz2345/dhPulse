Template.pleaseWait.helpers({
    mytemplate: function(){
        var loaders = [
            "loader1",
            "loader2",
            "loader3"
            ];
        return Random.choice(loaders);
    },
    message: function(){
        var messages = [
            "wont be long now",
            "its worth the wait",
            "what are your customers doing today?",
            "we know customers",
            "using data and science to delight customers",
            "building loyalty one insight at a time",
            "the worlds leading customer science company"
            ];
        return Random.choice(messages);
    }
})