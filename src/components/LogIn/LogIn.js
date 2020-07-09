import React, {Component} from 'react';
import { Route, Redirect } from "react-router";

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            mail : '',
            password : '',
            tipo: 'mailPass',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const { value,name } = event.target;
        this.setState({
            [name]: value
        });
        
    }
    

    handleSubmit(event){
        event.preventDefault();
        let req = { 
            tipo: 'admin',
            email: this.state.mail,
            password: this.state.password
        };
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req)
        };
        fetch('https://choutuve-app-server.herokuapp.com/login', requestOptions)
            .then(res => {
                if (res.status === 200){
                    return res.text();
                } else {
                    return null;
                }
            })
            .then((data) => {
                if(data){
                    localStorage.setItem('token',data)
                    this.props.history.push({
                        pathname: '/admin/dashboard',
                        state: {token: data}
                    })
                } 
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    render(){
        if (localStorage.getItem('token')){
            return (
                <Redirect to="admin/dashboard"></Redirect>
              );
        } else {
            return (
                <div className="content">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>
                                Mail:
                                <input type="text" name="mail" onChange={this.handleChange}/>
                            </label>
                        </div>
                        <div>
                            <label>
                                Pasword:
                                <input type="text" name="password" onChange={this.handleChange}/>
                            </label>
                        </div>
                        <input type="submit" value="Log In" />
                    </form>
                </div>
            );
        }
    }
}

export default LogIn;