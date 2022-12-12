import "../login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
export default function Register({ onLogin }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const toastMessage = () => {
        toast.success("Login Successfull!", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        })
    }

    const errorMessage = () => {
        toast.error("Invalid Email or Password!", {
            position: toast.POSITION.TOP_CENTER
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ username, password })
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user))
                toastMessage()
                setTimeout(() => {
                    navigate("/")
                }, 2000)

            } else {
                r.json().then((errors) => setErrors(Object.values(errors)))
                console.log(errors)
                errorMessage()
            }
        })
    }
    return (
        <div className="login">
            <ToastContainer />
            <span className="registertittle">Login</span>

            <form className="registerform" onSubmit={handleSubmit}>

                <label>Username</label>
                <input className="registerinput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username..." />
                <label>Password</label>
                <input className="registerinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password..." />
                <button className="loginbutton">Login
                </button>
                <button className="registerbutton">
                    <Link className="link" to="/Signup">signup</Link>
                </button>

            </form>
        </div>
    )
}


