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

import CapituloItem from '../../components/CapituloItem';

export default ({ route }) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getCapitulos = async (idVersao, idTestamento, idLivro) => {
        setLoading(true);
        setList([]);

        let res = await Api.getCapitulos(idVersao, idTestamento, idLivro);
        
        if(!res.error) {            
            setList(Object.values(res.result));
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getCapitulos(route.params?.idVersao, route.params?.idTestamento, route.params?.idLivro);
    }

    React.useEffect(() => {
        if (route.params?.idTestamento) {
            getCapitulos(route.params?.idVersao, route.params?.idTestamento, route.params?.idLivro);
        }
      }, [route.params?.idVersao, route.params?.idTestamento, route.params?.idLivro]);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Capitulos</HeaderTitle>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <CapituloItem 
                            key={k} 
                            data={item} 
                            idVersao={route.params?.idVersao} 
                            idTestamento={route.params?.idTestamento} 
                            idLivro={route.params?.idLivro} 
                            navigation={navigation} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}