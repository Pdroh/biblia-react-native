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

import VersiculoItem from '../../components/VersiculoItem';

export default ({ route }) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getVersiculos = async (idVersao, idTestamento, idLivro, idCapitulo) => {
        setLoading(true);
        setList([]);

        let res = await Api.getVersiculos(idVersao, idTestamento, idLivro, idCapitulo);
        
        if(res.error === "") {            
            setList(Object.values(res.result));
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getVersiculos(route.params?.idVersao, route.params?.idTestamento, route.params?.idLivro, route.params?.idCapitulo);
    }

    React.useEffect(() => {
        if (route.params?.idTestamento) {
            getVersiculos(route.params?.idVersao, route.params?.idTestamento, route.params?.idLivro, route.params?.idCapitulo);
        }
      }, [route.params?.idVersao, route.params?.idTestamento, route.params?.idLivro, route.params?.idCapitulo, route.params?.txtLivro]);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Versiculos</HeaderTitle>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <VersiculoItem key={k} idVersao={route.params?.idVersao} idLivro={route.params?.idLivro} txtLivro={route.params?.txtLivro} txtCapitulo={route.params?.idCapitulo} data={item} navigation={navigation} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}