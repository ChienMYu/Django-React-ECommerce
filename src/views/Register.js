import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null,
        }
    }

    componentDidMount = () => {
    }

    

    handleForm= async(event) => {
        event.preventDefault();
        const username = event.target.username.value
        const password = event.target.password1.value
        const password2 = event.target.password2.value
        const email = event.target.email.value
        if(password !== password2){
            console.log("password don't match")
            return
        }
        const res = await fetch(`http://127.0.0.1:8000/api/register/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password, "password2" : password2, "email":email})
        })
        const data = await res.json()
        event.target.username.value = ''
        event.target.password1.value = ''
        event.target.password2.value = ''
        event.target.email.value = ''

        console.log(data)
        this.setState({
            redirect:true
        })
    }

    

    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        return (
            <>
                <div className='container border border-2 px-5 py-5'>
                    <h2 className="mb-4">Register</h2>
                    <form onSubmit={this.handleForm}>
                        <div className="mb-3">
                            <label htmlFor="id_username" className="form-label">Username :</label>
                            <input type="text" name="username" maxLength="150" className="form-control" id="id_username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_email" className="form-label">Email :</label>
                            <input type="text" name="email" maxLength="150" className="form-control" id="id_email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_password1" className="form-label">Password :</label>
                            <input type="password" name="password1" autoComplete='new-password' maxLength="150" className="form-control" id="id_password1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_password2" className="form-label">Password confirmation :</label>
                            <input type="password" name="password2" autoComplete='new-password' maxLength="150" className="form-control" id="id_password2" />
                        </div>
                        <input type='submit' className='btn btn-primary mt-3' value='Submit' />
                    </form>
                </div>

                <div className='mt-2 text-center'>Already have an account? <Link to= "/login" className='text-drecoration-none'>Log In</Link></div>
            </>
        )
    }
}
