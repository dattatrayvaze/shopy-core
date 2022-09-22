

exports.test = (req, res, next) => {
    //res.json({"test": "test", csrfToken:req.csrfToken()});
    res.json(["Atit","Saylee", "Ritesh", "Sudiksha", "Manali"]);
};

exports.testPost = (req, res, next) => {
    res.json({"test": "Post request Received"});
};