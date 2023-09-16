const { verifyToken } = require("../../utils/jwt");
const { user } = require("../../models");

exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.access_token;

    if (token) {
      const payload = verifyToken(token);
      const user_name = payload.user_name;

      const loginUser = await user.findOne({
        where: {
          user_name: user_name,
        },
      });
      console.log(loginUser,"ini loginnya")

      if (loginUser) {
        req.userData = payload;
        next();
      }
    } else {
      res.status(401).json({
        success: false,
        errors:
          "You must signin first, because you don't have permission to access.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, errors: ["Internal Server Error"] });
  }
};
