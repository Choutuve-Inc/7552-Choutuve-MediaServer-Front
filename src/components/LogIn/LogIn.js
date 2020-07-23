import React, {Component} from 'react';
import { Route, Redirect } from "react-router";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
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
        let req = { 
            tipo: 'admin',
            email: this.state.email,
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
                    console.log("login")
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
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handleChange}/>
                        </FormGroup>
                        <Button onClick={()=>this.handleSubmit()}>Submit</Button>
                    </Form>
                </div>
            );
        }
    }
}

export default LogIn;

/*

<form onSubmit={this.handleSubmit}>
                        <Card>
                            <CardTitle>
                                Mail:
                            </CardTitle>
                            <CardBody>
                                <input type="text" name="mail" onChange={this.handleChange}/>
                            </CardBody>
                            <CardTitle>
                                Pasword:
                            </CardTitle>
                            <CardBody>
                                <input type="text" name="password" onChange={this.handleChange}/>
                            </CardBody>
                            <input type="submit" value="Log In" />
                        </Card>
                    </form>

*/