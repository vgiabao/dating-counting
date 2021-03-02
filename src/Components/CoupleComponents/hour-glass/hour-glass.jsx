import React, {Component} from 'react';
import firebase from "../../Authentication/Firebase";

class HourGlass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startingDay: '',
            gap: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        };
        this.minusTime = this.minusTime.bind(this);
        this.handleSecond = this.handleSecond.bind(this);
    }

    getStatingDay() {
        const ref = firebase.database().ref('details/startingDay');
        ref.on('value', snapShot => {
            this.setState({
                startingDay: snapShot.val()
            });
            console.log('date from db', snapShot.val())
        });

    }

    minusTime() {
        const date = Date.now();
        console.log('day in string', this.state.startingDay);
        const startingDay = new Date(this.state.startingDay);
        console.log('currentDay', startingDay);
        let gap = (date - startingDay) / 1000; //second
        const day = Math.floor(gap / 60 / 60 / 24);
        gap -= day * 60 * 60 * 24;
        const hour = Math.floor((gap) / 60 / 60);
        gap -= hour * 60 * 60;
        console.log('current gap,', gap);
        const minute = Math.floor((gap) / 60);
        gap -= minute * 60;
        this.setState({gap: gap, day: day, hour: hour, minute: minute, second: Math.floor(gap)});


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.startingDay !== this.state.startingDay) {
            this.minusTime();
        }
    }

    handleSecond() {
        setInterval(() => {
            if (this.state.second === 59) {
                this.setState({minute: this.state.minute + 1, second: 0})
            } else this.setState({second: this.state.second + 1});
            if (this.state.minute === 60){
                this.setState({minute: 0, hour: this.state.hour + 1})
            }
            if (this.state.hour === 24){
                this.setState({hour: 0, day: this.state.day + 1})
            }
        }, 1000)
    }

    componentDidMount() {
        this.getStatingDay();
        this.minusTime();
        this.handleSecond();

    }

    render() {
        return (
            <div className='glasshour-container'>
                <div className="top-glass3"/>
                <div className="top-glassp3" style={{height: 20 + 100 + 'px', top: 372 - 100 + 'px'}}/>
                <div className="glassp3"/>
                <div className="middle3"/>
                <div className="glass3"/>
                <div className="band3"/>
                <div className="band7"/>
                <i className="fa fa-heart points6" aria-hidden="true"/>
                <i className="fa fa-heart points7" aria-hidden="true"/>
                <i className="fa fa-heart points8" aria-hidden="true"/>
                <div className={'text-top-glass3 bold'} style={{color: 'white'}}>
                    <div> {this.state.day} days </div> <div> {this.state.hour}  hours </div>
                    <div> {this.state.minute} minutes </div>
                    <div >{this.state.second < 10 ? '0' + this.state.second : this.state.second} seconds </div>
                    <div className={'highlighted-text-top-glass3'}> in love!</div>
                </div>
            </div>
        );
    }
}

export default HourGlass;
