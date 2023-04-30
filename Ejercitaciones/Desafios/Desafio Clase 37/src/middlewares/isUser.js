import passport from "passport";

export const isUser = (req, res, next) => {
    passport.authenticate("jwt", function (error, user, info) {
        req.user = user;
        req.logger.debug(req.user);
    })(req, res, next);
    if (req.user.user.role === "user" || req.user.user.role === "premium") return next();
    return res.send({status: "error", message: "User role required"});
};