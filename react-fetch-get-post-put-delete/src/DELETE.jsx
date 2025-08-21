import React from 'react'
import { useEffect, useState } from 'react'
import { Button, EditableText, InputGroup, Toaster, Position,} from "@blueprintjs/core"


const AppToaster = Toaster.create({
    Position: Position.TOP,
})

function DELETE () {
    const [users, setUsers] = useState([])
    const [newName, setNewName] = useState('')
    const [newEmail, setNEwEmail] = useState('')
    const [newWebsite, setNewWebsite] = useState('')


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json))
    }, [])

    const addUser = () => {
        const name = newName.trim()
        const email = newEmail.trim()
        const website = newWebsite.trim()
        if (name && email && website){
            fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    website
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                }
            })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data])
                setNewName('')
                setNewEmail('')
                setNewWebsite('')
                AppToaster.show({
                    message: "User added successfully!",
                    intent: "success",
                    timeout: 3000,
                })
            })
        }
    }

    const updateUser = id => {
        const user = users.find(user => user.id === id)

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                ...user,
                name: user.name + ' (updated)',
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        })
        .then(response => response.json())
        .then(() => {
            AppToaster.show({
                message: "User updated successfully!",
                intent: "success",
                timeout: 3000,
            })
        })
    }

    const delteUser = id => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(() => {
            setUsers(value => {
                return value.filter(item => item.id !== id)
            })
            AppToaster.show({
                message: "User deleted successfully!",
                intent: "success",
                timeout: 3000,
            })
        })
    }
    const onChangeHandler = (id, key, value) => {
        setUsers(value => {
            return value.map(item => {
                if (item.id === id) {
                    return { ...item, [key]: value } 
                }
                return item
            })
        })
    }

  return (
    <div className='App'>
        <table className="bp4-html-table .modifier">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td><EditableText value={user.email} onChange={value => onChangeHandler(user.id, "email", value)}/></td>
                        <td><EditableText value={user.website} onChange={value => onChangeHandler(user.id, "website", value)}/></td>
                        <td>
                            <Button intent="primary" icon="edit" onClick={() => updateUser(user.id)} />
                            <Button intent="danger"  icon="trash" onClick={() => deleteUser(user.id)} />
                        </td>

                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td>
                        <InputGroup value={newName} onChange={e => setNewName(e.target.value)}
                        placeholder="Add name here...."/>
                    </td>
                     <td>
                        <InputGroup value={newEmail} onChange={e => setNEwEmail(e.target.value)}
                        placeholder="Add email here...."/>
                    </td>
                    <td>
                        <InputGroup value={newWebsite} onChange={e => setNewWebsite(e.target.value)}
                        placeholder="Add website here...."/>
                    </td>
                    <td>
                        <Button intent="primary" icon="add" onClick={addUser} />
                    </td>
                </tr>
            </tfoot>
        </table>
        
      
    </div>
  )
}
export default DELETE
