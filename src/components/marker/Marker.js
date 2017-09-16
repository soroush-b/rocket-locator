import React, {Component,propTypes} from 'react';
import Icon from './marker.svg';
export default class Marker extends Component {
    componentDidMount() {
        this.renderMarker();
    }
    componentDidUpdate(prevProps) {
        if(this.iw){
            if(this.props.selected){
                this.openIW();
            }else{
                this.closeIW();
            }
        }
        if ((this.props.position !== prevProps.position) && !this.marker) {
            this.renderMarker();
        }
    }
    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }
    InitailizeWindowInfo(){
        console.log("wi run!");
        this.iw = new this.props.maps.InfoWindow({
            content: (`<h3>${this.props.marker.name}</h3>`),
            maxWidth: 100
        });
    }
    openIW(){
        let {map,bounds} = this.props;
        this.iw.open(map, this.marker);

        bounds.extend(this.marker.position);
        map.fitBounds(bounds);

        // adjust the zoom for single markers
        let zoom = map.getZoom();
        map.setZoom(zoom > 7 ? 7 : zoom);
    }
    closeIW(){
        this.iw.close();
    }
    renderMarker() {
        let {map,maps,position} = this.props;
        let pos = position ;
        let marker_position = new maps.LatLng(pos.latitude, pos.longitude);

        const markerConfig = {
            map: map,
            position: marker_position,
            animation: maps.Animation.DROP,
            icon:Icon
        };
        this.marker = new maps.Marker(markerConfig);
        this.marker.addListener('click', this.props.showInMap.bind(this,""+this.props.marker.id));
        this.InitailizeWindowInfo();
    }
    render(){
        return null;
    }
}