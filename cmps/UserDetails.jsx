import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { updateUser } from '../store/actions/user.actions.js'
import { utilService } from '../services/util.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux

export function UserDetails() {

    const loggedinUser = useSelector((state) => state.loggedinUser)
    const [userToEdit, setUserToEdit] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()
    console.log(loggedinUser);

    useEffect(() => {
        if (loggedinUser) {
            setUserToEdit({
                fullname: loggedinUser.fullname || '',
                // color: loggedinUser.pref?.color || '#eeeeee',
                // bgColor: loggedinUser.pref?.bgColor || '#191919',
            })
        } else navigate('/')
    }, [loggedinUser])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setUserToEdit(prev => ({ ...prev, [field]: value }))
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        const userToUpdate = {
            fullname: userToEdit.fullname,
            pref: { color: userToEdit.color, bgColor: userToEdit.bgColor }
        }
        updateUser(userToUpdate)
            .then(() => {
                showSuccessMsg('User updated successfully!')
            })
            .catch(err => {
                console.error('Cannot update user:', err)
                showErrorMsg('Cannot update user')
            })
    }

    if (!userToEdit) return <span></span>
    return loggedinUser ? (
        <section>
            <form className='activities-form' onSubmit={onSaveUser}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    name="fullname"
                    value={userToEdit.fullname}
                    onChange={handleChange}
                />

                <label htmlFor="name">Color: </label>
                <input
                    type="color"
                    name="color"
                    value={userToEdit.color}
                    onChange={handleChange}
                />

                <label htmlFor="name">BG Color: </label>
                <input
                    type="color"
                    name="bgColor"
                    value={userToEdit.bgColor}
                    onChange={handleChange}
                />
                <button onClick={onSaveUser}>Save</button>
            </form>
        </section >
    ) : (
        <section>
            <LoginSignup onSetUser={onSetUser} />
        </section>
    )
}