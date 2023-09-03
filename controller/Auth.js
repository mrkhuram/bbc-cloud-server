let User = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

class AuthController {
  Register = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.email)
        return res.status(403).send({ message: "Email is required" });
      if (!body.password)
        return res.status(403).send({ message: "Password is required" });
      body.email.toLowerCase();

      // Check user if already exist
      let isExist = await User.findOne({ email: body.email });
      if (isExist)
        return res.status(403).send({ message: "Email already exist." });

      const newUser = new User({ ...body });

      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(body.password, salt);
      if (!hash)
        res
          .status(403)
          .send({ success: false, message: "internal server error" });

      newUser.password = hash;
      let result = await newUser.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "User Registration failed." });

      return res.status(200).send({ success: true, user: result });
    } catch (error) {}
    return res
      .status(401)
      .send({ success: false, message: "Something went wrong in Register" });
  };
  Login = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.email)
        return res.status(403).send({ message: "Email is required" });
      if (!body.password)
        return res.status(403).send({ message: "Password is required" });
      body.email.toLowerCase();

      // Check user if already exist
      let isExist = await User.findOne({ email: body.email });
      if (!isExist)
        return res
          .status(403)
          .send({ message: "Email didn't exist in our record." });

      let compPassword = await bcrypt.compare(body.password, isExist.password);
      if (!compPassword)
        return res
          .status(403)
          .send({ success: false, message: "Password didn't match" });
      jwt.sign(
        {
          id: isExist.id,
          email: isExist.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) return res.status(403).send("Login Failed");
          return res
            .status(200)
            .send({ success: true, token: token, user: isExist });
          }
          );
        } catch (error) {
      return res
        .status(401)
        .send({ success: false, message: "Something went wrong in Login" });
      }
    };
    getProfile = async (req, res) => {
      try {
        let userID = req.params.id;

        // Check user if already exist
        let user = await User.findOne({ _id: userID }).populate("myMusic.music_item");
        console.log(user)
        return res.status(200).send({ success: true, user });
              
    } catch (error) {
      return res
        .status(401)
        .send({ success: false, message: "Something went wrong in Login" });
    }
  };
}

module.exports = new AuthController();
