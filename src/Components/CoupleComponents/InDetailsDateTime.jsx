import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops-universal";

class InDetailsDateTime extends Component {
    constructor(props) {
        super(props);
        this.date = new Date();
        this.state = {
            second: this.date.getSeconds()
        }
        this.currentDateTime = this.currentDateTime.bind(this)

    }

    currentDateTime() {
        let date = new Date()
        this.setState(
            {second: date.getSeconds()}
        )
    }

    componentWillMount() {
        setInterval(this.currentDateTime, 1000)

    }


    render() {

        return (
            // <Spring>
            //     {props => ( <div>
            //
            //     </div>)
            //     }
            // </Spring>
            <div>
            <div className={'text-center'} style={{color: 'white'}}> {this.state.second}</div>
            </div>
        );
    }
}

export default InDetailsDateTime;