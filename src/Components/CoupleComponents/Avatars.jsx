import React, {Component} from 'react';
import {Upload, Modal, Button} from "antd";
import firebase from "firebase";
import UploadImageToFireBase from "../HandleImage/UploadImageToFireBase";
import NoteModal from "./CountingDateTimeArea/NoteModal";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class Avatars extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, visible: false, baoImage: null, huyenImage: null}

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.baoImage !== prevState.baoImage) {
        }
    }

    render() {


        return (
                <div  className={'container-fluid px-2 col-12 d-flex justify-content-center align-items-center'}>
                    <div className={'avatar-container col-4 px-0  '}>
                        <img className={'mainImage'}
                             src={this.props.baoImage} alt={'baoImage'}/>
                        <div className={'avatar-overlay mainImage'}>
                            <UploadImageToFireBase type={'baoImages'} avatarOption={true}
                                                   handlePostImage={this.props.handlePostImage}
                                                   handleStorageImages={this.props.handleStorageImages}/>
                            <NoteModal sender={'Em'} target={'Anh'} handlePostNote={this.props.handlePostNote}
                                       handleFormatDate={this.props.handleFormatDate}/>
                        </div>
                    </div>


                    <div className={'avatar-container col-4 px-0 offset-4 '}>
                        <img className={'p-0 mainImage'}
                             src={this.props.huyenImage} alt={'huyenImage'}/>
                        <div className={'avatar-overlay mainImage '}>
                            <UploadImageToFireBase type={'huyenImages'} avatarOption={true}
                                                   handlePostImage={this.props.handlePostImage}
                                                   handleStorageImages={this.props.handleStorageImages}/>
                            <NoteModal sender={'Anh'} target={'Em'} handlePostNote={this.props.handlePostNote}
                                       handleFormatDate={this.props.handleFormatDate}/>
                        </div>
                    </div>

                </div>
        );
    }
}

export default Avatars;
