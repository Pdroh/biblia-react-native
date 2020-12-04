import React from 'react';
import styled from 'styled-components/native';

import { 
    parseISO, 
    format,
  } from 'date-fns';

import pt from 'date-fns/locale/pt';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 2px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const InfoArea = styled.View`
    justify-content: space-between;
`;


const TextoLivro = styled.Text`
    font-size: 12px;
    font-weight: bold;
`;
const TextoVersiculo = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;
const TextoAutor = styled.Text`
    color: #757575;
    font-size: 12px;
    font-weight: bold;
`;
const TextoDataAdd = styled.Text`
    color: #757575;
    font-size: 12px;
    font-weight: bold;
`;

export default ({data}) => {
    return (
        <Area>
            <InfoArea>
                <TextoLivro>{data.liv_nome} - {data.ver_capitulo}:{data.ver_versiculo}</TextoLivro>
                <TextoVersiculo>{data.ver_texto}</TextoVersiculo>
                <TextoAutor>Autor: {data.liv_autor}</TextoAutor>
                <TextoDataAdd>Data Add: {
                    format(
                        parseISO(data.dta_add_favorito), 
                        "'Dia' dd 'de' MMMM', às 'HH:mm'h'",
                        { locale: pt }
                    )
                }</TextoDataAdd>
            </InfoArea>
        </Area>
    );
}