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

import TestamentoItem from '../../components/TestamentoItem';

export default ({ route }) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getTestamento();
        
        if(!res.error) {            
            setList(res.result);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    useEffect(()=>{
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Testamentos</HeaderTitle>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <TestamentoItem key={k} data={item} idVersao={route.params?.idVersao} navigation={navigation} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}