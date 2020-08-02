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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryZoomContainer, VictoryAxis } from 'victory';


const MEDIA_SERVER = 'https://arcane-thicket-79100.herokuapp.com/';
const POPULAR_VIDEOS = '/metrics/videos/likes';
const HATED_VIDEO = '/metrics/videos/dislikes';
const ACTIVE_USERS = '/metrics/users/activity';
const VIDEOS_PER_DAY = '/metrics/videos/day';
const AUTH_SERVER = 'https://serene-shelf-10674.herokuapp.com';
const JOIN_PER_DAY = '/data/join';
const LAST_SEEN = '/data/seen';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      videosMasPopulares:[],
      videosMostDislike:[],
      userActivity:[],
      videosPerDay:[],
      joinPerDay:[],
      cantLogins:[]
    };
    this.getVideosMasPopulares = this.getVideosMasPopulares.bind(this);
    this.getVideosDisliked = this.getVideosDisliked.bind(this);
    this.getActiveUsers = this.getActiveUsers.bind(this);
    this.getVideosPerDay = this.getVideosPerDay.bind(this);
    this.getJoinPerDay = this.getJoinPerDay.bind(this);
    this.getLastSeen = this.getLastSeen.bind(this);
  }

  componentWillMount(){
    this.getVideosMasPopulares();
    this.getVideosDisliked();
    this.getActiveUsers();
    this.getVideosPerDay();
    this.getJoinPerDay();
    this.getLastSeen();
  }

  componentDidMount() {
    
  }

  getLastSeen(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(AUTH_SERVER + LAST_SEEN, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            cantLogins: result
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

  getJoinPerDay(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(AUTH_SERVER + JOIN_PER_DAY, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            joinPerDay: result
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
          let res =  result.sort((a,b)=> {
            return new Date(a['date']) - new Date(b['date']);
          })
          this.setState({
            videosPerDay: res
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
    const data = this.state.videosMasPopulares;
    return (
      <>
        <div className="content">
              {
                (data.length>0) ?
                <Card style={{ width: '80%', margin: '0 auto' }}>
                <CardHeader>
                  <CardTitle tag="h5">Videos Mas pupulares</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material} size={1}>
                    <VictoryBar data={data} x="title" y="likes"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
              {
                (this.state.videosMostDislike.length>0) ?
                <Card style={{ width: '80%', margin: '0 auto', height:'80%'  }}>
                <CardHeader>
                  <CardTitle tag="h5">Videos mas odiados</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={this.state.videosMostDislike} x="title" y="dislikes"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
              {
                (this.state.userActivity.length>0) ?
                <Card  style={{ width: '80%', margin: '0 auto', height:'80%'  }}>
                <CardHeader>
                  <CardTitle tag="h5">Actividad de los Usuarios</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryBar data={this.state.userActivity} x="user" y="activity"></VictoryBar>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
              {
                (this.state.videosPerDay.length>0) ?
                <Card style={{ width: '80%', margin: '0 auto', height:'80%'  }}>
                <CardHeader>
                  <CardTitle tag="h5">Videos Por dia</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart theme={VictoryTheme.material} >
                    <VictoryLine data={this.state.videosPerDay} x="date" y="cant"></VictoryLine>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
              {
                (this.state.joinPerDay.length>0) ?
                <Card style={{ width: '80%', margin: '0 auto', height:'80%'  }}>
                <CardHeader>
                  <CardTitle tag="h5">Cantidad de usuarios nuvos por dia</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine data={this.state.joinPerDay} x="fecha" y="cant"></VictoryLine>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
              {
                (this.state.cantLogins.length>0) ?
                <Card style={{ width: '80%', margin: '0 auto', height:'80%'  }}>
                <CardHeader>
                  <CardTitle tag="h5">Cantidad de logins por dia</CardTitle>
                </CardHeader>
                <CardBody>
                  <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine data={this.state.cantLogins} x="fecha" y="cant"></VictoryLine>
                  </VictoryChart>
                </CardBody>
              </Card>: null
              }
        </div>
      </>
    );
  }
}

export default Dashboard;
