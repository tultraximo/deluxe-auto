
import React ,{useState,useEffect} from "react";

function AccountSignupForm(){

    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[roleIds, setRoleIds] = useState([]);
    const[roleId, setRoleId] = useState('');

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value)
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value)
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value)
    }

    const handleRoleIdChange = (event) => {
        const value = event.target.value;
        setRoleId(value)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {};
        console.log(data)
        data.username = username
        data.email = email
        data.password = password
        data.role_id = roleId
        const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}api/accounts`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        }

        const response = await fetch (url, fetchConfig);
        console.log(response)
        if (response.ok){
            fetchData();

        }
    }

    const fetchData = async () => {
      const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}role`
      const response = await fetch (url)
        if (response.ok){
            const data = await response.json();
            console.log(data)
            setRoleIds(data)
        }
    }

    useEffect (() => {
        fetchData();
    }, [])
    return (

        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add information</h1>
              <form onSubmit ={handleSubmit} id="create-new-client-form">
                <div onChange={handleUsernameChange} className="form-floating mb-3">
                  <input placeholder="username" required type="text" name="username" id="username" className="form-control" value={username}/>
                  <label htmlFor="username">Username</label>
                </div>
                <div onChange={handleEmailChange} className="form-floating mb-3">
                  <input placeholder="email" required type="text" name="email" id="email" className="form-control" value={email}/>
                  <label htmlFor="email">email@example.com</label>
                </div>
                <div onChange={handlePasswordChange} className="form-floating mb-3">
                  <input placeholder="password" required type="text" name="password" id="password" className="form-control"  value={password}/>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                    <select onChange={handleRoleIdChange}
                    required name="role_id" id="role_id"
                    className="form-select"
                    value={role_id}>

                  <option value="">Therapist or Client</option>
                  {roleIds.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.role}
                  </option>
                ))}
                </select>
                </div>
                <button className="btn btn-success btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
 )
}

export default AccountSignupForm
