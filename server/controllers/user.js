import User from "../models/User.js"

const postSignup = async (req, res) => {
    const { fullName, email, password, dob } = req.body

    const user = new User({
        fullName: fullName,
        email: email,
        password: password,
        dob: dob
    });

    try {
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

export {
    postSignup
}