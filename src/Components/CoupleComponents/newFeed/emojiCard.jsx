import React, {Component} from 'react';

class EmojiCard extends Component {
    constructor() {
        super();
        this.state = {
            checked: false
    }
    this.handleClickEmojiCard = this.handleClickEmojiCard.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.checked !== nextProps.checked) {
            this.setState({checked: nextProps.checked})
        }
    }
    handleClickEmojiCard(){
        if (this.state.checked === true){
            this.setState({checked: false});
            this.props.removeEmoji();
            this.props.removeEmotion();
        }
        else{
            this.setState({checked: true});
            this.props.handleEmoji(this.props.emoji);
            this.props.handleEmotion(this.props.emotion);
        }
    }


    render() {
        return (
            <div className={'row p-2'} style={{borderBottom: '1px solid black'}} onClick={this.handleClickEmojiCard}>
                <div className={'col-2'}> {this.props.emoji} </div>
                <div className={'col-8'}> {this.props.emotion}</div>
                <i className="h3 fa fa-check-circle-o" aria-hidden="true"
                   style={{color: this.state.checked ? 'green' : null}}/>

            </div>
        );
    }
}

export default EmojiCard;