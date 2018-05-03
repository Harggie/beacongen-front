import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { floorActions } from '../../actions/floors.actions';
import queryString from 'query-string';

import Floors from '../floors/Floors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Map from '../map/Map';

class Floor extends React.Component {

    constructor(props) {
        super(props);

        if (!this.isNewRecord()) {
            this.props.getSingle(this.props.match.params.id);
        }

        this.state = {
            title: '',
            description: '',
            res_horizontal: '',
            res_vertical: '',
            scale_horizontal: '',
            scale_vertical: '',
            svg_path: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.floor) {
            this.setState({
                title: props.floor.title,
                description: props.floor.description,
                res_horizontal: props.floor.res_horizontal,
                res_vertical: props.floor.res_vertical,
                scale_horizontal: props.floor.scale_horizontal,
                scale_vertical: props.floor.scale_vertical,
                svg_path: props.floor.svg_path
            });
        }
    }

    isNewRecord() {
        return this.props.match.path === '/floors/new';
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.isNewRecord()) {
            let building_id = queryString.parse(this.props.location.search).building_id;
            this.props.createNew(Object.assign(this.state, { building_id: building_id }));
        } else {
            this.props.update(this.props.match.params.id, this.state);
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleUpload(e) {
        this.props.upload(this.props.match.params.id, e.target.files[0])
    }

    render() {

        const {
            title,
            description,
            res_horizontal,
            res_vertical,
            scale_horizontal,
            scale_vertical,
            svg_path
        } = this.state;

        return (
            <div className="container">
                <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-sm-12">
                        <h1>{this.isNewRecord() ? 'Floor creation' : 'Floor edit'}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <TextField
                                name="title"
                                hintText="Floor title"
                                value={title}
                                floatingLabelText="Title"
                                onChange={this.handleChange}
                            /><br />
                            <TextField
                                name="description"
                                hintText="Floor description"
                                value={description}
                                floatingLabelText="Description"
                                onChange={this.handleChange}
                                multiLine={true}
                                rows={3}
                            /><br />
                            <TextField
                                name="res_horizontal"
                                hintText="Resolution"
                                value={res_horizontal}
                                floatingLabelText="Horizontal resolution"
                                onChange={this.handleChange}
                            /><br />
                            <TextField
                                name="res_vertical"
                                hintText="Resolution"
                                value={res_vertical}
                                floatingLabelText="Vertical resolution"
                                onChange={this.handleChange}
                            /><br />
                            <TextField
                                name="scale_horizontal"
                                hintText="Scale"
                                value={scale_horizontal}
                                floatingLabelText="Horizontal scale"
                                onChange={this.handleChange}
                            /><br />
                            <TextField
                                name="scale_vertical"
                                hintText="Scale"
                                value={scale_vertical}
                                floatingLabelText="Vertical scale"
                                onChange={this.handleChange}
                            /><br />
                            <RaisedButton label="Save" primary={true} type="submit" />
                        </form>
                        {this.props.error}
                    </div>
                    <div className="col-sm-12 col-md-8">
                        {!svg_path &&
                            <div>
                                <label htmlFor="map_file">Upload SVG map</label><br />
                                <input name="map_file" type="file" onChange={event => this.handleUpload(event)} />
                            </div>
                        }
                        <Map imgUrl={'http://localhost:8081' + svg_path} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    floor: state.floors.entity,
    error: state.floors.error
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getSingle: floorActions.getSingle,
        createNew: floorActions.createNew,
        update: floorActions.update,
        upload: floorActions.upload
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Floor);