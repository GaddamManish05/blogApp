import jwt from 'jsonwebtoken'

export const verifyToken = (...allowedRoles) => {
    return async (req, res, next) => {

        console.log("VERIFY TOKEN STARTED");

        try {

            let token = req.cookies?.token;

            console.log("TOKEN:", token);

            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            let decodedToken = jwt.verify(
                token,
                process.env.JWT_TOKEN
            );

            console.log("DECODED:", decodedToken);

            if (
                allowedRoles.length > 0 &&
                !allowedRoles.includes(decodedToken.role)
            ) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            req.user = decodedToken;

            console.log("VERIFY PASSED");

            next();

        } catch (err) {

            console.log("VERIFY ERROR:", err);

            return res.status(500).json({
                message: "Server Error"
            });
        }
    };
};