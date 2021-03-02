import React, {Component} from 'react';
import {navigate} from "@reach/router";
import {Modal, Button, Input, Spin, Radio, Tabs} from "antd";
import {ImportOutlined} from "@ant-design/icons";
import Register from "./Authentication/Register";

const {TabPane} = Tabs;

class LoadingPage extends Component {
    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
            visible: false,
            loading: false,
            userInput: '',
            preLoading: false,
            gender: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        if (this.state.userInput === this.props.password) {
            this.setState({
                loading: true,
            });
            this.props.handlerGender(this.state.gender);
            this.props.handleLogin();
            setTimeout(() => {
                this.setState({
                    visible: false,
                    loading: false,
                });
            }, 2000);
            setTimeout(() => {
                navigate('/bee-home');
                this.setState({preloading: true})
            }, 3000)
        }

    };
    handleCancel = () => {
        this.setState({
            visible: false,
            userInput: ''
        });
    };

    handleChange(e) {
        console.log(e.target.value);
        this.setState({userInput: e.target.value})
    }

    componentDidMount() {
        setTimeout(() => this.setState({preLoading: true}), 2000)
    }

    handleGenderChange(e) {
        this.setState({gender: e.target.value});
    }

    handleInputChange(e){

    }



    render() {
        let {visible, loading} = this.state;
        const plainOptions = ['Gấu Brown', 'Thỏ Cony'];


        return (
            <div id={'heart-container'} className={'d-flex justify-content-center align-items-center flex-column'}>

                {/*<div id="heart"/>*/}
                <h4 style={{
                    fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                    color: 'white',
                    fontSize: '3rem'
                }}> Counting Dating</h4>
                <i className="fa fa-heart" id={'heart-2'} aria-hidden="true"/>
                <div>
                    {this.state.preLoading ?
                        <Button style={{borderRadius: '10px'}} type="primary" onClick={this.showModal}>
                            Ấn Vào Đi Bee
                        </Button> : <Spin size={'large'}/>}
                    <Modal
                        title="❤ Nhập Mật Khẩu Của 2 Đứa Nè ❤"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Quên Òi!
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                Đăng Nhập :v
                            </Button>,
                        ]}
                    >
                        <div
                            className={'container pb-2 d-flex flex-row pl-0'}>
                            <h6> Tớ là: </h6>
                            <Radio.Group onChange={this.handleGenderChange} value={this.state.gender}
                                         className={'col-6'}>
                                <Radio value='Anh'>King 🐝</Radio>
                                <Radio value='Em'>Queen 🐷</Radio>

                            </Radio.Group>
                        </div>
                        <Input value={this.state.account} type={'text'} onChange={this.handleChange}
                               placeholder={'Nhà riêng của tụi mình :v'}/>
                        <Input value={this.state.userInput} type={'password'} onChange={this.handleChange}
                               placeholder={'Mật khẩu chung của tụi mình :v'}/>
                        <Register/>
                    </Modal>
                </div>
            </div>

        );
    }
}

export default LoadingPage;
