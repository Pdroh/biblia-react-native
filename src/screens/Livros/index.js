import React, { useState, useEffect } from 'react';
import { RefreshControl, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../api';

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,


    LoadingIcon,
    ListArea
} from './styles';

import LivroItem from '../../components/LivroItem';

export default ({ route }) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [codtestamento, setIdTestamento ] = useState(0);

    const getLivros = async (idTestamento) => {
        setLoading(true);
        setList([]);

        let res = await Api.getLivros(idTestamento);
        
        if(!res.error) {            
            setList(res.result);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getLivros(route.params?.idTestamento);
    }

    React.useEffect(() => {
        if (route.params?.idTestamento) {
            setIdTestamento(route.params?.idTestamento);
            getLivros(route.params?.idTestamento);
        }
      }, [route.params?.idTestamento, route.params?.idVersao]);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Livros</HeaderTitle>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <LivroItem key={k} data={item} idVersao={route.params?.idVersao} idTestamento={route.params?.idTestamento} navigation={navigation} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}