const roleBasedAuth = (...allowedRoles) => (req, res, next)=>{
    const hasRole = req.user.roles.some(userRole => allowedRoles.includes(userRole));

    if (hasRole) return next();

    res.status(403).send("Access denied.");
};

export default roleBasedAuth;