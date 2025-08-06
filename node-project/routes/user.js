const express = require("express");

const{handleGetAllUsers , getUserBYID , UpdateUserBYID , deltebyId ,createUser} = require ("../controller/user")

const router = express.Router()


// routes 
router.get("/" , handleGetAllUsers);

router.get("/:id" , getUserBYID); 

router.patch("/:id" , UpdateUserBYID);

router.delete("/:id", deltebyId);

router.post("/", createUser);

   



module.exports = router 
