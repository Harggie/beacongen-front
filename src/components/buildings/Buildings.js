import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildingActions } from '../../actions/buildings.actions';
import { push } from 'react-router-redux';
import Grid from '../shared/Grid';

class Buildings extends React.Component {

    constructor(props) {
        super(props);
        this.props.getAll();

        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleNew() {
        this.props.dispatch(push('/buildings/new'));
    }

    handleEdit(entity) {
        this.props.dispatch(push('/buildings/building/' + entity._id))
    }

    handleDelete(entity) {
        this.props.remove(entity._id);
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-sm-12">
                        <h1>Buildings list</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12" style={{ marginTop: 50 }}>
                        {this.props.buildings ?
                            <Grid
                                columnsHeaders={['Title', 'Description']}
                                columnsProperties={['title', 'description']}
                                showEdit={true}
                                showDelete={true}
                                entities={this.props.buildings}
                                createHandler={this.handleNew}
                                editHandler={this.handleEdit}
                                deleteHandler={this.handleDelete}
                            /> : 'There are no added buildings'}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    buildings: state.buildings.entities
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        getAll: () => dispatch(buildingActions.getAll()),
        remove: (id) => dispatch(buildingActions.remove(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buildings);