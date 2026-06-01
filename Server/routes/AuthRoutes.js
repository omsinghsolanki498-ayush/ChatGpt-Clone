const express = require("express");  // import express
const { register, login } = require("../Controller/AuthController");  // import register and login function from AuthController
const protected = require("../Middleware/ProtectedMiddleware");  // import protected middleware for dashboard route
const router = express.Router();

router.post("/register", register); // 
router.post("/login", login);


router.get("/dashboard", protected,async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            message : "Welcome To Dashboard",
            user: req.user,
        });

    }catch(error){
        res.status(500).json({
            message: "Dashboard Error",
            success: false,
        });
    };
})

module.exports = router;

