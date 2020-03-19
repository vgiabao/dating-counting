import React, {Component} from 'react';
import {Upload, Modal} from "antd";
import firebase from "firebase";

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
        let storeRef = firebase.storage().ref('avatarBao').listAll().then(res => {let item = res.items[res.items.length - 1];
            let particularImageUrl = firebase.storage().ref('avatarBao').child(item.name).getDownloadURL().then(res => {
                this.setState({baoImage: res})
                console.log(particularImageUrl)
            })
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.baoImage !== prevState.baoImage){
            console.log('some changes!')
        }
    }

    render() {


        return (
            <div>
                <div className={'container-fluid px-2 col-12 d-flex justify-content-center align-items-center'}>
                    <img className={'col-4 p-0 mainImage'}
                         src={this.state.baoImage}/>
                    <div className={'col-4 text-center'}>
                        <i className="fa fa-heart "
                           style={{color: 'white', animation: 'heartbeat 2s infinite', fontSize: '5rem'}}
                           aria-hidden="true"/>
                    </div>

                    <img className={'col-4 p-0 mainImage'}
                         src={'https://www.catster.com/wp-content/uploads/2019/01/A-fat-cat-spread-out.jpg'}/>
                </div>

            </div>
        );
    }
}

export default Avatars;