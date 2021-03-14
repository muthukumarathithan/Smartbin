import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";


// pages
import Dashboard from "../../pages/dashboard";
import CustomerDashboard from "../../pages/customer-dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Devices from "../../pages/devices";
import Fences from "../../pages/fences";
import Customers from "../../pages/customers";
import Drivers from "../../pages/drivers";
import Dealers from "../../pages/dealers";
import Distributors from "../../pages/distributors";
import Vehicles from "../../pages/vehicles";
import Bins from "../../pages/bins";
import Zones from "../../pages/zone";
import Districts from "../../pages/district";
import Wards from "../../pages/ward";
import Vehicletypes from "../../pages/vehicletype";
import Houses from "../../pages/house";
import Supervisors from "../../pages/supervisor";
import Employees from "../../pages/employees";
import BasicReports from "../../pages/basic";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/customer-dashboard" component={CustomerDashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/devices" component={Devices} />
              <Route path="/app/customers" component={Customers} />
              <Route path="/app/dealers" component={Dealers} />
              <Route path="/app/distributors" component={Distributors} />
              <Route path="/app/vehicles" component={Vehicles} />
              <Route path="/app/bins" component={Bins} />
              <Route path="/app/zone" component={Zones} />
              <Route path="/app/district" component={Districts} />
              <Route path="/app/ward" component={Wards} />
              <Route path="/app/vehicletype" component={Vehicletypes} />
              <Route path="/app/house" component={Houses} />
              <Route path="/app/supervisor" component={Supervisors} />
              <Route path="/app/drivers" component={Drivers} />
              <Route path="/app/fences" component={Fences} />
              <Route path="/app/employees" component={Employees} />
              <Route path="/app/reports/basic" component={BasicReports} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
