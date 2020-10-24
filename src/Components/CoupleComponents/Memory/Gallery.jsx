import React, {Component} from 'react';
import ReactPlayer from "react-player";
import Modal from "antd";
import MinimalImage from "./MinimalImage";
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    handlePopUpImage = () => {


}

    render() {
        const album = this.props.photos.map(e => <MinimalImage type={(e.src.includes('mp4')) ?  'video' : 'image'} url={e.src}/>);
        return (
            <div className={'galleryLayout'}>
                {album}
            </div>
        );
    }
}

export default Gallery;