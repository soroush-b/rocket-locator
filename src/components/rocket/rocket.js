import React from 'react';
import './rocket.css';
import Icon from './location.svg';
const Rocket = ({rocket,showInMap}) => {
    const makeIcon = ()=>{
        if(!rocket.imageURL){
            return '';
        }else{
            return rocket.imageURL.replace(rocket.imageSizes[rocket.imageSizes.length-1],rocket.imageSizes[0])
        }
    };
    return (
        <li className="single-rocket">
            <div className="img-section">
                <img src={makeIcon()} alt={rocket.name} />
            </div>
            <div className="info-section">
                <h4>{rocket.name}</h4>
                {rocket.defaultPads ? <img className="locator" src={Icon} onClick={showInMap.bind(this,rocket.defaultPads)}/> : ''}
                {rocket.wikiURL ? <a href={rocket.wikiURL} target="_blank">more info..</a> : ''}
            </div>

        </li>
    );
};

Rocket.propTypes = {
    rocket : React.PropTypes.object,
};
Rocket.defaultProps = {

};
export default Rocket;