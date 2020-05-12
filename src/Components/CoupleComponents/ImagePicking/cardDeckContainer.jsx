import React, {Component} from 'react';
import Deck from "./imagePicking";
class CardDeckContainer extends Component {
    render() {
        console.log(this.props.cards)
        return (
            <div className={'card-deck-container'}>
                <Deck cards={this.props.cards}/>
            </div>
        );
    }
}

export default CardDeckContainer;