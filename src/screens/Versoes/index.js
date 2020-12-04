import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
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

import VersoesItem from '../../components/VersoesItem';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getVersoes = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getVersoes();
        
        if(!res.error) {            
            setList(res.result);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    useEffect(()=>{
        getVersoes();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getVersoes();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Leia sua versão favorita da Bíblia</HeaderTitle>
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <VersoesItem key={k} data={item} navigation={navigation} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}