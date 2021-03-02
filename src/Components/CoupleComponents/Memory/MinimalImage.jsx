import React, {Component} from 'react';
import ReactPlayer from "react-player";
import {Modal} from "antd";
class MinimalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.zoomImage = this.zoomImage.bind(this);
    }
    handleCancel = () => {
        this.setState({visible: false})
    };
    zoomImage = () => {
        this.setState({visible: true})
    };
    render() {
        console.log(this.props.url ? this.props.url : 'nothing')
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                    ]}
                >
                    {this.props.type === 'video' ? <ReactPlayer src={this.props.url} className={''}/> :
                        <img style={{maxWidth:'50vw'}} src={this.props.url} alt={'minimalImage'} />}
                </Modal>
             {this.props.type === 'video' ? <ReactPlayer src={this.props.url} width={200} height={200} /> :
                <img src={this.props.url} alt={'minimalImage'} style={{height:200 + 'px', width: '100px'}}  onClick={this.zoomImage} />}
            </div>
        );
    }
}

export default MinimalImage;
