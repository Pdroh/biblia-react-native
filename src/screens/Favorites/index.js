import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, StatusBar, Animated, TouchableOpacity } from "react-native";
import { RefreshControl } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Api from '../../api';

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,

    ListArea,
    LoadingIcon
} from './styles';

import { 
    parseISO, 
    format,
  } from 'date-fns';

import pt from 'date-fns/locale/pt';

import TrashIcon from '../../assets/trash.svg';

export default () => {

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState([]);

    const getFavorites = async () => {
        setList([]);
        setLoading(true);

        let res = await Api.getFavoritos();
        
        if(res.error === '') {            
            setList(res.result);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    const removerItem = (id) => {
        console.log('id', id)
        Alert.alert(
            "Remover",
            "Deseja remover este versículo dos favoritos?",
            [
                {
                    text: "Não",
                    onPress: () => getFavorites(),
                    style: "cancel"
                },
                { 
                    text: "Sim", 
                    onPress: async () => {
                        setLoading(true);
                        let res = await Api.deleteFavoritos(id);
                        if(res.error === "") {
                            getFavorites();
                        } else {
                            alert("Erro: "+res.error);
                        }
                        setLoading(false);
                    } 
                }
            ],
            { cancelable: false }
        );
    }

    

    const RightAction = ({ progress, dragX, onPress }) => {

        let scale = 0;
        if(dragX){
            scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            })
        }


        return (
            <TouchableOpacity 
                style={styles.rightAction}
                onPress={onPress}
            >
                <View>
                    <Animated.View style={{transform: [{scale}]}}>
                        <TrashIcon height="60" width="60" fill="#fff" />
                    </Animated.View>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(()=>{
        getFavorites();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getFavorites();
    }

    const Item = ({ item, style }) => (
        <Swipeable
            renderRightActions={(progress, dragX) => <RightAction progress={progress} dragX={dragX} onPress={() => removerItem(item.ver_id)} />}
        >
            <View style={[styles.item, style]}>
                <Text style={styles.livro}>{item.liv_nome} - {item.ver_capitulo}:{item.ver_versiculo}</Text>
                <Text style={styles.versiculo}>{item.ver_texto}</Text>
                <Text style={styles.autor}>Escrito por {item.liv_autor}</Text>
                <Text style={styles.dataAdd}>
                    {
                        format(
                            parseISO(item.dta_add_favorito), 
                            "'Adicionado dia' dd 'de' MMMM', às 'HH:mm'h'",
                            { locale: pt }
                        )
                    }
                </Text>
            </View>
        </Swipeable>
    );

    const styles = StyleSheet.create({
        containerLista: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        item: {
          backgroundColor: '#FFFFFF',
          padding: 15,
          marginBottom: 2,
          borderRadius: 20
        },
        livro: {
          fontSize: 12,
          fontWeight: "bold",
        },
        versiculo: {
            fontSize: 17,
            fontWeight: "bold",
        },
        autor: {
            color: "#757575",
            fontSize: 12,
            fontWeight: "bold",
        },
        dataAdd: {
            color: "#757575",
            fontSize: 12,
            fontWeight: "bold",
        },
        rightAction: {
            backgroundColor: '#EF5350',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            borderTopEndRadius: 20,
            borderBottomEndRadius: 20,
            marginBottom: 2,
        }
    });


    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={1}>Favoritos</HeaderTitle>
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <Swipeable
                            key={k}
                            renderRightActions={RightAction}
                        >
                            <Item item={item} />
                        </Swipeable>
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );

}