import React, { useState,memo } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import ClearIcon from '@mui/icons-material/Clear';
import Rating from '@mui/material/Rating';


const FilterBox = ({priceHandler,setPrice,price,categories,setCategory,category,ratings,setRatings}) => {
  const [filterIcon, setfilterIcon] = useState(true)
  const [flipIcon, setflipIcon] = useState(true)

  const filterIconHandler = () => {
    setTimeout(() => {
      setfilterIcon(!filterIcon);
    }, 166);
    setflipIcon(!flipIcon);
  }
  return (
    <div className='filter-box-container'>
      <div className={`filter-box-heading ${flipIcon ? '' : 'swipe'}`}>
        <div onClick={filterIconHandler}>
          <div className={`filter-box-heading-icon ${flipIcon ? 'flip' : 'upflip'}`} >
            {filterIcon ? <FilterAltIcon /> : <ClearIcon />}
          </div>
          <h3>FilterBox</h3>
        </div>
      </div>
      <button onClick={filterIconHandler}><FilterAltIcon />Filter</button>
      
      <div className={`filter-box ${flipIcon ? '' : 'show-filter-box'}`} >
      <div onClick={filterIconHandler} className='filter-box-heading-phone' >
      <ClearIcon /><h3>FilterBox</h3>
      </div>
        <div className='filter-box-price'>
          <h4>Price:</h4>
          <div>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            /> <div className='filter-box-price-input'>
              <div>
                <input type={'number'} value={price[0]} onChange={(e)=>setPrice([e.target.value,price[1]])}/><p>Min</p>
              </div>
              <div>
                <input type={'number'} value={price[1]} onChange={(e)=>setPrice([price[0],e.target.value])} /><p>Max</p>
              </div>
            </div>
          </div>
        </div>
        <div className='filter-box-category'>
          <div>
            <h4>Categories:</h4>
            <input value={category} placeholder='Select or Search' type={'text'} onChange={(e) => setCategory(e.target.value)}/>
          </div>
          <ul>
            {categories.map((category,index) => (
              <li
                key={index}
                onClick={(e) => setCategory(e.target.innerText)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className='filter-box-rating'>
          <h4>Ratings:</h4>
          <Rating
            name="half-rating"
            value={ratings}
            precision={0.5}
            onChange={(e)=>setRatings(e.target.value)}
          />
        </div>
      </div>

    </div>
  )
}

export default memo(FilterBox)

/*
<Slider
            value={5}
            onChange={()=>console.log('Rating')}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
*/