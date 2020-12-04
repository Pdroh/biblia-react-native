import React, { useState, useEffect } from 'react';
import { RefreshControl, View, StyleSheet, TouchableOpacity, Text, Share, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../api';

import BibliaLogo from '../../assets/icone.svg';
import NavNext from '../../assets/nav_next.svg';
import IconShare from '../../assets/share.svg';

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    Versiculo,
    Autor,

    LoadingIcon,
    ListArea
} from './styles';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getRandom = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getRandom();
        
        if(!res.error) {            
            setList(res.result);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    const onShare = async (idx) => {
        try {

            const strTexto = list[idx].ver_texto + ' - ' + list[idx].liv_nome + ' ' + list[idx].ver_capitulo + ':' + list[idx].ver_versiculo;

            const result = await Share.share({
                message: strTexto,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(()=>{
        getRandom();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getRandom();
    }

    const styles = StyleSheet.create({
        buttonVersoes: {
            width: '100%',
            height: 50,
            backgroundColor: '#0A7D98',
            borderRadius: 20,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonVersoesText: {
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
        }
    });

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Olá!</HeaderTitle>
                </HeaderArea>

                <BibliaLogo width="100%" height="100" />

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
                <ListArea>
                    {list.map((item, k)=>(
                        <View key={k} style={{width: '100%', backgroundColor: '#fff', alignItems: 'center', borderRadius: 20, padding: 10}}>
                            <Versiculo>{item.ver_texto}</Versiculo>
                            <Autor>{item.liv_nome} - {item.ver_capitulo}:{item.ver_versiculo}</Autor>
                            <Autor>"Autor - {item.liv_autor}"</Autor>
                            <TouchableOpacity style={{right: 0}}>
                                <IconShare width="26" height="26" fill="#616161" onPress={() => onShare(k)} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ListArea>

                <TouchableOpacity
                    style={styles.buttonVersoes}
                    onPress={()=>navigation.navigate('Versoes')}
                >
                    <Text style={styles.buttonVersoesText} >Versões da Bíblia</Text>
                    <NavNext width="26" height="26" fill="#FFFFFF" />
                </TouchableOpacity>

            </Scroller>
        </Container>
    );
}