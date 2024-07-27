import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const postTransaction = async (req, res) => {
    const { title, amount, category, type, user } = req.body;

    const newTransaction = new Transaction({
        title,
        amount,
        category,
        type,
        user
    });

    try {
        const savedTransaction = await newTransaction.save();

        res.json({
            success: true,
            message: "Transaction Successful",
            data: savedTransaction
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

const getTransaction = async (req, res) => {
    const { userId } = req.query;

    const user = await User.findById(userId)

    if(!user){
        return res.json({
            success: false,
            message: "user not found",
            data: null
        })
    }

    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1});

    res.json({
        success: true,
        message: "Transaction fetched successfully",
        data: transactions
    })
}

const deleteTransaction = async (req, res) => {
    const {id} = req.params

    await Transaction.deleteOne({_id: id});

    res.json({
        success: true,
        message: "Transaction deleted successfully",
        data: null
    })
}
export {
    postTransaction,
    getTransaction,
    deleteTransaction
}