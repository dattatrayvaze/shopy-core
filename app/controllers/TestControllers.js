
exports.test = (req, res, next) => {

    res.json({"test": "test", csrfToken:req.csrfToken()});

};



exports.testPost = (req, res, next) => {

    res.json({"test": "Post request Received"});

};