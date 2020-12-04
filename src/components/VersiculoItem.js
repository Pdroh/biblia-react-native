import React, { useState, useEffect } from 'react';
import { Alert, View } from "react-native";
import styled from 'styled-components/native';

import Api from '../api';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 2px;
    border-radius: 5px;
    padding: 10px;
`;

const VersiculoTexto = styled.Text`
    font-size: 17px;
    font-weight: bold;
    padding: 3px;
    margin-bottom: 1px;
`;

const TituloLivro = styled.Text`
    width: 100%;
    font-size: 20px;
    font-weight: bold;
`;

const TituloCapitulo = styled.Text`
    width: 100%;
    font-size: 17px;
`;

const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export default ({data, idVersao, idLivro, txtLivro, txtCapitulo, navigation}) => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const atualizaLista = async (idxItem) => {
        setLoading(true);
        
        if(idxItem > -1) {
            data[idxItem].lido = '1';
        }
        
        setList(data);

        setLoading(false);
    }

    const atualizaTudo = async () => {
        setLoading(true);
        
        data.map((item, idx) => {
            data[idx].lido = '1';
        })

        setList(data);

        setLoading(false);
    }

    const styles = {
        spinnerStyle: {
            position: 'absolute',
            width: '107%',
            height: '103%',
            zIndex: 999,
            left: 0,
            right: 0,
            top: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
        }
    };

    useEffect(() => {
        atualizaLista(-1);
    }, []);

    return (
        <Area onPress={() => {
            Alert.alert(
                "Opções",
                "Oque deseja fazer?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancelado"),
                        style: "cancel"
                    },
                    { 
                        text: "Capítulo Lido", 
                        onPress: async () => {
                            setLoading(true);
                            let res = await Api.postLidoCap(idVersao, idLivro, txtCapitulo);
                            if(res.error === "") {
                                atualizaTudo();
                            } else {
                                alert("Erro: "+res.error);
                            }
                            setLoading(false);
                        } 
                    }
                ],
                { cancelable: false }
            );
        }}>
            <TituloLivro>{txtLivro}</TituloLivro>
            <TituloCapitulo>Cápitulo {txtCapitulo}</TituloCapitulo>
            {loading &&
                <View style = {styles.spinnerStyle}>
                    <LoadingIcon color="#45B649" size={'large'} />
                </View>
            }
            {list.map((item, k)=>(
                <VersiculoTexto style={(item.lido == 1) ? {backgroundColor: '#E1F5FE'} : ''} key={k} onPress={()=>{
                    Alert.alert(
                        "Opções",
                        "Oque deseja fazer?",
                        [
                            {
                                text: "Add Favoritos",
                                onPress: async () => {
                                    setLoading(true);
                                    let res = await Api.postFavorito(item.ver_id);
                                    if(res.error === "") {           
                                        alert('Adicionado com sucesso!')
                                    } else {
                                        alert("Erro: "+res.error);
                                    }
                                    setLoading(false); 
                                }
                            },
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancelado"),
                                style: "cancel"
                            },
                            { 
                                text: "Lido", 
                                onPress: async () => {
                                    if(item.lido==='0') {
                                        setLoading(true);
                                        let res = await Api.postLido(item.ver_vrs_id, item.ver_liv_id, item.ver_capitulo, item.ver_versiculo);
                                        if(res.error === "") {
                                            atualizaLista(k);           
                                            //alert('Lido!')
                                        } else {
                                            alert("Erro: "+res.error);
                                        }
                                        setLoading(false);
                                    } else {
                                        alert("Já lido!");
                                    }
                                } 
                            }
                        ],
                        { cancelable: false }
                    );
                }}>
                    {item.ver_versiculo} - {item.ver_texto}
                </VersiculoTexto>
            ))}
        </Area>
    );
}