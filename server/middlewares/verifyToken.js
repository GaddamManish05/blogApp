export const verifyToken = (...allowedRoles) => {
    return async (req, res, next) => {
        try {

            let token = req.cookies?.token;

            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            let decodedToken = jwt.verify(
                token,
                process.env.JWT_TOKEN
            );

            if (
                allowedRoles.length > 0 &&
                !allowedRoles.includes(decodedToken.role)
            ) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            req.user = decodedToken;

            next();

        } catch (err) {

            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Session Expired"
                });
            }

            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({
                    message: "Invalid Token"
                });
            }

            return res.status(500).json({
                message: "Server Error"
            });
        }
    };
};