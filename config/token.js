const jwt = require("jsonwebtoken");

const SECRET = "milanesa";
function generateToken(payload) {
  const token = jwt.sign({ payload }, SECRET, {
    expiresIn: "2h",
  });

  return token;
}

const validateToken = function (token) {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
