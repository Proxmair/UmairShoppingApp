import React ,{memo}from 'react';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
const message="slider image"
const ImageSlider = ({banners}) => {
  return (
    <div className='coursel-container'>
      <Carousel dynamicHeight={true} showArrows={false} swipeable={true} autoPlay={true} autoFocus={true} emulateTouch={true} infiniteLoop={true} >
        {banners.map((banner,index)=>(
          <div key={index}>
          <img src={banner.image.url} alt={message}/>
          </div>
        ))}
        </Carousel>
    </div>
    
  )
}

export default memo(ImageSlider)
