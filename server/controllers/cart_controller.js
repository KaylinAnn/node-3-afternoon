const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    const { id } = req.query;
    const { cart } = req.session.user;
    const index = cart.findIndex(item => item.id === id);
    if (index === -1) {
      const item = swag.find(item => item.id === id);
      cart.push(item);
      req.session.user.total += item.price;
    }
  },

  delete: (req, res, next) => {
    const { cart } = req.session.user;
    const { id } = req.query;
    const index = cart.findIndex(item => item.id === id);
    if (index) {
      const item = swag.find(item => item.id === id);
      cart.splice(item, 1);
    }
    res.status(200).send(req.session.user);
  },

  checkout: (req, res, next) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(req.session.user);
  }
};
