import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops-universal";

class DefaultNote extends Component {

    render() {
        // let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // let day = date.getDate();
        return (
            <Spring config={{duration: 100}} from={{opacity: 0}} to={{opacity: 1}}>
                {props => (
                    <div style={props} className={'d-block m-2'}>
                        <h4 className={'p-3'} style={{
                            borderRadius: '3px',
                            border: '3px solid white',
                            fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                            backgroundImage: 'url(https://image.freepik.com/free-photo/design-space-paper-textured-background_53876-42312.jpg)',
                            color: 'black',
                            minHeight: '15vh',
                            width: '100%',
                            textShadow: '2px',
                            height: '100%',
                            maxWidth: '100vh'
                        }}>
                            <h5 align={'left'}> Dear the sweeties couple, </h5>
                            <h5 align={'left'} style={{wordWrap: 'break-word'}}>Hai đứa viết gì cho nhau đi :)  </h5>
                            <div className={'ml-auto col-7 text-center'}>
                                <h5 className={''}> From Cupid With Love!</h5>
                                <i className="fa fa-heart"
                                   style={{color: 'red', fontSize: '2rem'}}
                                   aria-hidden="true"/>
                                <h5> {this.props.sender}</h5>
                            </div>
                        </h4>
                    </div>)}
            </Spring>
        );
    }
}

export default DefaultNote;

