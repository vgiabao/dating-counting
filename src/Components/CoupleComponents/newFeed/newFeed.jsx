import React, {Component} from 'react';
import Avatars from "../Avatars";
import CurrentPost from "./currentPost";
import PrePost from './prePost'

class NewFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusData: this.props.statusData
        }

    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.statusData !== nextProps.statusData){
            console.log('changed')
            console.log(this.props.statusData.length, nextProps.statusData.length);
            this.setState({statusData: nextProps.statusData});
        }
    }
    componentDidMount() {
        window.scrollTo(0 , 0)
    }


    render() {
        let statusArray = this.state.statusData.map(item => <PrePost
            content={item.content}
            owner={item.owner}
            baoImage={this.props.baoImage}
            nhiImage={this.props.nhiImage} date={item.date}
            id={item.id} emotion={item.emotion}
            lover_1_name={this.props.lover_1_name}
            lover_2_name={this.props.lover_2_name}
            gender={this.props.gender}
        />);
        // console.log(statusArray.length);
        return (

            <div className={'container'} style={{overflowX: 'hidden'}}>
                <br/>
                <br/>

                <Avatars {...this.props}/>
                <div className={'container-fluid newFeedPostSize'} style={{backgroundColor: 'gray'}}>
                    <hr style={{color: 'white'}}/>
                    <CurrentPost baoImage={this.props.baoImage}
                                 nhiImage={this.props.nhiImage} handlePostStatus={this.props.handlePostStatus}
                                 gender={this.props.gender}/>
                    {statusArray}
                </div>
            </div>
        );
    }
}

export default NewFeed;