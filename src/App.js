import './App.css';
import { connect } from "react-redux";
import * as actions from './store/actions';
import PropTypes from 'prop-types';
import { Router, Route, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import jwt_decode from "jwt-decode";
import AdminWrapper from './components/common/AdminWrapper';
import Customers from './pages/Customer';
import ManagerClients from './pages/ManagerClients';
import ManageAgents from './pages/ManageAgents';
import LoanBook from './pages/LoanBook';
import Products from './pages/Products';
import FieldAgent from './pages/FieldAgent';
import IdleTimer from './utils/IdleTimer';
import React from 'react';

function App(props) {
  const history = useHistory();
  const {authenticated, user} = props.authReducer;
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    if(user){
      var decoded = jwt_decode(user.token);
      setRole(decoded.role)
    }
  }, [user]);
  console.log(role);
  return (
    <div className="App">
      <IdleTimer />
      <Router history={history}>
        <Route path="/home" exact={true} render={props => {
            return (
                ( (authenticated && role === 'Adminstrator') ?
                  <AdminWrapper props={props}>
                    <Home />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/customers" exact={true} render={props => {
            return (
                ( authenticated ?
                  <AdminWrapper props={props}>
                    <Customers />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/products" exact={true} render={props => {
            return (
                ( authenticated ?
                  <AdminWrapper props={props}>
                    <Products />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/loan-book" exact={true} render={props => {
            return (
                ( (authenticated && role === 'Adminstrator') ?
                  <AdminWrapper props={props}>
                    <LoanBook />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/manage-clients" exact={true} render={props => {
            return (
                ( (authenticated && role === 'Adminstrator') ? 
                  <AdminWrapper props={props}>
                    <ManagerClients />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/manage-agents" exact={true} render={props => {
            return (
                ( (authenticated && role === 'Adminstrator') ? 
                  <AdminWrapper props={props}>
                    <ManageAgents />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/field-agents" exact={true} render={props => {
            return (
                ( (authenticated && role === 'Adminstrator') ? 
                  <AdminWrapper props={props}>
                    <FieldAgent />
                  </AdminWrapper>
                  : <Login props={props}/>
                )
              )
            }}
        />
        <Route path="/" exact={true} render={props => {
            return (
                ( 
                  <Login props={props}/>
                )
              )
            }}
        />
      </Router>
    </div>
  );
}

App.propTypes = {
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authReducer: state.authReducer,
});

export default connect(mapStateToProps, actions)(App);
