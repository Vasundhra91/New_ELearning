import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import { userContext } from 'views/Logincontext'
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import route from "routes.js";
var ps;
//var menuroute =route.filter(function (entry) { return entry.display === true; });

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
     // menuroute: route.filter(function (entry) { return entry.display === true; })
    };
    this.mainPanel = React.createRef();
  }
  static contextType = userContext;

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    console.log("hi2")
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    // const { user } = this.context
    // console.log("hi3")
    // let obj = user;
    // let keys = Object.keys(obj);
    // let name = obj[keys[1]];
    // let adminOruser = obj[keys[5]];
    // console.log(adminOruser)
    // if (adminOruser === "guest") {
    //   this.state.menuroute = route.filter(function (entry) { return entry.display === true });
    // } else if (adminOruser === "Y") {
    //   this.state.menuroute = route.filter(function (entry) { return entry.display === "admin" || entry.display === "both" });
    // } else if (adminOruser === "N") {
    //   this.state.menuroute = route.filter(function (entry) { return entry.display === "user" || entry.display === "both" });
    // }
    // console.log(this.state.menuroute)
    // console.log(route)

    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={route}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {route.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>

      </div>
    );
  }
}

export default Dashboard;
