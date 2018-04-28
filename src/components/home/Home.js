import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Home = props => (

  <div className="container">
    <div className="col-sm-12">
      <div className="jumbotron" style={{marginTop: 50, width: "100%"}}>
        <h1>Hello, {props.user ? props.user.username : "anonymous"}!</h1>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.login.user
});

export default connect(
  mapStateToProps
)(Home);