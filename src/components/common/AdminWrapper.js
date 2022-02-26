import React from 'react';
import clsx from 'clsx';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import jwt_decode from "jwt-decode";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import StoreIcon from '@material-ui/icons/Store';
import StorefrontIcon from '@material-ui/icons/Storefront';
// import Clock from 'react-live-clock';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import CentriqoLogo from '../../images/centriqo_LMS.png';
import homelinkLogo from '../../images/Homelink Logo-Horizontal.png';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#fff !important',
    color: '#000 !important',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: '#000 !important',
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  textHeader: {
    flexGrow: 1,
    textTransform: 'uppercase'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    color: '#eee !important',
    backgroundColor: '#151e6d !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#151e6d !important',
    color: '#eee !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    color: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  iconMenu: {
    color: '#eee',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#1F2937',
    textDecoration: 'none'
  },
  image: {
    display: 'block',
    margin: '0 auto',
    height: '50%'
  },
  logo: {
    paddingTop: '120%'
  }
}));

const AdminWrapper = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const {logout} = props;
  const [open, setOpen] = React.useState(true);
  const {user} = props.authReducer;
  var decoded = jwt_decode(user.token);

  const handleLogout = () => {
    logout();
    history.push('/');
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickEvent = (val) => {
    history.push(`/${val}`);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.textHeader} variant="h5" noWrap>
            {/* <Clock format={'h:mm a'} ticking={true} /> */}
            <img src={CentriqoLogo}  alt="Centriqo White Logo" height="60px" />
          </Typography>
          <img src={homelinkLogo} height={58} alt="Client logo"  />
        </Toolbar>
      </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton style={{color: '#eee'}} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider style={{backgroundColor: '#eee'}} />
          <List>
              {/* DASHBOARD */}
              {(decoded.role === 'Adminstrator') && <React.Fragment>
              <ListItem button onClick={() => handleClickEvent('home')}>
                <ListItemIcon><EqualizerRoundedIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem button onClick={() => handleClickEvent('loan-book')}>
                <ListItemIcon><AssignmentIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Loan Book" />
              </ListItem>
              </React.Fragment>}
              {/* Loan Applications */}
              <ListItem button onClick={() => handleClickEvent('customers')}>
                <ListItemIcon><PermContactCalendarIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Loan Applications" />
              </ListItem>
              <ListItem button onClick={() => handleClickEvent('products')}>
                <ListItemIcon><StoreIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Product Store" />
              </ListItem>
          </List>
          {(decoded.role === 'Adminstrator') && <React.Fragment>
          <Divider style={{backgroundColor: '#eee'}} />
          <List>
              {/* MANAGE MERCHANTS */}
              
              <ListItem button onClick={() => handleClickEvent('manage-clients')}>
                  <ListItemIcon><BusinessRoundedIcon className={classes.iconMenu} /></ListItemIcon>
                  <ListItemText primary="Manage Clients" />
                {/* </Link> */}
              </ListItem>
              {/* ADMINISTRATE USERS */}
              <ListItem button onClick={() => handleClickEvent('manage-agents')}>
                <ListItemIcon><StorefrontIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Administrate Agents" />
              </ListItem>
              <ListItem button onClick={() => handleClickEvent('field-agents')}>
                <ListItemIcon><PeopleRoundedIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Field Agents" />
              </ListItem>
          </List>
          </React.Fragment>}
          <Divider style={{backgroundColor: '#eee'}} />
          <List>
              {/* MANAGE MERCHANTS */}
              <ListItem button onClick={handleLogout}>
                <ListItemIcon><ExitToAppRoundedIcon className={classes.iconMenu} /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
          </List>
        </Drawer>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

AdminWrapper.propTypes = {
  logout: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	authReducer: state.authReducer,
});

export default connect(mapStateToProps, actions)(AdminWrapper);
