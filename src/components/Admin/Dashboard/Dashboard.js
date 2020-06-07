import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { checkAuthentication } from "../../../redux/actions/admin/authenticationActions";

import Navigation from "../Navigation";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard(props) {

  console.log(props);
  const isLogged = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).isLogged : false;
  if (!isLogged) {
      return <Redirect to="/admin/login" />;
  }
  return (
    <Row className="Dashboard">
      <Navigation />
      <Col className="main-content">{props.children}</Col>
    </Row>
  );
}

export default connect(
  null,
  null
)(Dashboard);
