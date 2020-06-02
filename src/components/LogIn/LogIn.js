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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                tipo: "mailPass",
                email: this.state.mail,
                password: this.state.password
            })
        };
        fetch('https://serene-shelf-10674.herokuapp.com/login', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ token: data }));;
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