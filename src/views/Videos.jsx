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

const API = 'https://choutuve-app-server.herokuapp.com/';
const DEFAULT_QUERY = 'videos';

class Videos extends React.Component {

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
    headers.append('token',localStorage.getItem('token'))
    // headers.append('Authorization', 'Basic');
    // headers.append('Origin','http://localhost:3000');

    // fetch(API + DEFAULT_QUERY, {
    //   mode: 'cors',
    //   method: 'GET',
    //   headers: headers
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.log('Authorization failed : ' + error.message));

    console.log(localStorage.getItem('token'))
    fetch(API + DEFAULT_QUERY, {
      mode: 'cors',
      method: 'GET',
      headers: headers,
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
          console.log("son estos", result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("API Error: ", error)

        }
      )
  }

  handleClick = itemId => {
    const requestOptions = {
      method: 'DELETE'
    };

    fetch(API + DEFAULT_QUERY + "/" + itemId, requestOptions).then((response) => {
      if (response.status == 200) {
        this.componentDidMount()
      }
      return response.json();
      
    }).then((result) => {
      // Something
    });
  }

  render() {
    if (localStorage.getItem('token') == null){
      return (
        <Route exact path="/">

        </Route>
      );
    }
    const { items } = this.state;
    console.log(items[0])
    return (

      <>
        <div className="content">

          <Row>

            {items.map(item =>
              // <li key={item.objectID}>
              //   <a href={item.url}>{item.title}</a>
              // </li>
              <Col lg="12" md="12" sm="12" key={item.objectID}>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4">
                        <div className="numbers">
                          <CardTitle tag="p">{item.title}</CardTitle>
                          <p className="card-category">Description: {item.description}</p>
                        </div>
                      </Col>

                      <Col md="5">
                        <div className="numbers">
                          <p className="card-category">User: {item.user}</p>
                          <p className="card-category">URL: {item.url}</p>
                          <p className="card-category">Date: {item.date}</p>
                          <p className="card-category">Id: {item.id}</p>
                          <p className="card-category">Size: {item.size}</p>
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-spaceship text-warning" />
                        </div>
                      </Col>

                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {console.log('id a borrar', item.id)}
                      <button className="btn btn-danger" onClick={() => { this.handleClick(item.id) }}>
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            )}

          </Row>
        </div>
      </>
    );
  }
}

export default Videos;
