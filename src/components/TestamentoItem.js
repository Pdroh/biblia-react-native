import React from 'react';
import styled from 'styled-components/native';

import ItemProgress from '../components/ItemProgress';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 2px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    justify-content: space-between;
`;

const VersaoName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;


export default ({data, idVersao, navigation}) => {
    return (
        <Area onPress={()=>{
            navigation.navigate('Livros', {
                idTestamento: data.tes_id,
                idVersao: idVersao
            });
        }}>
            <InfoArea>
                <VersaoName>{data.tes_nome}</VersaoName>
            </InfoArea>
            <ItemProgress porcentagem={data.percentual} />
        </Area>
    );
}