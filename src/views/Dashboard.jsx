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
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme  } from 'victory';

const API = 'https://choutuve-app-server.herokuapp.com/';
const DEFAULT_QUERY = 'feed';
const MEDIA_SERVER = 'https://arcane-thicket-79100.herokuapp.com/';
const POPULAR_VIDEOS = '/metrics/videos/likes';
const HATED_VIDEO = '/metrics/videos/dislikes';
const ACTIVE_USERS = '/metrics/users/activity';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      videosMasPopulares:[],
      videosMostDislike:[],
      userActivity:[]
    };
    this.getVideosMasPopulares = this.getVideosMasPopulares.bind(this);
    this.getVideosDisliked = this.getVideosDisliked.bind(this);
    this.getActiveUsers = this.getActiveUsers.bind(this);
  }

  componentWillMount(){
    this.getVideosMasPopulares();
    this.getVideosDisliked();
    this.getActiveUsers();
  }

  componentDidMount() {
    
  }

  getActiveUsers(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(MEDIA_SERVER + ACTIVE_USERS, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          let res = [];
          for (let item of result){
            res.push({UserName:item[0], activity:item[1]})
          }
          this.setState({
            userActivity: res
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          //console.log("API Error: ", error)
        }
      )
  }

  getVideosMasPopulares(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(MEDIA_SERVER + POPULAR_VIDEOS, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          let res = [];
          for (let item of result){
            res.push({name:item[0], likes:item[1]})
          }
          this.setState({
            videosMasPopulares: res
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          //console.log("API Error: ", error)
        }
      )
  }

  getVideosDisliked(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(MEDIA_SERVER + HATED_VIDEO, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          let res = [];
          for (let item of result){
            res.push({name:item[0], dislikes:item[1]})
          }
          this.setState({
            videosMostDislike: res
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          //console.log("API Error: ", error)
        }
      )
  }


  render() {
    if (localStorage.getItem('token') === null){
      return (
        <Redirect to="login"></Redirect>
      );
    }
    //const { items } = this.state;
    //console.log(items[0])
    //data={data} x="name" y="likes"
    const data = this.state.videosMasPopulares;
    return (
      <>
        <div className="content">
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
          <Row>
            <Col>
              {
                (data.length>0) ?
                <Card>
                <CardHeader>
                  <CardTitle tag="h5">Videos Mas pupulares</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={data} x="name" y="likes"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
            </Col>
          </Row>
          <Row>
            <Col>
              {
                (this.state.videosMostDislike.length>0) ?
                <Card>
                <CardHeader>
                  <CardTitle tag="h5">Videos Mas pupulares</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={this.state.videosMostDislike.length} x="name" y="dislikes"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
            </Col>
          </Row>
          <Row>
            <Col>
              {
                (this.state.userActivity.length>0) ?
                <Card>
                <CardHeader>
                  <CardTitle tag="h5">Videos Mas pupulares</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={this.state.userActivity} x="UserName" y="activity"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
