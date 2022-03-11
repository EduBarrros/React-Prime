import React from 'react'
import {
    Container,
    Banner,
    Title,
    Rate,
    RateContainer
} from './styles'
import { Ionicons } from '@expo/vector-icons'

export const SearchItem = ({ data, navigatePage }) => {

    const detailMovie = () => {
        if(data.release_date === ''){
            alert('O filme não foi lançado ainda')
            return
        }
        navigatePage(data)
    }

    return (
        <Container
            activeOpacity={0.7}
            onPress={() => detailMovie()}
        >
            {data?.poster_path ? (
                <Banner
                    resizeMethod='resize'
                    source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }}
                />
            ) : (
                <Banner
                    resizeMethod='resize'
                    source={require('../../assets/NotFound.png')}
                />
            )}
            <Title>
                {data?.title}
            </Title>
            <RateContainer>
                <Ionicons name='md-star' size={12} color='#E7A74e' />
                <Rate>
                    {data?.vote_average}/10
                </Rate>
            </RateContainer>
        </Container>
    )
}