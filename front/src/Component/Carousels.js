import React from "react";
import { Carousel } from 'antd';


class ControlledCarousel extends React.Component{
    createContent = (ctx) => {
        const images = ctx.keys().map(ctx);
        console.log(images);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
            result.push(
                <div>
                <img className="img-carousel" alt={i} src={img}/>
                </div>
            );
        }
        return result;
    };

    render() {
        const requireContext = require.context("../assets/Carousel", true, /^\.\/.*\.jpg$/)
        return (
            <Carousel dotPosition={"top"} autoplay >
                    {this.createContent(requireContext)}
            </Carousel>
        )
    }
}
export default ControlledCarousel;