import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buildingActions } from '../../actions/buildings.actions';
import { push } from 'react-router-redux';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const editRowStyle = {width: 150};

class Buildings extends React.Component {

    constructor(props) {
        super(props);
        this.props.getAll();
    }

    handleEdit(entityId) {
        this.props.dispatch(push('/buildings/' + entityId))
    }

    handleDelete(entityId) {
        console.log(entityId);
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-12" style={{ marginTop: 50 }}>
                    <Table>
                        <TableHeader
                            adjustForCheckbox={false}
                            displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Title</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                                <TableHeaderColumn style={editRowStyle}></TableHeaderColumn>
                                <TableHeaderColumn style={editRowStyle}></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.buildings ? this.props.buildings.map(building => {
                                return (
                                    <TableRow key={building._id}>
                                        <TableRowColumn>{building.title}</TableRowColumn>
                                        <TableRowColumn>{building.description}</TableRowColumn>
                                        <TableRowColumn style={editRowStyle}><RaisedButton label="Edit" primary={true} onClick={event => this.handleEdit(building._id)} /></TableRowColumn>
                                        <TableRowColumn style={editRowStyle}><RaisedButton label="Delete" secondary={true} onClick={event => this.handleEdit(building._id)} /></TableRowColumn>
                                    </TableRow>
                                );
                            }) : 'There are no added buildings'}
                        </TableBody>
                    </Table>
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
        getAll: () => dispatch(buildingActions.getAll())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buildings);