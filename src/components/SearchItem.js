import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const Area = styled.View`
    background-color: #FFFFFF;
    margin-bottom: 1px;
    border-radius: 2px;
    padding: 15px;
`;

const InfoArea = styled.View`
    
`;
const HeaderVersao = styled.Text`
    color: #039BE5;
    font-size: 20px;
    font-weight: bold;
    padding: 3px;
    margin-bottom: 1px;
`;

const HeaderLivro = styled.Text`
    color: #3F51B5;
    font-size: 17px;
    font-weight: bold;
`;


const CapituloTexto = styled.Text`
    color: #616161;
    font-size: 17px;
    font-weight: bold;
    padding: 3px;
    margin-bottom: 1px;
`;
const VersiculoTexto = styled.Text`
    font-size: 17px;
    font-weight: bold;
    padding: 3px;
    margin-bottom: 1px;
`;

const AreaVersiculo = styled.TouchableOpacity`

`

export default ({data}) => {

    const [listData, setListData] = useState([]);

    const atualizaLista = async () => {
        
        var tratArr = data[1];
        var novoArr = [];

        for(item in tratArr) {
            novoArr.push({"titulo": item, "data": Object.entries(data[1][item])})
        }
        
        setListData(novoArr);

    }

    useEffect(() => {
        atualizaLista();
    }, []);

    return (
        <Area>
            <HeaderVersao>{data[0]}</HeaderVersao>
            {listData.map((item, k)=>(
                <InfoArea key={k}>
                    <HeaderLivro>{item.titulo}</HeaderLivro>
                    {(item.data).map((itemVer, idx)=>(
                        <AreaVersiculo key={idx}>
                            <VersiculoTexto>
                                <CapituloTexto>Cap {itemVer[1].numCapitulo} - Ver {itemVer[1].numVersiculo}: </CapituloTexto>
                                {itemVer[1].versiculo}
                            </VersiculoTexto>
                        </AreaVersiculo>
                    ))}
                </InfoArea>
            ))}
        </Area>
    );
}