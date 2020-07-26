import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

import { Route, Redirect } from "react-router";

const API = 'https://serene-shelf-10674.herokuapp.com';
const DEFAULT_QUERY = '/users';

class Users extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isLoaded: false,
        items: [],
      };
    }
  
    componentDidMount() {
      let headers = new Headers();
  
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('token',localStorage.getItem('token'));
      fetch(API + DEFAULT_QUERY, {
        mode: 'cors',
        method: 'GET',
        headers: headers,
      }).then((response) => {
        if (response.status == 200) {
        }
        return response.json();
        
      }).then((result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
        console.log("los Usuarios son: ",result)
      });
    }
  
    handleClick = itemId => {
      console.log("se borra el item: ", itemId)
      /*const requestOptions = {
        method: 'DELETE'
      };
  
      fetch(API + DEFAULT_QUERY + "/" + itemId, requestOptions).then((response) => {
        if (response.status == 200) {
          this.componentDidMount()
        }
        return response;
        
      }).then((result) => {
      });*/
    }
  
    render() {
      if (localStorage.getItem('token') === null){
        return (
          <Redirect to="login"></Redirect>
        );
      }
      const { items } = this.state;
      return (
        <>
          <div className="content">
          {items.map(item =>
            <Col lg="12" md="12" sm="12" key={item.uid}>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4">
                        <div className="numbers">
                          <CardTitle tag="p">{item.displayName}</CardTitle>
                          <p className="card-category">Mail: {item.email}</p>
                          <p className="card-category">Phone number: {item.phoneNumber}</p>
                        </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                    <hr />
                    <div className="stats">
                      {console.log('id a borrar', item.id)}
                      <button className="btn btn-danger" onClick={() => { this.handleClick(item.uid) }}>
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </CardFooter>
              </Card>
            </Col>
          )}
          </div>
        </>
      );
    }
  }
  
  export default Users;