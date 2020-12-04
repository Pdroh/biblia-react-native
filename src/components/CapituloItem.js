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

const CapituloText = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export default ({data, idVersao, idTestamento, idLivro, navigation}) => {
    return (
        <Area onPress={()=>{
            navigation.navigate('Versiculos', {
                idVersao: idVersao,
                idTestamento: idTestamento,
                idLivro: idLivro,
                txtLivro: data.liv_nome,
                idCapitulo: data.ver_capitulo
            });
        }}>
            <InfoArea>
                <CapituloText>{data.ver_capitulo}</CapituloText>
            </InfoArea>
            <ItemProgress porcentagem={data.percentual} />
        </Area>
    );
}