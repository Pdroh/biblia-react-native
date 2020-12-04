import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default ({porcentagem}) => {

    const [textPorcentagem, setTextPorcentagem] = useState('50%');

    state = {
        text: textPorcentagem,
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
        },
    
        leftLabelStyle: {
            fontSize: 16,
            paddingVertical: 5,
            color: '#fff',
            zIndex: 9,
            marginStart: 10,
        },
        RightLabelStyle: {
            fontSize: 16,
            paddingVertical: 5,
            color: '#fff',
        },
    });

    useEffect(() => {
        const newVal = String(porcentagem) + '%'
        setTextPorcentagem(newVal);
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#9E9E9E',
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    overflow: 'hidden',
                }}
            >
                <Text style={styles.leftLabelStyle}>{this.state.text}</Text>
                <View
                    style={{
                        width: textPorcentagem,
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: '#5483b3',
                    }}>
                </View>
            </View>
        </View>
    );
}

