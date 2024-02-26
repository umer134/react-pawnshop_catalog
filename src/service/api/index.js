import axios from "axios";
import md5 from 'md5'

const url = "http://api.valantis.store:40000/";
const currentDate = new Date().toISOString().replace(/\D/g, '').slice(0, 8);
const password = 'Valantis';


export const instance = axios.create({
    baseURL: url,
    headers: {'X-Auth': md5(`${password}_${currentDate}`)}
});

instance.interceptors.request.use((config) => config)