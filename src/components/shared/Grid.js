import React from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { red500, blue500, greenA200, green500 } from 'material-ui/styles/colors';

const buttonColStyle = {
    width: 50,
    cursor: 'pointer'
};

// const exampleProps = {
//     columnsHeaders: ['Title', 'Description'],
//     columnsProperties: ['title', 'description'],
//     showEdit: true,
//     showDelete: true,
//     entities: [],
//     editHandler: () => { },
//     deleteHandler: () => { },
// }

const Grid = (props) => (
    <Table>
        <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}>
            <TableRow>
                {props.columnsHeaders ? props.columnsHeaders.map(header => {
                    return (
                        <TableHeaderColumn>{header}</TableHeaderColumn>
                    );
                }) : 'columnHeaders not defined'}
                {props.showEdit ? <TableHeaderColumn style={buttonColStyle}></TableHeaderColumn> : ''}
                {props.showDelete ? <TableHeaderColumn style={buttonColStyle}><ContentAddCircle style={{ cursor: 'pointer'}} color={green500} hoverColor={greenA200} onClick={event => props.createHandler()} /></TableHeaderColumn> : ''}
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {props.entities ? props.entities.map(entity => {
                return (
                    <TableRow key={entity._id}>
                        {props.columnsProperties ? props.columnsProperties.map(property => {
                            return (
                                <TableRowColumn>{entity[property]}</TableRowColumn>
                            );
                        }) : 'columnProperties not defined'}
                        {props.showEdit ? <TableRowColumn style={buttonColStyle}><EditorModeEdit color={blue500} hoverColor={greenA200} onClick={event => props.editHandler(entity._id)} /></TableRowColumn> : ''}
                        {props.showDelete ? <TableRowColumn style={buttonColStyle}><ActionDelete color={red500} hoverColor={greenA200} onClick={event => props.deleteHandler(entity._id)} /></TableRowColumn> : ''}
                    </TableRow>
                );
            }) : 'entities not defined'}
        </TableBody>
    </Table>
);

export default Grid;