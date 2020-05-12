import React, {Component, memo} from 'react';
import './App.css';
import firebase from "./Components/Authentication/Firebase";
import MainPage from './Components/MainPage'
import Navbar from "./Components/Navbar/Narbar";
import {navigate} from "@reach/router";
import CardDeckContainer from "./Components/CoupleComponents/ImagePicking/cardDeckContainer";

class App extends Component {
    constructor() {
        super();
        this.state = {
            password: null,
            isLogged: false,
            baoImages: '',
            nhiImages: '',
            wallpaperImages: '',
            notes: null,
            memoryData: [],
            memoryImageArr: [],
            pulledKeyContent: [],
            pulledKeyImages: [],
            nhiName: '',
            baoName: '',
            tarotImages: []

        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.getPassWord = this.getPassWord.bind(this);
        this.getImagesData = this.getImagesData.bind(this);
        this.getMemoryData = this.getMemoryData.bind(this);
        this.getTarotImages = this.getTarotImages.bind(this);

    }

    componentDidMount() {
        this.getPassWord();
        this.getImagesData('baoImages');
        this.getImagesData('wallpaperImages');
        this.getImagesData('nhiImages');
        this.getDailyNotes();
        this.getMemoryData();
        this.getTarotImages();
        if (this.state.isLogged || localStorage.getItem('isLogged') === 'true') {
            navigate('/bee-home')
        }
    }

    handleFormatDate() {
        let recentDay = new Date()
        return recentDay.getDate() + '-' + (recentDay.getMonth() + 1) + '-' + recentDay.getFullYear();

    }

    getLastObjectValue(object) {
        var keys = Object.keys(object || {})
        let lastValueInSnapShot = keys[keys.length - 1]
    }

    getTarotImages() {
        const ref = firebase.database().ref('Images/tarotImages')
        ref.on('value', snapShot => {
            const imageData = Object.keys(snapShot.val()).map(key => this.setState({tarotImages: [...this.state.tarotImages, snapShot.val()[key]]}))
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
                if (imageData) Object.keys(imageData).forEach(key => {
                    if (!this.isIncludes(this.state.pulledKeyImages, key)) {
                        this.setState({memoryImageArr: [...this.state.memoryImageArr, imageData[key]]});
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
            var keys = Object.keys(snapshot.val() || {})
            let lastValueInSnapShot = keys[keys.length - 1]
            this.setState({[type]: imageData[lastValueInSnapShot][type]})
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
        const ref = firebase.database().ref(`Notes/${this.handleFormatDate()}`);
        ref.push({sender: sender, receiver: receiver, content: content});
    }

    handlePostMemoryData(title, content, date) {
        const ref = firebase.database().ref('Memories/' + date);
        ref.push({title: title, content: content, date: date});
    }


    async handleStorageMemoryImages(fileList, date) {
        let curentDate = new Date()
        let dirName = curentDate.getHours() + ':' + curentDate.getMinutes() + ':' + curentDate.getSeconds() + '-' + curentDate.getUTCDate() + '-' + curentDate.getUTCMonth() + '-' + curentDate.getFullYear()
        const urlArr = await fileList.map(async image => {
            const memoryRef = firebase.storage().ref('Memories/' + date + '/' + image.name);
            await memoryRef.put(image).then(res => {
                const imageUrl = firebase.storage().ref('Memories/' + date + '/').child(image.name).getDownloadURL().then(res => {
                    const ref = firebase.database().ref('Memories/' + date + '/images/' + dirName);
                    ref.push(res)
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


    render() {
        return (
            <div>
                {this.state.isLogged || localStorage.getItem('isLogged') ?
                    <Navbar handleStorageImages={this.handleStorageImages}/> : null}
                <MainPage wallpaperImage={this.state.wallpaperImages} password={this.state.password}
                          isLogged={this.state.isLogged}
                          handleLogin={this.handleLogIn} handlePostImage={this.handlePostImage}
                          baoImage={this.state.baoImages} handleStorageImages={this.handleStorageImages}
                          nhiImage={this.state.nhiImages} handlePostNote={this.handlePostNote}
                          handleFormatDate={this.handleFormatDate}
                          notes={this.state.notes} handlePostMemoryData={this.handlePostMemoryData}
                          handleStorageMemoryImages={this.handleStorageMemoryImages} memoryData={this.state.memoryData}
                          memoryImageArr={this.state.memoryImageArr} tarotImages={this.state.tarotImages}/>
            </div>
        );
    }
}

export default App;
