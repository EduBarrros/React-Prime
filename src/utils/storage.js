import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMoviesSave = async (key) => {
    const myMovies = await AsyncStorage.getItem(key)

    let moviesSave = JSON.parse(myMovies) || []

    return moviesSave
}

export const saveMovie = async (key, newMovie) => {
    let moviesStored = await getMoviesSave(key)

    const hasMovie = moviesStored.some(item => item.id === newMovie.id)

    if(hasMovie){
        return
    }

    moviesStored.push(newMovie)

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored))
}

export const deleteMovie = async (id) => {
    let moviesStored = await getMoviesSave('@primereact')

    let myMovies = moviesStored.filter(item => {
        return(
            item.id !== id
        )
    })

    await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies))

    return myMovies
}

export const hasMovie = async (movie) => {
    let moviesStored = await getMoviesSave('@primereact')

    const hasMovie = moviesStored.find( item => item.id === movie.id)

    if(hasMovie){
        return true
    }

    return false
}