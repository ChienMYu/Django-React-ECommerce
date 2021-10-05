import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null,
        }
    }


    runLogin = async(e) => {
        e.preventDefault()
        await this.props.handleLogin(e)
        this.setState({
            redirect:true
        })
    }
    

   

    render() {
        if (this.state.redirect) {
            return <Redirect to='/news' />
        }
        return (
            <>
                <div className='container border border-2 px-5 py-5'>
                    <h2 className="mb-4">Login</h2>
                    <form onSubmit={(e)=>this.runLogin(e)}>
                        <div className="mb-3">
                            <label htmlFor="id_username" className="form-label">Username :</label>
                            <input type="text" name="username" maxLength="150" className="form-control" id="id_username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_password1" className="form-label">Password :</label>
                            <input type="password" name="password1" autoComplete='new-password' maxLength="150" className="form-control" id="id_password1" />
                        </div>
                        <input type='submit' className='btn btn-primary mt-3' value='Submit' />
                    </form>
                </div>
                <div className='mt-2 text-center'>Don't have an account? <Link to="/register" className='text-drecoration-none'>Sign Up</Link></div>
            </>
        )
    }
}
