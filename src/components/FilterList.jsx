import React from 'react'
import filterList from "./styles/filterList.css"

const FilterList = ({suggestedList,setSearchInput}) => {


  const handleClick = id => setSearchInput(id)


  return (
    <ul className='list__suggestions'>
      {
        suggestedList?.map(location =>(
          <li onClick={() => handleClick(location.id)} key={location.id}>{location.name}</li>
        ))
      }

    </ul>
  )
}

export default FilterList