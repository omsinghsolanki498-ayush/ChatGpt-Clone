const jwt = require("jsonwebtoken");

const protected = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // CHECK TOKEN 
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized User",
            });
        }

     
        const token = authHeader.split(" ")[1];

        try {

            // VERIFY TOKEN
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // SAVE USER DATA
            req.user = decoded;

            
            next();

        } catch (error) {

            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            });
        }

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = protected;