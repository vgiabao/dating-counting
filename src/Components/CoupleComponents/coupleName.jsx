import React, {Component} from 'react';
import {Modal, Input} from "antd";
import firebase from "../Authentication/Firebase";

class CoupleName extends Component {
    state;

    constructor() {
        super();
        this.state = {
            visibleVo: false,
            visibleChong: false,
            userInput: '',
            lover_1_name: '',
            lover_2_name: '',

        }
        this.showModalVo = this.showModalVo.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.showModalChong = this.showModalChong.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchLoverName = this.fetchLoverName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLoverName = this.changeLoverName.bind(this);
    }

    showModalVo() {
        this.setState({visibleVo: true});
    }

    showModalChong() {
        this.setState({visibleChong: true});
    }

    onCancel() {
        this.setState({visibleVo: false, visibleChong: false, userInput: ''});
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    handlePostImage(type, imageUrl) {
        const ref = firebase.database().ref(`Images/${type}`);
        ref.push({[type]: imageUrl});
    }

    handleSubmit() {
        this.state.visibleVo ? this.changeLoverName('lover_2_name') : this.changeLoverName('lover_1_name');
        this.setState({userInput: '', visibleVo: false, visibleChong: false})

    }

    fetchLoverName(loverType) {
        const path = firebase.database().ref('details/' + loverType);
        path.on('value', snapShot => {
            const lastNameKey = Object.keys(snapShot.val())[Object.keys(snapShot.val()).length - 1];
            console.log('key: ', lastNameKey);
            this.setState({[loverType]: snapShot.val()[lastNameKey][loverType]});
        })
    }

    changeLoverName(loverType) {
        const path = firebase.database().ref('details/' + loverType);
        path.push({[loverType]: this.state.userInput})
    }

    componentDidMount() {
        this.fetchLoverName('lover_1_name');
        this.fetchLoverName('lover_2_name');
    }

    render() {
        return (
            <div className={'container-fluid px-2 col-12 d-flex flex-row align-items-center '}>
                <div className={'px-0 col-4 mt-1 text-center p-1'} onClick={this.showModalChong}>
                    <div className={'rounded-pill p-1'}
                         style={{display: 'inline-block', backgroundColor: '#8C93A8', maxWidth: '200px'}}>
                        <h4 className={' text-center mb-0 h6'} style={{

                            fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                            color: 'white',
                            wordBreak: 'break-word'
                        }}> {this.state.lover_1_name} <i className="fa fa-pencil-square-o h6 pl-2 mb-0"
                                                        aria-hidden="true"/>
                        </h4>
                    </div>
                </div>
                <div className={'px-0 col-4 mt-1 offset-4 text-center p-1'}>
                    <div className={'rounded-pill p-1'} onClick={this.showModalVo}
                         style={{display: 'inline-block', backgroundColor: '#8C93A8', maxWidth: '200px'}}>
                        <h4 className={' text-center  mb-0 h6'} style={{

                            fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                            color: 'white',
                            wordBreak: 'break-word'
                        }}>{this.state.lover_2_name} <i className="fa fa-pencil-square-o h6 pl-2 mb-0"
                                                        aria-hidden="true"/>
                        </h4>
                    </div>
                </div>
                <Modal title={"Đổi biệt danh cho anh"}
                       visible={this.state.visibleChong} onCancel={this.onCancel} onOk={this.handleSubmit}>
                    <div style={{marginBottom: 16}}>
                        <Input value={this.state.userInput} onChange={this.handleUserInput} addonBefore="Name: "
                               defaultValue={this.props.baoName}/>
                    </div>
                </Modal>
                <Modal title={"Đổi biệt danh cho em"} value={this.state.userInput}
                       visible={this.state.visibleVo} onCancel={this.onCancel} onOk={this.handleSubmit}> <Input
                    value={this.state.userInput}
                    onChange={this.handleUserInput}
                    addonBefore="Name: "
                    defaultValue={this.props.baoName}/>
                </Modal>

            </div>
        );
    }
}

export default CoupleName;