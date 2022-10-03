import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import getRandomNumber from './getRandomNumber'

function App() {
  // Acceder a la API
  const [location, setLocation] = useState()
  // el valor del Input
  const [searchInput, setSearchInput] = useState("")
  // el valor de las sugerencias
  const [suggestedList, setSuggestedList] = useState()
  // Cuando el valor no se encuentra
  const [hasError, setHasError] = useState(false)


  useEffect (()=>{ 
    let id = getRandomNumber()
    if(searchInput){
      id = searchInput
    }
    
    const URL = `https://rickandmortyapi.com/api/location/${id}`
    
    axios.get(URL)
    .then(res=> {
      setHasError(false)
      setLocation(res.data)
    })
    .catch(err=>setHasError(true))
  },[searchInput])


  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event =>{ 

    if(event.target.value === ""){
      setSuggestedList()
    } else{
      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

    axios.get(URL)
    .then(res=> setSuggestedList(res.data.results))
    .catch(err => console.log(err))
    }

  } 


  return (
    <div className="App">
      <h1>Rick & Morty App</h1>
      <form onSubmit={handleSubmit}>
      <input
        id="idLocation"
        placeholder='Enter a # from 1 to 126'
        type="text"
        onChange={handleChange} 
        />
      <button>Search</button>
      < FilterList 
        suggestedList={suggestedList}
        setSearchInput={setSearchInput}
        />
      </form>
      {
        hasError ?
          <ErrorScreen />
        :
          <>
            <LocationInfo location={location}/>
            <div className='card-container'>
              {
                location?.residents.map(url =>(
                  <ResidentCard 
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }

      
    </div>
  )
}

export default App
