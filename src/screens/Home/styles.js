import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;
export const HeaderTitle = styled.Text`
    text-align: center;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    color: #FFF;
`;
export const Versiculo = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #616161;
`;
export const Autor = styled.Text`
    width: 250px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    color: #E0E0E0;
    font-style: italic;
`;
export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`;

export const LocationArea = styled.View`
    background-color: #4EADBE;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`;
export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFFFFF;
`;
export const LocationFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;
export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;