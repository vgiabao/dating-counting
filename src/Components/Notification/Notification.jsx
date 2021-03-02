import React, {Component} from 'react';
import {Menu, Dropdown, Modal} from 'antd'
import firebase from "../Authentication/Firebase";
import CenterNotifModal from "./centerNotifModal";
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noTifNumber: 0,
            newNoTif: [],
            target: this.props.gender === 'Anh' ? 'Em' : 'Anh'
        }
        this.fetchNumNotif = this.fetchNumNotif.bind(this);
        this.fetchNotifDetail = this.fetchNotifDetail.bind(this);
        this.notifBarOnClick =this.notifBarOnClick.bind(this);
    }

    fetchNumNotif() {
        const ref = firebase.database().ref('Notification/' + this.state.target + '/Number')
        ref.on('value', snapShot => {
            this.setState({noTifNumber: snapShot.val()})
            console.log('notifNum:', snapShot.val())
        })
    }

    fetchNotifDetail() {
        const ref = firebase.database().ref('Notification/' + this.state.target).child('/notification_detail');
        ref.on('value', snapShot => {
            const notif_detail = snapShot.val();
            // console.log('notif detail',notif_detail);
            // console.log('notif ref:' + 'Notification/' +  + '/Number');
            for (let item of notif_detail) {
                this.setState({newNoTif: [item, ...this.state.newNoTif]})
            }
        })
    }
    async deleteNotif(){
        const ref = firebase.database().ref('Notification/' + this.state.target).child('Number');
        await ref.set(0);
    }

    componentDidMount() {
        this.fetchNumNotif();
        // this.fetchNotifDetail();
        console.log(this.state.newNoTif)
    }
    async notifBarOnClick(e){
        e.preventDefault();
        await this.deleteNotif();
    }


    render() {
        const noTifDom = Object.keys(this.state.newNoTif).map((value, key) => (
            <CenterNotifModal>
            </CenterNotifModal>
        ))
    //         <Menu.Item key={key}>
    //         <div> {this.state.newNoTif[value].content}
    // </div>
    // <Menu.Divider/>
    //
    // </Menu.Item>
        const menu = (
            <Menu>
                {noTifDom}
            </Menu>
        );

        return (
            <div>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={this.notifBarOnClick}>
                    Notification
                </a>
            </Dropdown>

            </div>
        );
    }
}

