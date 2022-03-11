import React, { useState, useEffect } from 'react'
import {
    Container,
    ListMovies
} from './styles'
import { Header } from '../../components/Header'
import { getMoviesSave, deleteMovie } from '../../utils/storage'
import { FavoriteItem } from '../../components/FavoriteItem'
import { useNavigation, useIsFocused } from '@react-navigation/native'

export const Movies = () => {

    const [movies, setMovies] = useState([])
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect(() => {
        let isActive = true

        const getFavotitesMovies = async () => {
            const result = await getMoviesSave('@primereact')

            if (isActive) {
                setMovies(result)
            }
        }

        if (isActive) {
            getFavotitesMovies()
        }

        return () => {
            isActive = false
        }

    }, [isFocused])

    const handleDelete = async (id) => {
        const result = await deleteMovie(id)
        setMovies(result)
    }

    const navigateDetailsPage = (item) => {
        navigation.navigate('Detail', {id: item.id})
    }

    return (
        <Container>
            <Header title='Meus filmes' />
            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <FavoriteItem 
                data={item}
                deleteMovie={ handleDelete }
                navigatePage={() => navigateDetailsPage(item)}
                />}
            />
        </Container>
    )
}


