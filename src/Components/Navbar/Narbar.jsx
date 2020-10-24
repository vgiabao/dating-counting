import React, {Component} from 'react';
import {Menu} from "antd";
import {MenuOutlined, RollbackOutlined} from '@ant-design/icons';
import {SettingOutlined, ContactsOutlined, LogoutOutlined, HomeOutlined, FieldTimeOutlined} from "@ant-design/icons";
import {navigate} from "@reach/router";
import Notification from "../Notification/Notification";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

class Narbar extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '', visible: false,};
        this.handleClick = this.handleClick.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleClick(e) {
        this.refs.fileInput.click();
    }

    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        this.props.handleStorageImages(file, 'wallpaperImages')
    }

    //
    // showMenu() {
    //     console.log('show menu');
    //     this.setState({visible: !this.state.visible})
    // }
    //
    // hideMenu() {
    //     this.setState({visible: false})
    // }
    onChange(e, newValue) {
        this.setState({value: newValue});
        navigate('/' + newValue)
    }

    render() {
        const {SubMenu} = Menu
        return (
            // <Menu theme={'light'}  style={{top:0, left:3, fontSize:'2rem', border:'0px', position:'fixed', zIndex: '1221', color:'white', backgroundColor:'transparent '}}
            //     key={'general-setting'} mode={'vertical-left'} openKeys={'sub1'} onClick={item => this.onClick(item)}>
            window.innerWidth >= 762 ?
                <div className={'container-fluid'}>
                <Menu mode={'horizontal'}
                      style={{
                          top: 0,
                          left: 0,
                          border: '0px',
                          position: 'fixed',
                          zIndex: '1221',
                          width: '100%',
                          color: 'white',
                          fontWeight: 'bold',
                          background: '#f9778c'
                          // background: 'linear-gradient(270deg,  ,rgb(249, 119, 140), rgb(241, 227, 229), rgb(241, 34, 63))'
                      }}>
                    <SubMenu
                        title={
                            <span
                                className="submenu-title-wrapper d-flex flex-row justify-content-center align-items-center mr-auto">
                                <SettingOutlined spin={true}/>Tuỳ Chỉnh
        </span>
                        }
                    >
                        <Menu.Item className={'d-flex flex-row  align-items-center'}
                                   onClick={this.handleClick} key="setting:1"> <ContactsOutlined/> Đổi Ảnh Bìa
                            <input onChange={this.onChangeFile} ref="fileInput" type="file" name="wallpaper"
                                   style={{display: "none"}}/>
                        </Menu.Item>
                        <Menu.Item className={'d-flex flex-row align-items-center'}
                                   onClick={this.props.logoutHandler} key="setting:2"> <LogoutOutlined/> Đăng Xuất
                        </Menu.Item>

                    </SubMenu>
                    {/*<div className={'mr-auto'}> </div>*/}
                    <Menu.Item style={{marginLeft: '47%'}} title={'Counting area'} onClick={() => navigate('/bee-home')}> Đếm Ngày</Menu.Item>
                    <Menu.Item title={'Our Story'} onClick={() => navigate('/our-story')}> Chuyện Tụi Mình </Menu.Item>
                    <Menu.Item title={'New Feed'} onClick={() => navigate('/new-feed')}> Chat </Menu.Item>
                    <Menu.Item title={'AlBum'} onClick={() => navigate('/images')}> Bộ Sưu Tập </Menu.Item>
                </Menu>
                </div>
                :
                <BottomNavigation className={''} value={this.state.value} onChange={this.onChange}
                                  style={{
                                      top: 0,
                                      left: 0,
                                      position: "sticky",
                                      zIndex: 2000,
                                      width: '100vw',
                                      overflow: 'hidden',

                                  }}>
                    <BottomNavigationAction label="Counting" value="bee-home" icon={<ContactsOutlined/>}/>
                    <BottomNavigationAction label="Our Story" value="our-story" icon={<FieldTimeOutlined/>}/>
                    <BottomNavigationAction label="New Feed" value="new-feed" icon={<HomeOutlined/>}/>
                    <BottomNavigationAction label="Album" value="album" icon={<i className="fa fa-file-image-o"
                                                                                 aria-hidden="true"/>

                    }/>
                </BottomNavigation>
            //         <MenuOutlined
            // style={{fontSize: '30px', top: 0, color: 'white', left: 1, position: 'fixed', zIndex: 2000,}}
            // onClick={this.showMenu}/>
            // <Menu mode={"inline"} style={{
            //     width: '50%',
            //     height: '100vh',
            //     top: 0,
            //     left: 0,
            //     position: "fixed",
            //     zIndex: 2000,
            //     display: this.state.visible ? 'block' : "none"
            // }} theme={'dark'}>
            //     <Menu.Item onClick={this.hideMenu}><span className="submenu-title-wrapper d-flex flex-row align-items-center mr-auto"><RollbackOutlined/>Trở Lại</span> </Menu.Item>
            //
            //     <SubMenu
            //         title={<span
            //             className="submenu-title-wrapper d-flex flex-row align-items-center mr-auto">
            //                                                     <SettingOutlined spin={true}/>Setting</span>}>
            //         <Menu.Item className={'d-flex flex-row  align-items-center'}
            //                    onClick={this.handleClick} key="setting:1"> <ContactsOutlined/> Đổi Ảnh Bìa
            //             <input onChange={this.onChangeFile} ref="fileInput" type="file" name="wallpaper"
            //                    style={{display: "none"}}/>
            //         </Menu.Item>
            //         <Menu.Item className={'d-flex flex-row align-items-center'}
            //                    onClick={this.props.logoutHandler} key="setting:2"> <LogoutOutlined/> Logout
            //         </Menu.Item></SubMenu>
            //
            //     <Menu.Item title={'Counting area'} onClick={() =>{ navigate('/bee-home'); this.hideMenu()}}> Counting</Menu.Item>
            //     <Menu.Item title={'Our Story'} onClick={() => {navigate('/our-story'); this.hideMenu()}}> Our Story </Menu.Item>
            //     <Menu.Item title={'New Feed'} onClick={() => {navigate('/new-feed'); this.hideMenu()}}> New Feed </Menu.Item>
            //     <Menu.Item title={'AlBum'} onClick={() => {navigate('/images'); this.hideMenu()}}> Album </Menu.Item>
            // </Menu>
        )
    }
}

export default Narbar;