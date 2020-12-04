import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { 
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,

    LoadingIcon,

    InputArea,
    CustomButton,
    CustomButtonText,
} from './styles';

import SignInput from '../../components/SignInput';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import Api from '../../api';

export default () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const handleSignClick = async () => {
        setLoading(true);

        if(nameField != '' && emailField != '') {
            let res = await Api.updateProf(nameField, passwordField);
            
            if(res.error === "") {
                alert("Dados atualizados com sucesso!");
            } else {
                alert("Erro: "+res.error);
            }
        } else {
            alert("Preencha os campos");
        }

        setLoading(false);
    }

    const handleSignOut = async () => {
        navigation.reset({
            routes:[{name:'SignIn'}]
        });
    }

    const getUserData = async () => {
        setLoading(true);

        let res = await Api.getUserData();
        
        if(res.error==="") {       
            setNameField(res.result.user_name);
            setEmailField(res.result.user_email);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    useEffect(()=>{
        getUserData();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getUserData();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle>Seus dados</HeaderTitle>
                </HeaderArea>
                
                <InputArea>
                    <SignInput
                        IconSvg={PersonIcon}
                        placeholder="Digite seu nome"
                        value={nameField}
                        onChangeText={t=>setNameField(t)}
                        editable={true} 
                        password={false}
                        selectTextOnFocus={false}
                        autoCompleteType='name'
                        keyboardType='default'
                        textContentType='name'
                        autoCapitalize='words'
                    />

                    <SignInput
                        IconSvg={EmailIcon}
                        placeholder="Digite seu e-mail"
                        value={emailField}
                        onChangeText={t=>setEmailField(t)}
                        editable={false} 
                        password={false}
                        selectTextOnFocus={false}
                        autoCompleteType='email'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                    />

                    <SignInput
                        IconSvg={LockIcon}
                        placeholder="Digite uma nova senha"
                        value={passwordField}
                        onChangeText={t=>setPasswordField(t)}
                        editable={true}
                        password={true}
                        selectTextOnFocus={false}
                        autoCompleteType='password'
                        keyboardType='default'
                        textContentType='password'
                        autoCapitalize='none'
                    />

                    {loading &&
                        <LoadingIcon size="large" color="#FFFFFF" />
                    }

                    {!loading &&
                        <CustomButton onPress={handleSignClick}>
                            <CustomButtonText>Alterar</CustomButtonText>
                        </CustomButton>
                    }

                    {!loading &&    
                        <CustomButton style={{marginTop: 10}} onPress={handleSignOut}>
                            <CustomButtonText>Sair</CustomButtonText>
                        </CustomButton>
                    }
                </InputArea>
            </Scroller>
        </Container>
    );
}