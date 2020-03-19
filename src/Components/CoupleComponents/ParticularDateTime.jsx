import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops-universal";

class ParticularDateTime extends Component {
    render() {
        return (
            <Spring config={{duration: 1000}} from={{opacity: 0}} to={{opacity: 1}}>
                {props => (
                    <div style={props} className={'text-center d-inline-block m-2'}><h3 className={'p-3'} style={{
                        color: 'white',
                        borderRadius: '50%',
                        border: '5px solid white'
                    }}>We've been in love for
                        <Spring config={{duration: 3000}}
                                from={{number: 0}}
                                to={{number: this.props.calculateTotalDay()}}>{props => (
                            <div style={props} className={'d-inline-block ml-3 '}><h3
                                style={{color: 'white'}}>{props.number.toFixed(0)} Days</h3></div>)}</Spring>
                    </h3>
                    </div>)}
            </Spring>
        );
    }
}

export default ParticularDateTime;