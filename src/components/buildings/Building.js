import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildingActions } from '../../actions/buildings.actions';

import Floors from '../floors/Floors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Building extends React.Component {

    constructor(props) {
        super(props);

        if (!this.isNewRecord()) {
            this.props.getSingle(this.props.match.params.id);
        }

        this.state = {
            title: '',
            description: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.building) {
            this.setState({
                title: props.building.title,
                description: props.building.description
            });
        }
    }

    isNewRecord() {
        return this.props.match.path === '/buildings/new';
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.isNewRecord()) {
            this.props.createNew(this.state);
        } else {
            this.props.update(this.props.match.params.id, this.state);
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {

        const { title, description } = this.state;

        return (
            <div className="container">
                <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-sm-12">
                        <h1>{this.isNewRecord() ? 'Building creation' : 'Building edit'}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <TextField
                                name="title"
                                hintText="Building title"
                                value={title}
                                floatingLabelText="Title"
                                onChange={this.handleChange}
                            /><br />
                            <TextField
                                name="description"
                                hintText="Building description"
                                value={description}
                                floatingLabelText="Description"
                                onChange={this.handleChange}
                                multiLine={true}
                                rows={3}
                            /><br />
                            <RaisedButton label="Save" primary={true} type="submit" />
                        </form>
                        {this.props.error}
                    </div>
                    <div className="col-sm-12 col-md-8">
                        {this.props.match.params.id ? <Floors buildingId={this.props.match.params.id} /> : 'To display floors save building first'}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    building: state.buildings.entity,
    error: state.buildings.error
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getSingle: buildingActions.getSingle,
        createNew: buildingActions.createNew,
        update: buildingActions.update
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Building);