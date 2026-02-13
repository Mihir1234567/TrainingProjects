const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and populate roles
      req.user = await User.findById(decoded.id).populate("roles");

      // Check if user exists
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      // Check Role consistency (Enterprise Security)
      if (decoded.roleVersions) {
        const userRoles = req.user.roles || [];
        for (const role of userRoles) {
          const tokenVersion = decoded.roleVersions[role._id];
          const dbVersion = role.version || 0;

          // If token has a version for this role, and it doesn't match DB
          if (tokenVersion !== undefined && tokenVersion !== dbVersion) {
            return res.status(401).json({
              message: "Session expired. Role permissions have changed.",
            });
          }
        }
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    // Check both legacy role and new roles array if specific roles are needed
    const userRole = req.user.role;
    const userRoles = req.user.roles ? req.user.roles.map((r) => r.name) : [];

    // Combine them
    const allRoles = [userRole, ...userRoles];

    const hasRole = roles.some((role) => allRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    // 1. Admin Override (Legacy & New)
    if (req.user.role === "admin") return next();
    if (req.user.roles && req.user.roles.some((r) => r.name === "admin"))
      return next();

    // 2. Check Permissions in Roles
    if (!req.user.roles || req.user.roles.length === 0) {
      return res
        .status(403)
        .json({ message: "Not authorized, no roles assigned" });
    }

    const hasPermission = req.user.roles.some(
      (role) =>
        role.permissions && role.permissions.includes(requiredPermission),
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: `Missing permission: ${requiredPermission}`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize, checkPermission };
