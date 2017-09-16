import React, {Component,propTypes} from 'react';
import {loadJS} from '../helper/helper';

export default class Map extends Component {
    constructor(props) {
        super(props);
        const {lat, lng} = this.props.center;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        // if (navigator && navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((pos) => {
        //         console.log("11111111111111")
        //         const coords = pos.coords;
        //         this.setState({
        //             currentLocation: {
        //                 lat: coords.latitude,
        //                 lng: coords.longitude
        //             }
        //         })
        //     })
        // }
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAMA_8C_xjC3dx2350V9GuL9nrkMMj4aG4&callback=initMap')
    }
    initMap(){
        this.google = window.google;
        const mapConfig = Object.assign({}, {
            center: this.state.currentLocation,
            zoom: this.props.zoom
        });
        this.map    = new this.google.maps.Map(this.refs.map, mapConfig);
        this.bounds  = new this.google.maps.LatLngBounds();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.boundPads !== this.props.boundPads) {
            this.bounds  = new this .google.maps.LatLngBounds();
        }
    }

    renderMarkers(){
        const {children} = this.props;
        if (!children) return;

        const map = this.map;
        const bounds = this.bounds;
        const maps = (this.google ||{}).maps;
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map,
                maps,
                bounds
            });
        })
    }
    render() {
        const mapStyle = {
            width: '100%',
            height: 500
        };
        return (
            <div ref='map' style={mapStyle}>
                Loading map...
                {this.renderMarkers()}
            </div>
        )
    }
}
Map.propTypes = {
    // google: React.PropTypes.object,
    // zoom: React.PropTypes.number,
    // center: React.PropTypes.object,
};
Map.defaultProps = {
    zoom: 8,
    // San Francisco, by default
    center: {
        lat: 34.634363,
        lng: -120.613017
    },
};