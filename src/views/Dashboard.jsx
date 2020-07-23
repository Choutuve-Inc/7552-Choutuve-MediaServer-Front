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
const VIDEOS_PER_DAY = '/metrics/videos/day';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      videosMasPopulares:[],
      videosMostDislike:[],
      userActivity:[],
      videosPerDay:[]
    };
    this.getVideosMasPopulares = this.getVideosMasPopulares.bind(this);
    this.getVideosDisliked = this.getVideosDisliked.bind(this);
    this.getActiveUsers = this.getActiveUsers.bind(this);
    this.getVideosPerDay = this.getVideosPerDay.bind(this);
  }

  componentWillMount(){
    this.getVideosMasPopulares();
    this.getVideosDisliked();
    this.getActiveUsers();
    this.getVideosPerDay();
  }

  componentDidMount() {
    
  }

  getVideosPerDay(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(MEDIA_SERVER + VIDEOS_PER_DAY, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            videosPerDay: result
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
          this.setState({
            userActivity: result
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
          this.setState({
            videosMasPopulares: result
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
          this.setState({
            videosMostDislike: result
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
            <Col>
              {
                (data.length>0) ?
                <Card>
                <CardHeader>
                  <CardTitle tag="h5">Videos Mas pupulares</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={data} x="title" y="likes"></VictoryBar>
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
                    <VictoryBar data={this.state.videosMostDislike} x="title" y="dislikes"></VictoryBar>
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
                    <VictoryBar data={this.state.userActivity} x="user" y="activity"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
            </Col>
          </Row>
          <Row>
            <Col>
              {
                (this.state.videosPerDay.length>0) ?
                <Card>
                <CardHeader>
                  <CardTitle tag="h5">Videos Mas pupulares</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={this.state.videosPerDay} x="date" y="cant"></VictoryBar>
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
