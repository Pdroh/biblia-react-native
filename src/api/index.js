import AsyncStorage from '@react-native-community/async-storage';
import { add } from 'react-native-reanimated';

const BASE_API = 'http://accessfast.com.br/api/api.php';

export default {
    checkToken: async (token) => {

        dados = {
            "method": "hasLogado",
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();        
        return json;
    },
    signIn: async (email, password) => {
        dados = {
            "method": "logar",
            "email": email,
            "password": password
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();        
        return json;
    },
    signUp: async (name, email, password) => {
        dados = {
            "method": "cadastrar",
            "name": name,
            "email": email,
            "password": password
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();        
        return json;
    },
    updateProf: async (name, password) => {
        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "updateProf",
            "token": token,
            "name": name,
            "password": password
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();        
        return json;
    },
    getVersoes: async () => {

        dados = {
            "method": "versoes"
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getTestamento: async () => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "testamentos",
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getLivros: async (idTestamento) => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "livros",
            "idTestamento": idTestamento,
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getCapitulos: async (idVersao, idTestamento, idLivro) => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "capitulos",
            "idVersao": idVersao,
            "idTestamento": idTestamento,
            "idLivro": idLivro,
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getVersiculos: async (idVersao, idTestamento, idLivro, idCapitulo) => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "versiculos",
            "idVersao": idVersao,
            "idTestamento": idTestamento,
            "idLivro": idLivro,
            "idCapitulo": idCapitulo,
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getUserData: async () => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "dadosUsuario",
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getPesquisar: async (texto) => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "pesquisar",
            "token": token,
            "texto": texto
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getUserEstatisticas: async () => {

        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "estatistica",
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getFavoritos: async () => {
        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "favoritos",
            "token": token
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    getRandom: async () => {
        dados = {
            "method": "random"
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    postLido: async (idVersao, idLivro, idCapitulo, idVersiculo) => {
        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "marcarLeitura",
            "token": token,
            "idVersao": idVersao,
            "idLivro": idLivro,
            "idCapitulo": idCapitulo, 
            "idVersiculo": idVersiculo
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    postLidoCap: async (idVersao, idLivro, idCapitulo) => {
        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "marcarLeituraCap",
            "token": token,
            "idVersao": idVersao,
            "idLivro": idLivro,
            "idCapitulo": idCapitulo
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    postFavorito: async (idVersiculo) => {
        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "addFavorito",
            "token": token,
            "idVersiculo": idVersiculo
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    },
    deleteFavoritos: async (idVersiculo) => {
        const token = await AsyncStorage.getItem('token');

        dados = {
            "method": "removeFavorito",
            "token": token,
            "idVersiculo": idVersiculo
        }

        const req = await fetch(`${BASE_API}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const json = await req.json();
        return json;
    }
};