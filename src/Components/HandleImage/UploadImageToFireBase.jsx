import React, {Component} from 'react';
import axios from 'axios'
import {Upload, message} from 'antd'
import firebase from "firebase";

const {Dragger} = Upload;
const props = {
    name: 'file',
    multiple: true,
    action:
        (file) => {
            let date = new Date()
            console.log(file)
            const storageRef = firebase.storage().ref('avatarBao/' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '-' + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getFullYear() + '-' + file.name);
            storageRef.put(file)
        },
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

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
        return (
            <Dragger {...props}>
            </Dragger>
        );
    }
}

export default UploadImageToFireBase;