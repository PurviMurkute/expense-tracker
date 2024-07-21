import User from "../models/User.js"

const postSignup = async (req, res) => {
    const { fullName, email, password, dob } = req.body

    const user = new User({
        fullName: fullName,
        email: email,
        password: password,
        dob: dob
    });

    try{

        const savedUser = await user.save();

        res.json({
            success: true,
            data: savedUser,
            message: "SignUp successful"
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message,
            data: null
        })
    }

}

const postLogin = async (req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({
        email: email,
        password: password
    });

    if(user){
        return res.json({
            success: true,
            message: "Login successful",
            data: user
        })
    }
    else{
        return res.json({
            success: false,
            message: "Invalid credentials",
            data: null
        })
    }
}

export {
    postSignup,
    postLogin
}