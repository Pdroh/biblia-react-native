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


const InfoArea = styled.View`
    
`;

const VersaoName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export default ({data, idVersao, idTestamento, navigation}) => {
    return (
        <Area onPress={()=>{
            navigation.navigate('Capitulos', {
                idVersao: idVersao,
                idTestamento: idTestamento,
                idLivro: data.liv_id
            });
        }}>
            <InfoArea>
                <VersaoName>{data.liv_nome}</VersaoName>
            </InfoArea>
            <ItemProgress porcentagem={data.percentual} />
        </Area>
    );
}