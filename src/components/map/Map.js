import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { areasActions } from '../../actions/areas.actions';
import { beaconsActions } from '../../actions/beacons.actions';
import { dialogActions } from '../../actions/dialog.actions';
import { floorActions } from '../../actions/floors.actions';

import { paper } from 'paper';
import h337 from 'heatmap.js';
import jspdf from 'jspdf';

import './Map.css';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
import Grid from '../shared/Grid';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.currentTab = 'heatmap';

        this.currentBeacons = [];
        window.beaconMode = false;
        window.showHeatmap = true;

        // this.savedPaths = [];
        // window.drawMode = false;
        // window.currentPath = null;

        this.getFloorBeacons = this.getFloorBeacons.bind(this);

        this.handleBeaconEdit = this.handleBeaconEdit.bind(this);
        this.handleBeaconEditForm = this.handleBeaconEditForm.bind(this);
        this.handleBeaconInputChange = this.handleBeaconInputChange.bind(this);

        this.handleBeaconRemoval = this.handleBeaconRemoval.bind(this);

        this.generatePdf = this.generatePdf.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.handleHeatmapTab = this.handleHeatmapTab.bind(this);
        this.generateHeatmap = this.generateHeatmap.bind(this);

    }

    componentDidMount() {
        paper.setup(document.querySelector('.map-canvas'));

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
                that.currentBeacons.push(beacon);
                that.props.createBeacon(that.newBeacon(beacon));
            }
        }
    }

    generatePdf() {
        let doc = new jspdf();

        let heatmap = document.querySelector('.heatmap-canvas');
        let backgroundmap = document.querySelector('.map-canvas');


        window.backgroundmap = backgroundmap;

        console.log(backgroundmap);

        // let heatmapImg = heatmap.toDataURL('image/png');
        let backgroundmapImg = backgroundmap.toDataURL('image/png');

        // doc.text('hello', 10, 10);


        // doc.addImage(backgroundmapImg, 'PNG', 10, 10);
        // doc.addImage(heatmapImg, 'PNG', 10, 10);

        // doc.save('heatmap-' + this.props.floorId + '.pdf');
    }

    getFloorBeacons() {
        this.props.getBeacons(this.props.floorId);
        this.switchTab('beacons');
        let that = this;
        setTimeout(function () {
            that.props.beacons.forEach(function (beacon) {
                let renderedBeacon = new paper.Raster('beacon-img');
                renderedBeacon.position = new paper.Point(beacon.x, beacon.y);
                that.currentBeacons.push(renderedBeacon);
            });
        }, 500);
    }

    generateHeatmap() {
        this.props.getPoints(this.props.floorId);

        let heatmapInstance = h337.create({
            container: document.querySelector('.heatmap')
        });

        let that = this;

        setTimeout(function () {
            let data = {
                max: 3,
                data: that.props.floors.points
            };

            console.log('settingInstace', data.data);
            heatmapInstance.setData(data);
        }, 1500);
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

    newBeacon(paperBeacon) {
        const beacon = {
            name: 'Beacon',
            address: '0:00:00:00',
            x: paperBeacon.position.x,
            y: paperBeacon.position.y,
            floor_id: this.props.floorId,
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

    switchTab(tab) {
        this.currentTab = tab;
        let that = this;
        if (tab != 'beacons') {
            this.currentBeacons.forEach(function (currentBeacon) {
                currentBeacon.remove();
            });
            this.currentBeacons = [];
        }
    }

    handleBeaconEdit(beacon) {
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
        let that = this;
        this.currentBeacons.forEach(function (currentBeacon) {
            if (beacon.x == currentBeacon.position.x && beacon.y == currentBeacon.position.y) {
                currentBeacon.remove();
                that.currentBeacons.pop(currentBeacon);
            }
        });
    }

    handleHeatmapTab() {
        this.switchTab('heatmap');
    }

    render() {
        return (
            <div>
                <img id="map-img" hidden={true} src={this.props.imgUrl} />
                <img id="beacon-img" hidden={true} src="/images/beacon.png" />
                <Tabs>
                    <Tab
                        label="Heatmap"
                        onActive={this.handleHeatmapTab}
                    >
                        <div className="tab-inner">
                            <RaisedButton className="control-btn" onClick={this.generateHeatmap} label="Generate heatmap" primary={true} />
                            <RaisedButton className="control-btn" onClick={this.toggleHeatmap} label="Toggle heatmap" primary={true} />
                            <RaisedButton className="control-btn" onClick={this.generatePdf} label="Download PDF" primary={true} />
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
                    <canvas className="map-canvas" width="1000" height="1000"></canvas>
                    <div className="heatmap" style={{ width: 1000, height: 1000 }}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // areas: state.areas.entities,
    beacons: state.beacons.entities,
    floors: state.floors,
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
        inputChangeDialog: dialogActions.inputChange,
        getPoints: floorActions.getPoints
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);