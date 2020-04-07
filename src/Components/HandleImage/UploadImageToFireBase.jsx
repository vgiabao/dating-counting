import React, {Component} from 'react';
import {Upload, message, Button} from 'antd'
import firebase from "firebase";

class UploadImageToFireBase extends Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null
        }
    }

    fileSelectHandler(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }



    render() {
        const props = {
            name: 'file',
            multiple: false,
            action:
                (file) => {
                    this.props.handleStorageImages(file, this.props.type)
                },

        };
        return (
            <Upload  {...props} type={this.props.type} showUploadList={false}>
                { this.props.avatarOption ? <Button style={{fontSize: '0.75rem'}} className={'mb-1'} icon={<i className="fa fa-cog" aria-hidden="true"/>
                }> Tải Ảnh Lên </Button> : null}
            </Upload>
        );
    }
}

export default UploadImageToFireBase;