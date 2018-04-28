import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { userActions } from '../../actions/users.actions';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const menuButtonStyle = {
    color: "#FFF",
    fontWeight: "bold"
}

const handleLogout = props => {
    props.logout();
    props.dispatch(push('/'));
}

const Menu = (props) => (
    <AppBar
        title={"Heatmap generator"}
        iconElementLeft = {
            <span></span>
        }
        iconElementRight={
            <div className="appbar-buttons">
                <Link to="/"><FlatButton style={menuButtonStyle} label="Home" /></Link>
                <Link hidden={props.loggedIn} to="/login"><FlatButton style={menuButtonStyle} label="Login" /></Link>
                <Link hidden={!props.loggedIn} to="/buildings"><FlatButton style={menuButtonStyle} label="Buildings" /></Link>
                <FlatButton hidden={!props.loggedIn} style={menuButtonStyle} label="Logout" onClick={(event) => handleLogout(props)} />
            </div>
        }
    />
)

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        logout: () => dispatch(userActions.logout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);