import React from 'react';
import styled from 'styled-components/native';

import Stars from '../components/Stars';

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

const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;

export default ({data, navigation}) => {
    return (
        <Area onPress={()=>{
            navigation.navigate('Testamentos', {
                idVersao: data.vrs_id
            });
        }}>
            <InfoArea>
                <VersaoName>{data.vrs_nome}</VersaoName>
            </InfoArea>
        </Area>
    );
}