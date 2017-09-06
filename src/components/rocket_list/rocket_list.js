import React from 'react';
import Rocket from './../rocket/rocket';
import './rockets.css';
import Loading from './../../imgs/loading.gif';

const Rockets = ({rockets,showInMap,loading}) => {
    return (
        <ul className="list-rockets">

            {loading ? <img src={Loading} alt="loading" style={{width:'100%'}}/> : rockets.map(rocket=>{
                return <Rocket key={rocket.id} rocket={rocket} showInMap={showInMap} />
            })}
        </ul>
    );
};

Rockets.propTypes = {
    rockets : React.PropTypes.array,
};
Rockets.defaultProps = {
    rockets:[]
};
export default Rockets;