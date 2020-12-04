import React, { useState, useEffect } from 'react';
import { RefreshControl, Dimensions, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,

    HeaderChart,

    LoadingIcon
} from './styles';

import Api from '../../api';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [arrLeitura, setArrLeitura] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [arrLeituraSemana, setArrLeituraSemana] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [arrTestamentos, setArrTestamentos] = useState([0, 0]);
    const [refreshing, setRefreshing] = useState(false);

    const screenWidth = Dimensions.get("window").width-40;

    const getData = async () => {

        setLoading(true);

        let res = await Api.getUserEstatisticas();

        if(res.error === "") {            

            var ajusteArr = (res.result.qtdLeitura).map(element => {
                return parseInt(element);
            });
            setArrLeitura(ajusteArr);

            ajusteArr = (res.result.qtdLeituraSemana).map(element => {
                return parseInt(element);
            });
            setArrLeituraSemana(ajusteArr);
            
            if(res.result.qtdTestamentos[0].percentual!='0.000' && res.result.qtdTestamentos[1].percentual != '0.000'){
                setArrTestamentos([parseFloat(res.result.qtdTestamentos[0].percentual), parseFloat(res.result.qtdTestamentos[1].percentual)]);
            }
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);

    }

    const dataTestamentos = {
        labels: ["Antigo", "Novo"], // optional
        data: arrTestamentos
    };

    const dataLeitura = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
            {
                data: arrLeitura
            }
        ]
    }
    
    const dataLeituraSemana = {
        labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        datasets: [
            {
                data: arrLeituraSemana
            }
        ]
    }

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#3F51B5",
        //backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#3949AB",
        //backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        decimalPlaces: 0,
        useShadowColorFromDataset: false, // optional
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#FFFFFF"
        }
    };

    useEffect(()=>{
        getData();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getData();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle numberOfLines={1}>Suas Estatísticas de Leitura</HeaderTitle>
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
               
                <View style={{marginBottom: 50, marginTop: 30}}>
                    
                    <HeaderChart>Testamentos</HeaderChart>
                    <ScrollView horizontal={true}>
                        <ProgressChart
                            data={dataTestamentos}
                            width={screenWidth}
                            height={220}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={chartConfig}
                            hideLegend={false}
                            style={{
                                marginVertical: 3,
                                borderRadius: 16
                            }}
                        />
                    </ScrollView>

                    <HeaderChart>Leitura por dia da semana</HeaderChart>
                    <ScrollView horizontal={true}>
                        <LineChart
                            data={dataLeituraSemana}
                            width={screenWidth}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </ScrollView>
                    
                    <HeaderChart>Leitura por mês</HeaderChart>
                    <ScrollView horizontal={true}>
                        <LineChart
                            data={dataLeitura}
                            width={screenWidth+100}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </ScrollView>

                </View>

            </Scroller>
        </Container>
    );
}