import React, {Component,propTypes} from 'react';
import Icon from './marker.svg';
export default class Map extends Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.center;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
        this.lastOpenInfoWindow={};
        this.marker={};
        this.infowindow={};
    }
    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
        if (prevState.lastOpenInfoWindow !== this.state.currentLocation) {
            this.recenterMap();
        }
        if (prevProps.selectedPads !== this.props.selectedPads) {
            this.props.selectedPads.forEach(pad=>this.openInfoWindow(pad))
        }

    }
    shouldComponentUpdate(nextProps, nextState){
            return nextProps.selectedPads.length ===0 || !(JSON.stringify(nextProps.selectedPads) == JSON.stringify(this.props.selectedPads));
    }
    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;
        const maps = this.google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center)
        }
    }
    addMarker(pad){
        const map = this.map;
        const maps = this.google.maps;
        let position = new maps.LatLng(pad.latitude, pad.longitude);
        const markerConfig = {
            map: map,
            position: position,
            animation: maps.Animation.DROP,
            icon:Icon
        };
        this.marker[pad.id] = new maps.Marker(markerConfig);
        this.addInfoWindow(pad.name,pad.id);
    }
    addInfoWindow(content,padID) {
        let marker = this.marker[padID];
        let maps = this.google.maps;
        this.infowindow[padID] = new maps.InfoWindow({
            content: (`<h4>${content}</h4>`),
            maxWidth: 100
        });
        marker.addListener('click', this.openInfoWindow.bind(this,padID));
    }
    openInfoWindow(padID){
        if(!this.marker[padID] || !this.infowindow[padID]){return}
        let marker = this.marker[padID];
        let iw = this.infowindow[padID];
        let map = this.map;
        iw.open(map, marker);
    }
    loadMap() {
        // google is available
        this.google = window.google;

        const mapConfig = Object.assign({}, {
            center: this.state.currentLocation,
            zoom: this.props.zoom
        });
        this.map = new this.google.maps.Map(this.refs.map, mapConfig);
        this.props.pads.forEach(marker=>this.addMarker(marker));
    }

    render() {
        const mapStyle = {
            width: '100%',
            height: 500
        };
        return (
            <div ref='map' style={mapStyle}>
                Loading map...
            </div>
        )
    }
}
Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    center: React.PropTypes.object,
    pads: React.PropTypes.array,
    selectedPads: React.PropTypes.array,
};
Map.defaultProps = {
    zoom: 8,
    // San Francisco, by default
    center: {
        lat: 34.634363,
        lng: -120.613017
    },
    selectedPads:[],
    pads:[]

};