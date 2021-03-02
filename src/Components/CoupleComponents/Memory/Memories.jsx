import React, {Component} from 'react';
import TimeLine from "./TimeLine";
import CountingArea from "../CountingArea";

class Memories extends Component {
    componentDidMount() {
        window.scrollTo(0 , 0)
    }


    render() {

        return (
            <div className={'text-center container-fluid'}>
                <h1 className={'d-inline-block mt-5'} style={{
                    fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                    color: 'white',
                    fontSize: '4rem',
                    borderBottom: '2px solid white',
                }}> Chuyện Tụi Mình </h1>
                <TimeLine handlePostMemoryData={this.props.handlePostMemoryData}
                          handleStorageMemoryImages={this.props.handleStorageMemoryImages}
                          memoryData={this.props.memoryData} memoryImageArr={this.props.memoryImageArr}/>
                <hr/>

            </div>
        );
    }
}

export default Memories;
