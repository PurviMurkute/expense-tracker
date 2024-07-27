import axios from "axios";
import "./AddTransaction.css";
import { useState, useEffect } from 'react';
import toast, {Toaster} from "react-hot-toast";
import { Link } from "react-router-dom";

function AddTransaction() {
  const [user, setUser] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('credit')
  const [category, setCategory] = useState('learning')

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }
  }, [])

  const addTransaction = async () => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/transaction`, {
      title,
      amount,
      type,
      category,
      user: user._id
    })

    toast.success(response.data.message)

    setTitle('')
    setAmount(0)
    setType('credit')
    setCategory('learning')

    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  return (
    <div>
        <h3 className="auth-heading">
          Add Transaction For {user.fullName}
        </h3>

      <form className="auth-form">
        <input
          type="text"
          placeholder="Title"
          className="input-box"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

        <input
          type="number"
          placeholder="Amount"
          className="input-box"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          />

        <select className="input-box"
          value={type}
          onChange={(e) => setType(e.target.value)}>
          <option value="credit">Income</option>
          <option value="debit">Expense</option>
        </select>

        <select className="input-box"
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="food">food</option>
          <option value="rent">rent</option>
          <option value="utilities">utilities</option>
          <option value="transportation">transportation</option>
          <option value="entertainment">entertainment</option>
          <option value="clothing">clothing</option>
          <option value="health">health</option>
          <option value="salary">salary</option>
          <option value="learning">learning</option>
        </select>

        <button type="button" className="btn" onClick={addTransaction}>
          Add Transaction
        </button>
      </form>
      <Link to='/'>
      <button type="button" className="home-btn">Go to Home</button>
      </Link>

      <Toaster />
    </div>
  )
}

export default AddTransaction