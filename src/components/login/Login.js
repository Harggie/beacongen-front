import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../actions/users.actions';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const paperStyle = {
	padding: 50,
	margin: "50px auto",
	maxWidth: 350,
}


class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { username, password } = this.state;
		const { dispatch } = this.props;
		if (username && password) {
			dispatch(userActions.login(username, password));
		}
	}

	render() {
		const { username, password } = this.state;

		return (
			<div class="col-sm-12">
				<Paper style={paperStyle} zDepth={4}>
					<form name="form" onSubmit={this.handleSubmit}>
						<TextField
							name="username"
							hintText="Enter your Username"
							value={username}
							floatingLabelText="Username"
							onChange={this.handleChange}
						/><br />
						<TextField
							name="password"
							type="password"
							hintText="Enter your Password"
							value={password}
							floatingLabelText="Password"
							onChange={this.handleChange}
						/><br />
						<RaisedButton label="Login" primary={true} type="submit" />
					</form>
				{this.props.error}
				</Paper>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	error: state.login.error
})

export default connect(
	mapStateToProps
)(Login)