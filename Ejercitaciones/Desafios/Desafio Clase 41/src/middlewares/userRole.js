import passport from "passport";

export const userRole = (req, res, next) => {
    passport.authenticate("jwt", function (error, user, info) {
        req.user = user;
    })(req, res, next);
    if (!req.user) return res.send({status: "error", message: "You need to be logged in"});
    if (req.user.user.role === "admin" || req.user.user.role === "premium") return next();
    return res.status(401).send({status: "error", message: "Admin role required"});
};