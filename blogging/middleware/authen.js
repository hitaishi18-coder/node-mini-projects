
const { validateToken } = require("../services/auth");

function checkForAuth(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayLoad = validateToken(tokenCookieValue);
      req.user = userPayLoad;
    } catch (error) {
      req.user = null; // optional: wipe user if token is invalid
    }

    return next(); // ✅ only called once
  };
}

module.exports = {
  checkForAuth,
};
