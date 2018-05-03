import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { areasActions } from '../../actions/areas.actions';
import { paper } from 'paper';

import Grid from '../shared/Grid';

class Map extends React.Component {

    constructor(props) {
        super(props);

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
        raster.scale(0.75);

        window.currentPath = this.newPath();
        this.tool = new paper.Tool();

        this.tool.onMouseDown = function (event) {
            if (window.drawMode) {
                window.currentPath.add(event.point);
            }
        }
    }

    componentWillReceiveProps() {
        console.log('props are', this.props);
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

    deleteAllAreas(){
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
                <h4>Areas list</h4>
                {this.props.areas.length > 0 ? 
                    <Grid
                        columnsHeaders={['ID', 'name']}
                        columnsProperties={['id', 'name']}
                        showEdit={false}
                        showDelete={true}
                        entities={this.props.areas}
                        createHandler={() => {}}
                        editHandler={() => {}}
                        deleteHandler={() => {}}
                    /> : 'There are no added areas'}
                <button onClick={this.toggleDrawMode}>Draw</button>
                <button onClick={this.deleteAllAreas}>Delete all</button>
                <canvas id="map-canvas" width="750" height="750"></canvas>
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