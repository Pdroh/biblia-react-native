import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,

    SearchArea,
    SearchInput,
    SearchButton,

    LoadingIcon,
    ListArea
} from './styles';

import SearchIcon from '../../assets/search.svg';
import SearchItem from '../../components/SearchItem';

import Api from '../../api';

export default () => {
    const navigation = useNavigation();

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState([]);

    const handleSearch = async () => {
        setLoading(true);
        setList([]);

        if(searchText != '') {
            let res = await Api.getPesquisar(searchText);
    
            if(!res.error) {

                const objectArray = Object.entries(res.result);

                //console.log(objectArray);         
                setList(objectArray);
            } else {
                alert("Erro: "+res.error);
            }
        }

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        handleSearch();
    }

    useEffect(()=>{

    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Procurar</HeaderTitle>
                </HeaderArea>


                <SearchArea>
                    <SearchInput
                        placeholder="O que deseja procurar?"
                        placeholderTextColor="#FFFFFF"
                        value={searchText}
                        onChangeText={t=>setSearchText(t)}
                    />
                    <SearchButton onPress={handleSearch}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </SearchArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <SearchItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}