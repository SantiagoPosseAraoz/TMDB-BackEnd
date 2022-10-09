const { validateToken } = require("../config/token");

const validateUser = function (req, res, next) {
  const {token} = req.body
  const { payload } = validateToken(token);
  req.user = payload;

  if (payload) return next();

  res.sendStatus(401); // Unauthorized
};

module.exports = { validateUser };
