import React, { useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../contexts/UserContext';
import Api from '../../api';

import BibliaLogo from '../../assets/icone.svg';
import PreloadLogo from '../../assets/preload.svg';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                let res = await Api.checkToken(token);
                if(res.error === "" && res.result.token) {

                    await AsyncStorage.setItem('token', res.result.token);

                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.result.avatar
                        }
                    });

                    setTimeout(() => {
                        navigation.reset({
                            routes:[{name:'MainTab'}]
                        });
                    }, 5000);


                } else {
                    AsyncStorage.clear();
                    navigation.navigate('SignIn');
                }
            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <PreloadLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
            <Text style={{marginTop: 30, color: '#ffffff'}}>App Bíblia by Pedro Henrique</Text>
            <Text style={{marginTop: 10, color: '#ffffff'}}>v.1.0.15</Text>
        </Container>
    );
}
