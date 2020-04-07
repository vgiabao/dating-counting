import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops-universal";

class DefaultNote extends Component {
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
                    }}> Hôm nay chưa có Note, viết gì đó cho nhao đi hai đứa!
                    </h3>
                    </div>)}
            </Spring>
        );
    }
}

export default DefaultNote;