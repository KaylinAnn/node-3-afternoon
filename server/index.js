const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const app = express();
const checkForSessions = require("./middleware/checkForSessions");
const swagController = require("./controllers/swag_controller");
const auth = require("./controllers/auth_controller");
const cart = require("./controllers/cart_controller");
const search = require("./controllers/search_controller");

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSessions);
app.use(express.static(`${__dirname}/build`));

app.get("/api/swag", swagController.read);
app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);

app.post("/api/cart", cart.add);
app.post("/api/cart/checkout", cart.checkout);
app.delete("/api/cart", cart.delete);

app.get("/api/search", search.search);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
