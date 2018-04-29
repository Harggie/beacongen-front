import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { floorActions } from '../../actions/floors.actions';
import { push } from 'react-router-redux';
import Grid from '../shared/Grid';

class Floors extends React.Component {

    constructor(props) {
        super(props);
        this.props.getAll(props.buildingId);

        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    }

    handleNew() {
        this.props.dispatch(push('/floors/new?building_id=' + this.props.buildingId));
    }

    handleEdit(entityId) {
        this.props.dispatch(push('/floors/floor/' + entityId))
    }

    handleDelete(entityId) {
        this.props.remove(entityId);
    }

    render() {
        return (
            <div>
                <h4>Floors list</h4>
                {this.props.floors ? 
                    <Grid
                        columnsHeaders={['Title', 'Description']}
                        columnsProperties={['title', 'description']}
                        showEdit={true}
                        showDelete={true}
                        entities={this.props.floors}
                        createHandler={this.handleNew}
                        editHandler={this.handleEdit}
                        deleteHandler={this.handleDelete}
                    /> : 'There are no added floors'}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    floors: state.floors.entities,
    error: state.floors.error
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        getAll: (buildingId) => dispatch(floorActions.getAll(buildingId)),
        remove: (id) => dispatch(floorActions.remove(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Floors);