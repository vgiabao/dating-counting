import React, {Component} from 'react';
import Avatars from "./Avatars";
import CountingDateTime from "./CountingDateTimeArea/CountingDateTime";
import CoupleName from "./coupleName";
import HourGlass from "./hour-glass/hour-glass";
import OldImages from "./oldImages";
class CountingArea extends Component {
    componentDidMount() {
        console.log('scroll')
        window.scrollTo(0 , -100)
    }

    render() {
        return (
            this.props.isLogged || localStorage.getItem('isLogged') === 'true' ?
                <div className={''}>
                    <HourGlass/>
                    <br/>
                    {/*<br/>*/}
                    {/*<br/>*/}

                    {/*<CountingDateTime handlePostImage={this.props.handlePostImage}*/}
                    {/*                  handleStorageImages={this.props.handleStorageImages} notes={this.props.notes}*/}
                    {/*                  handlePostMemoryData={this.props.handlePostMemoryData} />*/}
                    <br/>

                    {/*<OldImages owlImages={this.props.owlImages}/>*/}
                    {/*<owlImages  owlImages={this.props.owlImages}/>*/}
                    <div style={{marginTop: '140px'}} />
                    <Avatars handlePostImage={this.props.handlePostImage}
                             handleStorageImages={this.props.handleStorageImages} nhiImage={this.props.nhiImage}
                             baoImage={this.props.baoImage} handlePostNote={this.props.handlePostNote}
                             handleFormatDate={this.props.handleFormatDate} />
                    <CoupleName/>

                </div> : null
        );
    }
}

export default CountingArea;