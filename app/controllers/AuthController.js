const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/User");
const Session = require("../models/Session");
const Category = require("../models/category");
const Product = require("../models/product");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { securePassword } = require("../models/User");

exports.getUserById=(req,res)=>{
  let id =req.params.id;

  let user=User.findOne({
    where:{id:id}
  }).then(user=>{
    // user.createOrder({total:45,cartId:4})
    res.json(user)
  })

  
}

const message = (req) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  return message;
};

const oldInput = (req) => {
  let oldInput = req.flash("oldInput");
  if (oldInput.length > 0) {
    oldInput = oldInput[0];
  } else {
    oldInput = null;
  }

  return oldInput;
};

exports.loginPage = (req, res, next) => {
  if (res.locals.isAuthenticated) {
    res.redirect("/");
  } else {
    res.render("login", {
      layout: "login_layout",
      loginPage: true,
      pageTitle: "Login",
      errorMessage: message(req),
      oldInput: oldInput(req),
    });
  }
};

exports.login = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.inputEmail))
    validationErrors.push("Please enter a valid email address.");
  if (validator.isEmpty(req.body.inputPassword))
    validationErrors.push("Password cannot be blank.");
  if (validationErrors.length) {
    req.flash("error", validationErrors);
    return res.redirect("/login");
  }

  
  User.findOne({
  	where: {
  		email: req.body.inputEmail
  	}
  }).then(user => {
  	if(user) {
  		bcrypt
  			.compare(req.body.inputPassword, user.password)
  			.then(doMatch => {
  				if (doMatch) {
  					req.session.isLoggedIn = true;
  		            req.session.user = user.dataValues;
  		            return req.session.save(err => {
  						console.log(err);

  						res.redirect('/');
  		            });
  				}
  				req.flash('error', 'Invalid email or password.');
  				req.flash('oldInput',{email: req.body.inputEmail});
  				return res.redirect('/login');
  			})
  			.catch(err => {
  				console.log(err);
  				req.flash('error', 'Sorry! Somethig went wrong.');
  				req.flash('oldInput',{email: req.body.inputEmail});
  				return res.redirect('/login');
  			});
  	} else {
  		req.flash('error', 'No user found with this email');
  		req.flash('oldInput',{email: req.body.inputEmail});

  		 return res.redirect('/login');
  	}
  })
  .catch(err => console.log(err));
};

exports.logout = (req, res, next) => {
  if (res.locals.isAuthenticated) {
    req.session.destroy((err) => {
      return res.redirect("/");
    });
  } else {
    return res.redirect("/login");
  }
};

exports.signUpPage = (req, res, next) => {
  res.render("sign_up", {
    layout: "login_layout",
    signUpPage: true,
    errorMessage: message(req),
    oldInput: oldInput(req),
  });
};

exports.signUp = (req, res, next) => {


	
	User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return bcrypt
          .hash(req.body.password, 12)
          .then((hashedPassword) => {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            //res.json({signup:"signup"})
            return res.redirect("/login");
          });
      } else {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        req.flash("oldInput", { name: req.body.name });
        return res.redirect("/sign-up");
      }
    })
    .catch((err) => console.log(err));
};



exports.isAuthenticated = (req, res, next) => {
	//variable profile can be anything it is going to come from frontend
	//req.auth is set by is SignedIn
	console.log(req.auth)
	let checker = req.profile && req.auth && req.profile.id == req.auth.id;
	if (!checker) {
	  return res.status(403).json({
		err: "ACCESS DENIED",
	  });
	}
	next();
  };

// exports.isAuthenticated = (req, res, next) => {
//   if (req.session.isLoggedIn === true) {
//     next();
//   } else {
//     console.log("not auth");
//     return res.redirect("/");
//   }
// };


exports.isAdmin = (req, res, next) => {
  // let checker = req.profile && req.auth && req.profile.role == 0;
  let checker = req.profile.role == 0;

  if (!checker) {
    return res.status(403).json({
      err: "ACCESS DENIED",
    });
  }
  next();
  // if (req.profile.role=== 1) {
  //   return res.status(403).json({
  // 	err: "You are not ADMIN ,Access denied",
  //   });
  // }
  // next();
};

exports.forgotPasswordPage = (req, res, next) => {
  if (res.locals.isAuthenticated) {
    return res.redirect("/");
  } else {
    return res.render("forgot_password", {
      layout: "login_layout",
      loginPage: true,
      pageTitle: "Forgot Password",
      errorMessage: message(req),
      oldInput: oldInput(req),
    });
  }
};

exports.forgotPassword = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");

  if (validationErrors.length) {
    req.flash("error", validationErrors);
    return res.redirect("/forgot-password");
  }
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/forgot-password");
    }
    const token = buffer.toString("hex");
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          req.flash("error", "No user found with that email");
          return res.redirect("/forgot-password");
        }
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        if (result) return res.redirect("/resetlink");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.searchC = (req, res) => {
  let role = req.params.role;

  let categories = User.findAll({
    // where :{id:id},
    // attributes:[  "fullName","id"]
    where: { role: role },
  }).then((categories) => {
    res.status(200).json({
      categories,
    });
  });
};
