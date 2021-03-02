import React, {Component, memo} from 'react';
import './App.css';
import firebase from "./Components/Authentication/Firebase";
import MainPage from './Components/MainPage'
import Navbar from "./Components/Navbar/Narbar";
import {navigate} from "@reach/router";

class App extends Component {
    constructor() {
        super();
        this.state = {
            password: null,
            isLogged: false,
            baoImages: '',
            huyenImages: '',
            wallpaperImages: '',
            notes: null,
            memoryData: [],
            memoryImageArr: [],
            pulledKeyContent: [],
            pulledKeyImages: [],
            lover_1_name: '',
            lover_2_name: '',
            gender: '',
            status: [],
            owlImages: [],
            albums: [],


        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.getPassWord = this.getPassWord.bind(this);
        this.getImagesData = this.getImagesData.bind(this);
        this.getMemoryData = this.getMemoryData.bind(this);
        this.handlerGender = this.handlerGender.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.getGender = this.getGender.bind(this);
        this.getStatusData = this.getStatusData.bind(this);
        this.fetchLoverName = this.fetchLoverName.bind(this);

    }

    componentDidMount() {
        this.getPassWord();
        this.getImagesData('baoImages');
        this.getImagesData('wallpaperImages');
        this.getImagesData('huyenImages');
        this.getDailyNotes();
        this.getMemoryData();
        this.getGender();
        this.getStatusData();
        this.fetchLoverName('lover_1_name');
        this.fetchLoverName('lover_2_name');
        if (this.state.isLogged || localStorage.getItem('isLogged') === 'true') {
            this.setState({gender: localStorage.getItem('gender')});
            navigate('/bee-home')
        }
    }

    handleRegister(){

    }

    fetchAlbums(){

    }

    getGender() {
        //    get gender if user currently login
        this.setState({gender: localStorage.getItem('gender')});
    }

    handleFormatDate() {
        let recentDay = new Date()
        return recentDay.getDate() + '-' + (recentDay.getMonth() + 1) + '-' + recentDay.getFullYear();

    }

    getLastObjectValue(object) {
        var keys = Object.keys(object || {})
        let lastValueInSnapShot = keys[keys.length - 1]
    }

    fetchLoverName(loverType) {
        const path = firebase.database().ref('details/' + loverType);
        path.on('value', snapShot => {
            const lastNameKey = Object.keys(snapShot.val())[Object.keys(snapShot.val()).length - 1];
            console.log('key: ', lastNameKey);
            this.setState({[loverType]: snapShot.val()[lastNameKey][loverType]});
        })
    }


    isIncludes(givenArr, item) {
        let arr = [...givenArr]
        return arr.includes(item)
    }

    getMemoryData() {
        const memoryRef = firebase.database().ref('/Memories')
        memoryRef.on('value', snapshot => {
            const value = snapshot.val()
            const key = Object.keys(value).forEach(item => {
                Object.keys(value[item]).forEach(key => {
                    if (key !== 'images' && !this.isIncludes(this.state.pulledKeyContent, key)) {
                        this.setState({memoryData: [value[item][key], ...this.state.memoryData]});
                        this.setState({pulledKeyContent: [key, ...this.state.pulledKeyContent]})
                    }
                })
                let imageData = value[item].images;
                let newOldImages = [];
                if (imageData) Object.keys(imageData).forEach(key => {
                    if (!this.isIncludes(this.state.pulledKeyImages, key)) {
                        newOldImages.unshift(imageData[key]);
                        this.setState({memoryImageArr: [...this.state.memoryImageArr, imageData[key]]});
                        this.setState({owlImages: [...this.state.owlImages, imageData[key]]});
                        this.setState({pulledKeyImages: [...this.state.pulledKeyImages, key]})
                    }
                })
            })
        })
    }
    getImagesData(type) {
        const imageRef = firebase.database().ref('Images/' + type)
        imageRef.on('value', snapshot => {
            let imageData = snapshot.val()
            console.log('img data',imageData)
            const keys = Object.keys(snapshot.val() || {})
            let lastValueInSnapShot = keys[keys.length - 1]
            console.log('type', type)
            this.setState({[type]: imageData[lastValueInSnapShot][type]})
        })
    }
    getStatusData() {
        const statusRef = firebase.database().ref('Status');
        statusRef.on('value', snapshot => {
            let status = [];
            let statusData = snapshot.val();
            const keys = Object.keys(statusData || {});
            for (let item of keys) {
                statusData[item].id = item;
                status.unshift(statusData[item]);
                // this.setState({status: [statusData[item], ...this.state.status]})
            }
            this.setState({status: status})
        })
    }

    getPassWord() {
        const ref = firebase.database().ref('password')
        ref.on('value', snapshot => {
            this.setState({password: snapshot.val()})
        })
    }

    getDailyNotes() {
        const dailyNoteRef = firebase.database().ref('Notes/' + this.handleFormatDate());
        dailyNoteRef.on('value', snapshot => {
            let noteData = snapshot.val();
            this.setState({notes: noteData});
        })
    }


    handleLogIn() {
        this.setState({
            isLogged: true
        })
        window.localStorage.setItem('isLogged', 'true')
    }

    handlePostImage(type, imageUrl) {
        const ref = firebase.database().ref(`Images/${type}`);
        ref.push({[type]: imageUrl});
    }


    handlePostNote(sender, receiver, content) {
        console.log('post node')
        const ref = firebase.database().ref(`Notes/${this.handleFormatDate()}`);
        ref.push({sender: sender, receiver: receiver, content: content});
    }

    handlePostMemoryData(title, content, date, currentTime) {
        const ref = firebase.database().ref('Memories/' + date + '/').child(currentTime);
        if (title && content && date) {
            ref.set({title: title, content: content, date: date});
        }}

    handlePostStatus(gender, content, date, emotion, currentTime) {
        const ref = firebase.database().ref('Status/'+ currentTime);
        ref.setValue({emotion: emotion, content: content, date: date, owner: gender, like: 0, likeArray: []});
    }



    async handleStorageMemoryImages(fileList, date, currentTime) {
        const urlArr = await fileList.map(async image => {

            const memoryRef = firebase.storage().ref('Memories/' + date + '/' + image.name);
            await memoryRef.put(image).then(res => {
                console.log( firebase.storage().ref('Memories/' + date + '/').child(image.name));
                const imageUrl = firebase.storage().ref('Memories/' + date + '/').child(image.name).getDownloadURL().then(res => {
                    const ref = firebase.database().ref('Memories/' + date+ '/' + currentTime).child('images').push();
                    ref.set(res)
                })
            })
        })
    }

    handleStorageImages(file, type) {
        let date = new Date()
        let fileName = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '-' + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getFullYear() + '-' + file.name;
        const storageRef = firebase.storage().ref(type + '/' + fileName);
        storageRef.put(file).then(res => {
            const imageUrl = firebase.storage().ref(type + '/').child(fileName).getDownloadURL().then(res => {
                const ref = firebase.database().ref(`Images/${type}`);
                ref.push({[type]: res});
            })
        })
    }




    handlerGender(value) {
        this.setState({gender: value});
        localStorage.setItem('gender', value);
    }

    logoutHandler() {
        console.log("ig logged out ");
        this.setState({isLogged: false});
        localStorage.removeItem('isLogged');
        localStorage.removeItem('gender');
        navigate('/')
    }

    render() {
        return (
            <div>
                {this.state.isLogged || localStorage.getItem('isLogged') ?
                    <Navbar handleStorageImages={this.handleStorageImages} isLogged={this.state.isLogged}
                            logoutHandler={this.logoutHandler}/> : null}
                <MainPage wallpaperImage={this.state.wallpaperImages} password={this.state.password}
                          isLogged={this.state.isLogged}
                          handleLogin={this.handleLogIn} handlePostImage={this.handlePostImage}
                          baoImage={this.state.baoImages} handleStorageImages={this.handleStorageImages}
                          huyenImage={this.state.huyenImages} handlePostNote={this.handlePostNote}
                          handleFormatDate={this.handleFormatDate}
                          notes={this.state.notes} handlePostMemoryData={this.handlePostMemoryData}
                          handleStorageMemoryImages={this.handleStorageMemoryImages} memoryData={this.state.memoryData}
                          memoryImageArr={this.state.memoryImageArr}
                          handlerGender={this.handlerGender} gender={this.state.gender}
                          handlePostStatus={this .handlePostStatus} statusData={this.state.status}
                          lover_1_name={this.state.lover_1_name} lover_2_name={this.state.lover_2_name}
                          owlImages={this.state.owlImages}/>
            </div>
        );
    }
}

export default App;
