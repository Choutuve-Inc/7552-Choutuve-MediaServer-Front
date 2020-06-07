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

const API = 'https://choutuve-app-server.herokuapp.com/';
const DEFAULT_QUERY = 'videos';

class Dashboard extends React.Component {

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


    fetch(API + DEFAULT_QUERY, {
      mode: 'cors',
      method: 'GET',
      headers: headers
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


  render() {
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
              <Col lg="12" md="12" sm="12">
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
                      <i className="fas fa-trash" /> Delete video
                  </div>
                  </CardFooter>
                </Card>
              </Col>
            )}

          </Row>

          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-spaceship text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total videos</p>
                        <CardTitle tag="p">1452</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Today
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-spaceship text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total videos</p>
                        <CardTitle tag="p">1452</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Today
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-spaceship text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total videos</p>
                        <CardTitle tag="p">1452</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Today
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-spaceship text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total videos</p>
                        <CardTitle tag="p">1452</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Today
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Statistics</CardTitle>
                  <p className="card-category">User DB</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Activos{" "}
                    <i className="fa fa-circle text-warning" /> Sin videos{" "}
                    <i className="fa fa-circle text-danger" /> Eliminados{" "}
                    {/* <i className="fa fa-circle text-gray" /> Unopened */}
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of users
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Videos/Comentarios por dia</CardTitle>
                  <p className="card-category">Videos/comentarios cargados a la aplicacion</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Videos{" "}
                    <i className="fa fa-circle text-warning" /> Comentarios
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Choutuve info
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
