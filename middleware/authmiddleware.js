let jwt = require("jsonwebtoken");

let checkAuth = (req, res, next) => {
  const authorization = req.headers;
  if (!authorization) return res.status(403).send({ auth: false, message: "No token provided." });

  const [authType,token] = authorization.trim('').split(" ");
  if(authType !== "Bearer") return res.status(403).send({auth: false, message: "No token provided."})

  if(!token) return res.status(403).send({auth: false, message: "No token provided."})

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      res
        .status(403)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.user = {
      email: decoded.email,
      id: decoded.id,
    };
    next();
  });
};

module.exports = {
  checkAuth,
};
