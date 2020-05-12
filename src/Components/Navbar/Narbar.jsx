import React, {Component} from 'react';
import {Menu} from "antd";
import {SettingOutlined, ContactsOutlined} from "@ant-design/icons";
import {navigate} from "@reach/router";
import UploadImageToFireBase from "../HandleImage/UploadImageToFireBase";

class Narbar extends Component {
    constructor(props) {
        super(props);
        this.state = {file: ''}
        this.handleClick = this.handleClick.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
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

    render() {
        const {SubMenu} = Menu
        return (
            // <Menu theme={'light'}  style={{top:0, left:3, fontSize:'2rem', border:'0px', position:'fixed', zIndex: '1221', color:'white', backgroundColor:'transparent '}}
            //     key={'general-setting'} mode={'vertical-left'} openKeys={'sub1'} onClick={item => this.onClick(item)}>
            // </Menu>
            <Menu selectedKeys={[this.state.current]} mode="horizontal" theme={'dark'} style={{
                top: 0,
                left: 0,
                border: '0px',
                position: 'fixed',
                zIndex: '1221',
                color: 'white',
                width: '100%',
                // backgroundColor: 'transparent '
            }}>
                <SubMenu
                    title={
                        <span
                            className="submenu-title-wrapper d-flex flex-row justify-content-center align-items-center mr-auto">
              <SettingOutlined spin={'true'}/>
              Setting
            </span>
                    }
                >
                        <Menu.Item className={'d-flex flex-row justify-content-center align-items-center'}
                                   onClick={this.handleClick} key="setting:1"> <ContactsOutlined/> Đổi Ảnh Bìa
                        </Menu.Item>
                    <input onChange={this.onChangeFile} ref="fileInput" type="file" name="wallpaper"
                           style={{display: "none"}}/>
                </SubMenu>
                <Menu.Item title={'Counting area'} onClick={() => navigate('/bee-home')}> Counting</Menu.Item>
                <Menu.Item tite={'Our Story'} onClick={() => navigate('/our-story')}> Our Story </Menu.Item>
                <Menu.Item tite={'AlBum'} onClick={()=> navigate('/images')}> Ảnh </Menu.Item>

            </Menu>

        );
    }
}

export default Narbar;