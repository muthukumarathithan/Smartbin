import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  SettingsInputAntenna as FenceIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  InsertInvitation as DeviceHubIcon,
  SupervisedUserCircle as CustomerIcon,
  SupervisorAccount as DistributorIcon,
  PersonPin as DealerIcon,
  Assessment as DailyIcon,
  Assignment as WeeklyIcon,
  AssignmentLate as MonthlyIcon,
  Commute as VehicleIcon,
  People as EmployeeIcon,
  EmojiTransportation as TripIcon,
  BarChart as PerformanceIcon,
  DeleteSweep as BinIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from 'react-redux';
import decode from 'jwt-decode';



// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";



function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
  var user_type = '';
  
    try {
      const user = decode(localStorage.token);
      user_type = user.user_type;
    } catch (error) {
        alert(error)
    }
  
  const structure = [
    { 
      id: 0,
      label: "Dashboard", 
      link: user_type === 4 ? '/app/customer-dashboard' : '/app/dashboard',
      icon: <HomeIcon />
     },
    { id: 1, label: "Devices", link: "/app/devices", icon: <DeviceHubIcon /> },
    { id: 2, 
      label: "Distributors", 
      hidden: user_type === 1 ? false : true, 
      link: "/app/distributors",
      icon: <DistributorIcon />
     },
    {
       id: 3, 
      label: "Dealers",
      hidden: user_type === 1 || user_type === 2  ? false : true, 
      link: "/app/dealers",
      icon: <DealerIcon /> 
      },
    {
      id: 4, 
      label: "Customers",
      hidden: user_type !== 1  ? false : true, 
      link: "/app/customers",
      icon: <CustomerIcon /> 
      },  
      {
        id: 5, 
        label: "Vehicles",
        hidden: user_type === 1  ? false : true, 
        link: "/app/vehicles",
        icon: <VehicleIcon /> 
        },
        {
          id: 6, 
          label: "Bins",
          hidden: user_type === 1  ? false : true, 
          link: "/app/bins",
          icon: <BinIcon /> 
          },
        {
          id: 5, 
          label: "Drivers",
          hidden: user_type === 1  ? false : true, 
          link: "/app/drivers",
          icon: <EmployeeIcon /> 
          },  
      {
        id: 6, 
        label: "Fences",
        hidden: user_type === 1  ? false : true, 
        link: "/app/fences",
        icon: <FenceIcon /> 
        },
         {
        id: 5, 
        label: "Ward",
        hidden: user_type === 1  ? false : true, 
        link: "/app/ward",
        icon: <DeviceHubIcon /> 
        },
        {
        id: 6, 
        label: "VehicleType",
        hidden: user_type === 1  ? false : true, 
        link: "/app/vehicletype",
        icon: <VehicleIcon/> 
        },
        {
        id: 6, 
        label: "House",
        hidden: user_type === 1  ? false : true, 
        link: "/app/house",
        icon: <LibraryIcon /> 
        }, 
         {
        id: 5, 
        label: "Supervisor",
        hidden: user_type === 1  ? false : true, 
        link: "/app/supervisor",
        icon: <SupportIcon /> 
        },
         {
        id: 6, 
        label: "District",
        hidden: user_type === 1  ? false : true, 
        link: "/app/district",
        icon: <ArrowBackIcon /> 
        },
        {
        id: 5, 
        label: "Zone",
        hidden: user_type === 1  ? false : true, 
        link: "/app/zone",
        icon: <FAQIcon /> 
        }, 
        {
        id: 5, 
        label: "Employee",
        hidden: user_type === 1  ? false : true, 
        link: "/app/employees",
        icon: <FAQIcon /> 
        },     
    { id: 6, type: "divider" },
    { id: 7, type: "title", label: "REPORTS" },
    {
      id: 8,
      label: "Basic Reports",
      link: "/app/ui",
      hidden: user_type === 1  ? false : true, 
      icon: <DailyIcon />,
      children: [
        { label: "Ping Report", link: "/app/reports/basic/ping" },
        { label: "Distance Report", link: "/app/reports/basic/distance" },
        { label: "Idle Report", link: "/app/reports/basic/idle" },
        { label: "Vehicle Health Report", link: "/app/reports/basic/health" },
        { label: "Overspeed Report", link: "/app/reports/basic/overspeed" },
        { label: "Runtime Report", link: "/app/reports/basic/runtime" },
      ],
    },
    {
      id: 9,
      label: "Trip Reports",
      link: "/app/ui",
      hidden: user_type === 1  ? false : true, 
      icon: <TripIcon />,
      children: [
        { label: "Trip Trip Report", link: "/app/customer-dashboard" },
        { label: "Total Trip Report", link: "/app/customer-dashboard" },

      ],
    },
    {
      id: 9,
      label: "Performance Reports",
      link: "/app/ui",
      hidden: user_type === 1  ? false : true, 
      icon: <PerformanceIcon />,
      children: [
        { label: "Vehicle Performance", link: "/app/customer-dashboard" },

      ],
    },
    { id: 7, label: "Daily Report", link: "", icon: <DailyIcon />,  hidden: user_type !== 4  ? false : true, },
    { id: 8, label: "Weekly Report", link: "", icon: <WeeklyIcon />,  hidden: user_type !== 4  ? false : true, },
    { id: 9, label: "Monthly Report", link: "", icon: <MonthlyIcon />,  hidden: user_type !== 4  ? false : true,},
    { id: 10, type: "divider" },
    
  ];

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
