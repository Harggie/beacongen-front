import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { areasActions } from '../../actions/areas.actions';
import { paper } from 'paper';
import h337 from 'heatmap.js';
import './Map.css';

import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Grid from '../shared/Grid';

class Map extends React.Component {

    constructor(props) {
        super(props);
        
        this.savedBeacons = [];
        window.beaconMode = false;

        this.savedPaths = [];
        window.drawMode = false;
        window.currentPath = null;

        this.toggleDrawMode = this.toggleDrawMode.bind(this);
        this.deleteAllAreas = this.deleteAllAreas.bind(this);
    }

    componentDidMount() {
        paper.setup(document.getElementById('map-canvas'));

        let raster = new paper.Raster('map-img');
        raster.position = paper.view.center;

        window.currentPath = this.newPath();
        this.tool = new paper.Tool();

        this.tool.onMouseDown = function (event) {
            if (window.drawMode) {
                window.currentPath.add(event.point);
            }
            if (window.beaconMode) {

            }
        }
    }

    componentWillReceiveProps() {
        console.log('props are', this.props);
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

    toggleDrawMode() {
        window.drawMode = !window.drawMode;

        // close current path
        if (!window.drawMode) {
            window.currentPath.closed = true;
            this.props.createArea(window.currentPath);
            window.currentPath = this.newPath();
        }
    }

    deleteAllAreas() {
        this.savedPaths.map(path => path.remove());
    }

    newPath() {
        const path = new paper.Path();

        path.name = 'Area #' + path.id;

        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.fillColor = new paper.Color(Math.random(), Math.random(), Math.random(), 0.2);

        path.onMouseDrag = function (event) {
            if (!window.drawMode) {
                this.position = event.point;
            }
        }

        return path;
    }

    render() {
        return (
            <div>
                <img id="map-img" hidden={true} src={this.props.imgUrl} />
                <Tabs>
                    <Tab label="Heatmap">
                        <div className="tab-inner">
                            <RaisedButton className="control-btn" onClick={this.generateHeatmap} label="Generate heatmap" primary={true} />
                            <RaisedButton className="control-btn" onClick={this.toggleHeatmap} label="Toggle heatmap" primary={true} />
                        </div>
                    </Tab>
                    <Tab label="Beacons">
                        <div className="tab-inner">
                        </div>
                    </Tab>
                    <Tab label="Areas">
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
                    </Tab>
                </Tabs>
                <div className="map-container">
                    <canvas id="map-canvas" width="1000" height="1000"></canvas>
                    <div className="heatmap" style={{ width: 750, height: 750, display: 'none' }}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    areas: state.areas.entities,
    wholeState: state.areas,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        createArea: areasActions.create
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);