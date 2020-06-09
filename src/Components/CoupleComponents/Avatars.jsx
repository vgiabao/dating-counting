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
        this.state = {loading: false, visible: false, baoImage: null, nhiImage: null}

    }

    componentDidMount() {
        let storeRef = firebase.storage().ref('avatarBao/').listAll().then(res => {
            let item = res.items[0];
            let particularImageUrl = firebase.storage().ref('avatarBao/').child(item.name).getDownloadURL().then(res => {
                this.setState({baoImage: res})
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.baoImage !== prevState.baoImage) {
        }
    }

    render() {


        return (
                <div className={'container-fluid px-2 col-12 d-flex justify-content-center align-items-center'}>
                    <div className={'avatar-container col-4 px-0 '}>
                        <img className={'p-0 mainImage'}
                             src={this.props.baoImage} alt={'baoImage'}/>
                        <div className={'avatar-overlay mainImage'}>
                            <UploadImageToFireBase type={'baoImages'} avatarOption={true}
                                                   handlePostImage={this.props.handlePostImage}
                                                   handleStorageImages={this.props.handleStorageImages}/>
                            <NoteModal sender={'Vợ'} target={'Chồng'} handlePostNote={this.props.handlePostNote}
                                       handleFormatDate={this.props.handleFormatDate}/>
                        </div>
                    </div>

                    <div className={'col-4 p-0 text-center'}>
                        <i className="fa fa-heart"
                           style={{color: 'white', animation: 'heartbeat 2s infinite', fontSize: '5rem'}}
                           aria-hidden="true"/>
                    </div>
                    <div className={'avatar-container col-4 px-0 '}>
                        <img className={'p-0 mainImage'}
                             src={this.props.nhiImage} alt={'nhiImage'}/>
                        <div className={'avatar-overlay mainImage'}>
                            <UploadImageToFireBase type={'nhiImages'} avatarOption={true}
                                                   handlePostImage={this.props.handlePostImage}
                                                   handleStorageImages={this.props.handleStorageImages}/>
                            <NoteModal sender={'Chồng'} target={'Vợ'} handlePostNote={this.props.handlePostNote}
                                       handleFormatDate={this.props.handleFormatDate}/>
                        </div>
                    </div>

                </div>
        );
    }
}

export default Avatars;