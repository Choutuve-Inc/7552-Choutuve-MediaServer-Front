import Dashboard from "views/Dashboard.jsx"
import Videos from "views/Videos.jsx"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "nc-icon nc-camera-compact",
    component: Videos,
    layout: "/admin"
  },
];
export default routes;
