import './App.css'
//useREf: hook que crea una referencia mutable que perciste en todo el ciclo de vida del componente
import { useEffect, useState, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import debounce from 'just-debounce-it'
// const URL_ENDPOINT_SEARCH = 'http://www.omdbapi.com/?apikey=4287ad07&s=Avengers'


//Custom hook para actualizar la busqueda
function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  
   

   //Validaciones

   useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === ''){
      setError('No se puede buscar una pelicula vacía')
      return
    }

    setError(null)
  },[search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})
  
  // Buena practica, en vez de utilizar el hook useRef 
  // trabajamos el formulario con js recuperando info del dom
  // si tuviesemos 10 input no necesitariamos 10 hooks
  // nos devolveria un object con todos los impiut del formulario
  
  //En este caso estamos manejando de forma controlada el form
  
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    , 500})
    , []
    )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }
  


  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }




  return (
    <div className='page'>
      <header>
        <h1>Movie Star</h1>
        <form className='form' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars' />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type='submit'>Search</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={ movies } />
        }
      </main>

    </div>
  )
}

export default App
