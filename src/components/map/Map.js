import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { areasActions } from '../../actions/areas.actions';
import { beaconsActions } from '../../actions/beacons.actions';
import { dialogActions } from '../../actions/dialog.actions';
import { paper } from 'paper';
import h337 from 'heatmap.js';
import './Map.css';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
import Grid from '../shared/Grid';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.savedBeacons = [];
        window.beaconMode = false;

        // this.savedPaths = [];
        // window.drawMode = false;
        // window.currentPath = null;

        this.getFloorBeacons = this.getFloorBeacons.bind(this);

        this.handleBeaconEdit = this.handleBeaconEdit.bind(this);
        this.handleBeaconEditForm = this.handleBeaconEditForm.bind(this);
        this.handleBeaconInputChange = this.handleBeaconInputChange.bind(this);

        this.handleBeaconRemoval = this.handleBeaconRemoval.bind(this);

    }

    componentDidMount() {
        paper.setup(document.getElementById('map-canvas'));

        let raster = new paper.Raster('map-img');
        raster.position = paper.view.center;

        // window.currentPath = this.newPath();
        this.tool = new paper.Tool();

        let that = this;

        this.tool.onMouseDown = function (event) {
            // if (window.drawMode) {
            //     window.currentPath.add(event.point);
            // }
            if (window.beaconMode) {
                let beacon = new paper.Raster('beacon-img');
                beacon.position = event.point;
                that.props.createBeacon(that.newBeacon(event.point));
            }
        }
    }

    componentWillReceiveProps() {
        console.log('props are', this.props);
    }

    getFloorBeacons() {
        this.props.getBeacons(this.props.floorId);
    }

    generateHeatmap() {
        let heatmapInstance = h337.create({
            container: document.querySelector('.heatmap')
        });

        let data = {
            max: 3,
            data: [
                {
                    x: Math.floor(5.344345391975285 * 50),
                    y: Math.floor(0.7790583639580679 * 50),
                    value: 1
                },
                {
                    x: Math.floor(4.946236660643907 * 50),
                    y: Math.floor(1.1931467026757911 * 50),
                    value: 1
                },
                {
                    x: Math.floor(4.694913834454245 * 50),
                    y: Math.floor(1.3572610773447384 * 50),
                    value: 1
                },
                {
                    x: Math.floor(7.818976143855717 * 50),
                    y: Math.floor(2.7459567110353404 * 50),
                    value: 1
                },
            ]
        }

        heatmapInstance.setData(data);
    }

    toggleHeatmap() {
        window.showHeatmap = !window.showHeatmap;
        let heatmap = document.querySelector('.heatmap');

        if (window.showHeatmap) {
            heatmap.style.display = 'block';
        } else {
            heatmap.style.display = 'none';
        }
    }

    toggleBeaconMode() {
        window.beaconMode = !window.beaconMode;
    }

    newBeacon(point) {
        const beacon = {
            name: 'Beacon',
            address: '0:00:00:00',
            x: point.x,
            y: point.y,
            floor_id: this.props.floorId
        };
        return beacon;
    }

    // toggleDrawMode() {
    //     window.drawMode = !window.drawMode;

    //     // close current path
    //     if (!window.drawMode) {
    //         window.currentPath.closed = true;
    //         this.props.createArea(window.currentPath);
    //         window.currentPath = this.newPath();
    //     }
    // }

    // deleteAllAreas() {
    //     this.savedPaths.map(path => path.remove());
    // }

    // newPath() {
    //     const path = new paper.Path();

    //     path.name = 'Area #' + path.id;

    //     path.strokeColor = 'black';
    //     path.strokeWidth = 2;
    //     path.fillColor = new paper.Color(Math.random(), Math.random(), Math.random(), 0.2);

    //     path.onMouseDrag = function (event) {
    //         if (!window.drawMode) {
    //             this.position = event.point;
    //         }
    //     }

    //     return path;
    // }

    handleBeaconEdit(beacon){
        this.props.openDialog(beacon);
    }


    handleBeaconEditForm(e) {
        e.preventDefault();
        let beacon = this.props.dialogState.beacon;
        this.props.updateBeacon(beacon._id, beacon);
    }

    handleBeaconInputChange(e) {
        const { name, value } = e.target;
        this.props.inputChangeDialog(name, value);
    }

    handleBeaconRemoval(beacon) {
        this.props.removeBeacon(beacon._id);
    }

    render() {
        return (
            <div>
                <img id="map-img" hidden={true} src={this.props.imgUrl} />
                <img id="beacon-img" hidden={true} src="/images/beacon.png" />

                <Tabs>
                    <Tab label="Heatmap">
                        <div className="tab-inner">
                            <RaisedButton className="control-btn" onClick={this.generateHeatmap} label="Generate heatmap" primary={true} />
                            <RaisedButton className="control-btn" onClick={this.toggleHeatmap} label="Toggle heatmap" primary={true} />
                        </div>
                    </Tab>
                    <Tab
                        label="Beacons"
                        onActive={this.getFloorBeacons}
                    >
                        <div className="tab-inner">
                            <h4>Beacons list</h4>
                            {this.props.beacons.length > 0 ?
                                <Grid
                                    columnsHeaders={['name', 'address']}
                                    columnsProperties={['name', 'address']}
                                    showEdit={true}
                                    showDelete={true}
                                    entities={this.props.beacons}
                                    createHandler={() => { }}
                                    editHandler={this.handleBeaconEdit}
                                    deleteHandler={this.handleBeaconRemoval}
                                /> : 'There are no added beacons'}
                            <RaisedButton className="control-btn" onClick={this.toggleBeaconMode} label="Draw" primary={true} />
                        </div>
                    </Tab>
                    {/* <Tab label="Areas">
                        <div className="tab-inner">
                            <h4>Areas list</h4>
                            {this.props.areas.length > 0 ?
                                <Grid
                                    columnsHeaders={['ID', 'name']}
                                    columnsProperties={['id', 'name']}
                                    showEdit={false}
                                    showDelete={true}
                                    entities={this.props.areas}
                                    createHandler={() => { }}
                                    editHandler={() => { }}
                                    deleteHandler={() => { }}
                                /> : 'There are no added areas'}
                            <div>
                                <RaisedButton className="control-btn" onClick={this.toggleDrawMode} label="Draw" primary={true} />
                                <RaisedButton className="control-btn" onClick={this.deleteAllAreas} label="Delete all" primary={true} />
                            </div>
                        </div>
                    </Tab> */}
                </Tabs>

                <Dialog
                    open={this.props.dialogState.open}
                >
                    <form name="form" onSubmit={this.handleBeaconEditForm}>
                        <h3>Edit beacon</h3>
                        {this.props.dialogState.beacon &&
                            <div>
                                <TextField
                                    name="name"
                                    hintText="Beacon name"
                                    value={this.props.dialogState.beacon.name}
                                    floatingLabelText="Name"
                                    onChange={this.handleBeaconInputChange}
                                /><br />
                                <TextField
                                    name="address"
                                    hintText="Beacon address"
                                    value={this.props.dialogState.beacon.address}
                                    floatingLabelText="Address"
                                    onChange={this.handleBeaconInputChange}
                                />
                            </div>
                        }
                        <RaisedButton className="control-btn" label="Save" primary={true} type="submit" />
                        <RaisedButton className="control-btn" label="Close" primary={true} onClick={this.props.closeDialog} />
                    </form>
                </Dialog>
                <div className="map-container">
                    <canvas id="map-canvas" width="1000" height="1000"></canvas>
                    <div className="heatmap" style={{ width: 750, height: 750, display: 'none' }}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // areas: state.areas.entities,
    beacons: state.beacons.entities,
    // wholeAreas: state.areas,
    wholeBeacons: state.beacons,
    dialogState: state.dialog
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // createArea: areasActions.create,
        getBeacons: beaconsActions.getAll,
        createBeacon: beaconsActions.createNew,
        updateBeacon: beaconsActions.update,
        removeBeacon: beaconsActions.remove,
        openDialog: dialogActions.open,
        closeDialog: dialogActions.close,
        inputChangeDialog: dialogActions.inputChange
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);