const user = require("../controller/user")

async function handleGetAllUsers(req,res) {

    const allDbUsers = await user.find({})
    return res.json(allDbUsers);
}

async function getUserBYID(req,res) {
    //  res.setHeader("x-my-name " , "hitaishi "); // custom header 
    // // always initialise custome headers with " x "
    // const id = Number(req.params.id);
  const user = await user.find(req.param.id)
  if(!user) return res.status(404).json({error: "user not found "})
    return res.json(user)
}

async function UpdateUserBYID(req,res){
   
  await user.findByIdAndUpdate(req.params.id , { last_name : ' changed' })
    return res.json({status: "success "});
}

async function deltebyId (req , res ) {
  await user.findByIdAndDelete(req.params.id)
    return res.json({status : "success"})
}

async function createUser (req , res ) {
  // Destructure values directly from request body
    const { first_name, last_name, email, gender, job_title } = req.body;

    if(!first_name || !last_name || !email || !gender || !job_title){
      return res.status(400).json({ msg :"all field are required "});
    }

    // users.push({...body , id: users.length+1});
    // fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err,data) => {
    //         return res.status(201).json({ status: "received", id: users.length  });
    // })
    // console.log("body", body);  // Should show object from Postman


try {
    const result = await user.create({
      first_name,
      last_name,
      email,
      gender,
      job_title ,
    });

    console.log("result", result);
    return res.status(201).json({ msg: "success", id : result._id });
  } catch (error) {
    console.error("MongoDB error", error);
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
    handleGetAllUsers,
    getUserBYID,
    UpdateUserBYID,
    deltebyId,
    createUser
}

