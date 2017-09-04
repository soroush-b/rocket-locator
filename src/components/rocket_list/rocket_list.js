import React from 'react';
import Rocket from './../rocket/rocket';
import './rockets.css';

const Rockets = ({rockets,showInMap}) => {
    return (
        <ul className="list-rockets">
            {rockets.map(rocket=>{
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