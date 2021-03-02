import React, {Component} from 'react';
import {Modal, Form, Input, Button, DatePicker, message} from 'antd';
import firebase from "../Authentication/Firebase";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            email: '',
            password: '',
            reInputPassword: '',
            name: '',
            dayOfBirth: '',
            partnerName: '',
            partnerDateOfBirth: '',
            relationTime: '',

        }
        this.showRegisterModal = this.showRegisterModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePickDateOfBirth = this.handlePickDateOfBirth.bind(this);
        this.handlePartnerPickDateOfBirth = this.handlePartnerPickDateOfBirth.bind(this);
        this.handleRelationTimePick = this.handleRelationTimePick.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.handleMatchPassword = this.handleMatchPassword.bind(this);
        this.handleCreateNewSpace = this.handleCreateNewSpace.bind(this);

    }

    showRegisterModal() {
        this.setState({register: true})
    }

    cancelModal() {
        this.setState({register: false})
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handlePickDateOfBirth(moment, dateString) {
        this.setState({dayOfBirth: dateString})
    }

    handlePartnerPickDateOfBirth(moment, dateString) {
        this.setState({partnerDateOfBirth: dateString})

    }

    handleRelationTimePick(dateMoment, dateString) {
        this.setState({relationTime: dateString})
    }

    handleMatchPassword() {
        if (this.state.password !== this.state.reInputPassword) {
            message.error("Mật Khẩu Không Trùng Khớp! Hãy Kiểm Tra Lại")
            return false
        }
        return true;
    }

    handleCreateNewSpace(userId) {
        console.log('handled')
        const ref = firebase.database().ref('users/').child(userId);
        console.log('handled ' + userId)

        ref.set({
            images: {
                huyenImages: {'0': 'https://salt.tikicdn.com/ts/product%2F48%2Fd0%2F85%2F2cf879cc4c5acdd92d7691ba13b97133.jpg'},
                baoImages: {'0': '//media3.scdn.vn/img3/2019/12_4/toqv9R_simg_de2fe0_500x500_maxb.jpg'},
                wallpaperImages:{
                    '0': 'https://translations123.com/wp-content/uploads/2020/02/most-romantic-languages-770x500.jpg'
                }

            },
            tarotImages: null,
            Memories: null,
            Notes: null,
            Notification: null,
            Status: null,
            details: {
                lover_1_name: {0: this.state.name},
                lover_2_name: {0: this.state.partnerName},
                startingDay: this.state.relationTime,
                lover1BirthDay: this.state.dayOfBirth,
                lover2BirthDay: this.state.partnerDateOfBirth
            },
            albums: null,
        }).then(res => console.log(res)).catch(e => {
            console.log(e)
        });
        console.log('dvb created');

    }


onFinish()
{
    console.log('clicked')
    const auth = firebase.auth()
    if (this.handleMatchPassword()) {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(result => {
            if (result.additionalUserInfo.isNewUser === true) {
                message.success('Hai Bạn Đã Tạo Phòng Riêng Thành Công Với Tên Đăng Nhập là ' + this.state.email + ' Đăng Nhập Ngay Để Trải Nghiệm Nào!')
                this.handleCreateNewSpace(result.user.uid)
                this.cancelModal();
                return true;
            }
        }).catch(e => {
            console.log(e)
            message.error("Tên Đăng Nhập Này Đã Có Người Sử Dụng, Hoặc Có Gì Đóa Sai Sai!")
        });
    }
    return false;

}


onFinishFailed()
{


}
render()
{

    return (
        <div>
            <p onClick={this.showRegisterModal} className={'pt-2 text-center'}
               style={{cursor: 'pointer', color: 'royalblue'}}> Hai bạn chưa có phòng chung? Đăng ký
                ngay! </p>
            <Modal footer={[]} visible={this.state.register} onCancel={this.cancelModal}>
                <Form
                    name="Register"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Email Của Bạn"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Tên Đăng Nhập Chung Của Hai Bạn!',
                            },
                        ]}
                    >
                        <Input name={'email'} value={this.state.email} onChange={this.handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Mật Khẩu Chung"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật Khẩu Chung Của Hai Bạn',
                            },
                        ]}
                    >
                        <Input.Password name={'password'} onChange={this.handleChange} value={this.state.password}/>
                    </Form.Item>
                    <Form.Item
                        label="Nhập Lại Mật Khẩu Chung"
                        name="reInputPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập Lại Mật Khẩu Chung Của Hai Bạn',
                            },
                        ]}
                    >
                        <Input.Password name={'reInputPassword'} value={this.state.reInputPassword}
                                        onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item
                        label="Tên Của Bạn"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập Tên Của Bạn',
                            },
                        ]}
                    >
                        <Input name={'name'} onChange={this.handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Tên Của Người Yêu"
                        name="partnerName"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập Tên Của Người Yêu Bạn',
                            },
                        ]}
                    >
                        <Input name={'partnerName'} onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item
                        label="Sinh Nhật Của Bạn"
                        name="dayOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập Sinh Nhật Của Bạn',
                            },
                        ]}
                    >
                        <DatePicker name={'dayOfBirth'} onChange={this.handlePickDateOfBirth}/>
                    </Form.Item>
                    <Form.Item
                        label="Sinh Nhật Của Người Yêu"
                        name="partnerDayOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập Sinh Nhật Của Người Yêu Bạn',
                            },
                        ]}
                    >
                        <DatePicker name={'partnerDayOfBirth'} onChange={this.handlePartnerPickDateOfBirth}/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày Hai Bạn Là Một Đôi"
                        name="relationTime"
                        rules={[
                            {
                                required: true,
                                message: 'Ngày Hai Bạn Thành Đôi',
                            },
                        ]}
                    >
                        <DatePicker name={'relationTime'} onChange={this.handleRelationTimePick}/>
                    </Form.Item>
                    <Form.Item>
                        <Button className={'center'} type="primary" htmlType="submit">
                            Tạo Nhà Riêng Của Hai Bạn :v
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
}

export default Register;
