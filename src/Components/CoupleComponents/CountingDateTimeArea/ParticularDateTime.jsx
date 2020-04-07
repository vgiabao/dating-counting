import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops-universal";

class ParticularDateTime extends Component {
    render() {
        return (
            <Spring config={{duration: 1000}} from={{opacity: 0}} to={{opacity: 1}}>
                {props => (
                    <div style={props} className={'text-center  m-2'}><h3 className={'p-3'} style={{
                        border: '3px solid white',
                        fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                        backgroundImage: 'url(https://image.freepik.com/free-photo/design-space-paper-textured-background_53876-42312.jpg)',
                        color: 'black',
                        minHeight: '20vh'
                    }}>We've been in love for
                        <Spring config={{duration: 3000}}
                                from={{number: 0}}
                                to={{number: this.props.calculateTotalDay()}}>{props => (
                            <div style={props} className={'d-inline-block ml-2 p-2 '}><h1
                                style={{color: '#E81D1D', fontSize:'4rem'}}> {props.number.toFixed(0)} Days</h1></div>)}</Spring>
                    </h3>
                    </div>)}
            </Spring>
        );
    }
}

export default ParticularDateTime;