import React, {Component} from 'react';
import Avatars from "./Avatars";
import CountingDateTime from "./CountingDateTime";
import UploadImageToFireBase from "../HandleImage/UploadImageToFireBase";
class CountingArea extends Component {
    render() {
        return (
            this.props.isLogged || localStorage.getItem('isLogged')  === 'true' ?
                <div style={{
                    height: '100vh',
                    backgroundImage: 'url(' + 'https://images.pexels.com/photos/730896/pexels-photo-730896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' + ')'
                }} className={'wallpaper-image'}>
                    <CountingDateTime/>
                    <Avatars/>
                    <UploadImageToFireBase/>
                </div> : null
        );
    }
}

export default CountingArea;