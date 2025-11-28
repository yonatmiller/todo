const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { PercentOfDoneTodos } from "./PercentOfDoneTodos.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'

export function AppHeader() {
    // const navigate = useNavigate()
    const loggedinUser = useSelector((state) => state.loggedinUser)
    const dispatch = useDispatch()

    // const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    // function getStyleByUser() {
    //     if (!loggedinUser) return {}
    //     // const { color, bgColor: backgroundColor } = loggedinUser.pref
    //     return { color, backgroundColor }
    // }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {loggedinUser ? (
                    < section >
                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <PercentOfDoneTodos />
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/UserDetails" >Profile</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
