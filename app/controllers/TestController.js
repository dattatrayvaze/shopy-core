

exports.test = (req, res, next) => {
    //res.json({"test": "test", csrfToken:req.csrfToken()});
    res.json(["Atit","Saylee", "Ritesh", "Sudiksha", "Manali"]);
};

exports.testPost = (req, res, next) => {
    console.log("request body = " + req.body);
    console.log(req.body);
    res.json({"test": "Post request Received"});
};

exports.getCsrfToken = (req, res, next) => {
    //res.json({csrfToken:req.csrfToken()});
    res.json({csrfToken:"resr"});
};