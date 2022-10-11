const path = require("path");
// load dependencies
const env = require("dotenv");
const csrf = require("csurf");
const express = require("express");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressHbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // initalize sequelize with session store
const cors = require('cors');

const app = express();
const csrfProtection = csrf();
const router = express.Router();

//Loading Routes
const webRoutes = require("./routes/web");
const productRoutes = require("./routes/product");
const testRoutes = require("./routes/test");
const categoryRoutes = require("./routes/category");
const sellerRoutes = require("./routes/seller");
const orderRoutes=require("./routes/order");

const sequelize = require("./config/database");
const errorController = require("./app/controllers/ErrorController");
const Order = require("./app/models/order");
const User = require("./app/models/User");
const Cart = require("./app/models/cart");
User.hasMany(Order);

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



// required for csurf
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new SequelizeStore({
      db: sequelize,
      table: "sessions",
    }),

app.use(csrfProtection);
app.use(cors({origin: 'http://localhost:3002'}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "web_layout",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(webRoutes);
app.use(productRoutes);
app.use(testRoutes);
app.use(categoryRoutes);
app.use(sellerRoutes);
app.use(orderRoutes);
app.use(errorController.pageNotFound);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {


    app.listen(process.env.PORT);
    //pending set timezone
    console.log("App listening on port " + process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
