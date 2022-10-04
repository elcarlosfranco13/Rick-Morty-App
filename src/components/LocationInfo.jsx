import React from 'react'
import locationInfo from "./styles/locationInfo.css"

const LocationInfo = ({location}) => {

  return (
    <article className='planet__info'>
      <h2 className='planet__title'>{location?.name}</h2>
      <ul className='planet__description'>
        <li className='planet__atribute'><span>Tipe: </span>{location?.type}</li>
        <li className='planet__atribute'><span>Dimension: </span>{location?.dimension}</li>
        <li className='planet__atribute'><span>Population: </span>{location?.residents.length}</li>
      </ul>


    </article>

    
  )
}

export default LocationInfo