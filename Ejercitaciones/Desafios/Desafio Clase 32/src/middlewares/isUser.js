import passport from "passport";

export const isUser = (req, res, next) => {
  passport.authenticate("jwt", function (error, user, info) {
    req.user = user;
    console.log(req.user);
  })(req, res, next);
  if (req.user.user.role === "user") return next();
  return res.send({status: "error", message: "User role required"});
};