import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildingActions } from '../../actions/buildings.actions';

import RaisedButton from 'material-ui/RaisedButton';

class Building extends React.Component {

    constructor(props) {
        super(props);
        this.props.getSingle(this.props.match.params.id);
    }

    handleSubmit(data) {
        console.log(data);
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-12" style={{ marginTop: 50 }}>
                    <p>Title: {this.props.building ? this.props.building.title : ''}</p>
                    <p>Description: {this.props.building ? this.props.building.description : ''}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    building: state.buildings.entity
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getSingle: buildingActions.getSingle,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Building);