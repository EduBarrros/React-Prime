import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import {
    Container,
    SearchContainer,
    SearchButton,
    Input,
    Title,
    Banner,
    BannerButton,
    SliderMovie
} from './styles'
import { Header } from '../../components/Header'
import { Feather } from '@expo/vector-icons'
import { SliderItem } from '../../components/SliderItem'
import { api, key } from '../../services/api'
import { getListMovies } from '../../utils/movie'

export const Home = () => {

    const [nowMovies, setNowMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {
        let isActive = true

        const getMovies = async () => {

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-br',
                        page: 1,
                    }
                }
                ),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-br',
                        page: 1,
                    }
                }
                ),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-br',
                        page: 1,
                    }
                }
                )
            ])

            const nowList = getListMovies(10, nowData.data.results)
            const popularList = getListMovies(5, popularData.data.results)
            const topList = getListMovies(5, topData.data.results)

            setNowMovies(nowList)
            setPopularMovies(popularList)
            setTopMovies(topList)
        }

        getMovies()

    }, [])

    return (
        <Container>
            <Header title="React Prime" />
            <SearchContainer>
                <Input
                    placeholder='Ex Vingadores'
                    placeholderTextColor='#ddd'
                />
                <SearchButton>
                    <Feather name='search' size={30} color='#fff' />
                </SearchButton>
            </SearchContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Title>Em cartaz</Title>
                <BannerButton
                    activeOpacity={0.9}
                    onPress={() => alert('Teste')}
                >
                    <Banner
                        resizeMethod='resize'
                        source={{ uri: 'https://images.unsplash.com/photo-1602461601079-fb03b7b35e61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlsbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' }}
                    />
                </BannerButton>
                <SliderMovie
                    horizontal={true}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtrator={(item) => String(item.id)}
                />
                <Title>
                    Populares
                </Title>
                <SliderMovie
                    horizontal={true}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtrator={(item) => String(item.id)}
                />
                <Title>
                    Mais votados
                </Title>
                <SliderMovie
                    horizontal={true}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtrator={(item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}


