import React from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
    let pics = [data];
    return (
        <animated.div
            key={i}
            style={{
                transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
            }}
        >
            <animated.div
                {...bind(i)}
                style={{
                    transform: interpolate([rot, scale], trans)
                }}
            >
                <div className="card">
                    <Carousel>
                        {pics ?  pics.map((pic, index) => (
                            <img className={'tinderCardContainer'} src={pic} key={index} alt="profilePicture" />
                        )) : null}
                    </Carousel>
                </div>
            </animated.div>
        </animated.div>
    );
};

Card.propTypes = {
    name: string,
    age: number,
    distance: string,
    text: string,
    pics: array
};

export default Card;
