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

const API = 'https://arcane-thicket-79100.herokuapp.com/';
const DEFAULT_QUERY = 'videos';
const DELETE_QUERY = 'videos';

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
    }
  
    handleClick = itemId => {
      const requestOptions = {
        method: 'DELETE'
      };
  
      fetch(API + DELETE_QUERY + "/" + itemId, requestOptions).then((response) => {
        if (response.status == 200) {
          this.componentDidMount()
        }
        return response;
        
      }).then((result) => {
      });
    }
  
    render() {
      if (localStorage.getItem('token') === null){
        return (
          <Redirect to="login"></Redirect>
        );
      }
      return (
        <>
          <div className="content">
            <Row>  
                <Card>
                    <CardTitle>Hola</CardTitle>
                </Card>
            </Row>
          </div>
        </>
      );
    }
  }
  
  export default Users;