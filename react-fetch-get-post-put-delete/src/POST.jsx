import React from 'react'
import { useEffect, useState } from 'react'
import {Button, EditableText, InputGroup, Toaster, Position} from "@blueprintjs/core"

const AppToaster = Toaster.create({
    Position: Position.TOP,
})

function POST() {
    const [users, setUsers] = useState([])
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newWebsite, setNewWebsite] = useState("")


    useEffect (() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => setUsers(json))
    }, [])

    const addUser = () => {
        const name = newName.trim()
        const email = newEmail.trim()
        const website = newWebsite.trim()
        if(name && email && website){
            fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    website,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data])
                setNewName("")
                setNewEmail("")
                setNewWebsite("")
            })
            .catch(error => {
                AppToaster.show({
                    message: "User added successfully",
                    intent: "success",
                    timeout: 3000,
                })
            })
        }
    }
  return (
    <div className='App'>
        <table class= "bp4-html-table .modifier">
            <thead>
                <tr>
                    <th>ID</th>
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
                        <td>{user.email}</td>
                        <td>{user.website}</td>
                        <td>
                            <Button icon="edit" intent="primary" />
                            <Button icon="trash" intent="danger" />
                        </td>
                    </tr>
                ))}
            </tbody>

        <div>
            <InputGroup placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <InputGroup placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <InputGroup placeholder="Website" value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)} />
            <Button text="Add User" intent="primary" onClick={addUser} />
        </div>
    </table>
    </div>
  )
}

export default POST
