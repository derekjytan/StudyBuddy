import { useEffect, useState } from "react"
import axios from '../api/axios'

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('/user', {
                    signal: controller.signal
                })
                console.log(response);
                isMounted && setUsers(response)
            } catch(err) {
                console.log(err)
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    })

    return (
    <article>
        <h2>Users List</h2>
        {users?.length
            ? (
                <ul>
                    {users.map((users, i) => 
                        <li key={i}>{user?.
                        username}</li>
                    )}
                </ul>
            ) : <p>No users</p>
        }
    </article>
  )
};

export default Users