import React, {Component} from 'react';

class LogIn extends Component {
    constructor(){
        super();
        this.state = {
            mail : "",
            password : "",
            token: ""
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

    async handleSubmit(event){
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                tipo: "mailPass",
                headers: {'Content-Type': 'application/json', 'API-Key': 'secret'},
                email: this.state.user,
                password: this.state.password
            })
        };
        const response = await fetch('https://serene-shelf-10674.herokuapp.com/login', requestOptions);
        const data = await response.json();
        console.log(response)
    }

    render(){
        return (
            <div>
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

export default LogIn;