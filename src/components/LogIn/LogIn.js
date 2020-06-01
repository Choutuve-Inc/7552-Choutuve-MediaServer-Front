import React, {Component} from 'react';

class LogIn extends Component {
    constructor(){
        super();
        this.state = {
            user : "",
            pasword : ""
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
        console.log('sending ..')
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            User:
                            <input type="text" name="user" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Pasword:
                            <input type="text" name="pasword" onChange={this.handleChange}/>
                        </label>
                    </div>
                    <input type="submit" value="Log In" />
                </form>
            </div>
        );
    }
}

export default LogIn;