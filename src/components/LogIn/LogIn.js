import React, {Component} from 'react';

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
            tipo: 'mailPass',
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
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.props.history.push('/admin/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
        
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