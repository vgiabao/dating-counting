import React, {Component} from 'react';
import ReactPlayer from "react-player";
import {PlayCircleOutlined} from "@ant-design/icons";

class MemoryVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            isIcon: true,
        }
        this.onClickPlay = this.onClickPlay.bind(this);
    }

    onClickPlay() {
        this.setState({playing: !this.state.playing})
    }

    render() {

        return (
            <ReactPlayer pip={true} maxHeight={'40vh!important'}  width={'100%'}
                         playIcon={<PlayCircleOutlined/>}
                         onEnded={() => this.onClickPlay()} loop={true} url={this.props.video}
            controls={true}>

            </ReactPlayer>
        );
    }
}

export default MemoryVideo;
