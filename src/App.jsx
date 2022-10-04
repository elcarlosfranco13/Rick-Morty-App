import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import getRandomNumber from './getRandomNumber'
import videoplayback from "./assets/videoplayback.webm"
import logorick from "./assets/logorick.png"

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
      <header className='title__container'>
        <video className='video' src={videoplayback} autoPlay muted loop></video>
        <img className='title__image' src={logorick} alt="" />
        <form className='title__form' onSubmit={handleSubmit}>
      <input className='input_box'
        id="idLocation"
        placeholder='Enter a # from 1 to 126'
        type="text"
        onChange={handleChange} 
        />
      <button className='button__search'>Search</button>
      < FilterList 
        suggestedList={suggestedList}
        setSearchInput={setSearchInput}
        />
      </form>
      </header>
      
      
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
