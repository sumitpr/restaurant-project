import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { checkAuthentication } from "../../redux/actions/authenticationActions";

// import Navigation from "../Navigation";

import "./index.css";
import "./App.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App(props) {
  useEffect(() => {
    document.title = "Restaurant";
  }, []);
  /*

  if (props.authentication.isLogged === null) {
    return <div>Loading...</div>;
  }

  if (props.authentication.isLogged === false) {
    return <Redirect to="/login" />;
  }*/
  if(!localStorage.getItem("username")) {
    return <Redirect to="/login" />;
  }
  return (
    <Row className="App">
      <Col className="main-content">{props.children}</Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

export default connect(mapStateToProps)(App);
