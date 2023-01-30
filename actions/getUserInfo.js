import { userXActions } from '../constants'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

export const getUserInfo = async (userId) => {
    const taskURI = `http://172.16.100.135:8080/users`
    axios.defaults.headers.common = {Authorization: `Bearer ${await SecureStore.getItemAsync("secure_token")}`}
    console.log(await SecureStore.getItemAsync("secure_token"));
        axios.get(taskURI).then(v => {
            let user = v.data
            return user;
            })
        .catch(error =>{
            alert("Something wrong: ", error);
        })
}

