export function ListOfMovies({ movies }){

    return (
        <ul className="movies">
              {movies.map(movie =>
                <li className="movie" key={movie.id}>
                  <p>{movie.title} - ({movie.year})</p>
                  <img src={movie.poster} alt={movie.title} />
                </li>
                )}
            </ul>
    )
}

export function NoMoviesResults (){


    return (
        <p>No se encontraron películas para esta búsqueda</p>
    )
}

export function Movies ({ movies }){
    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
}