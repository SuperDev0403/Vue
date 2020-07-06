import axios from 'axios'
import env from '../env'

class ServiceUtils {
    constructor() { }
    ApiGET(endpoint) {
        let token = localStorage.getItem('token');
        const url = `${env.BASE_URL}/${endpoint}`;
        let config = {
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        }
        return new Promise((resolve, reject) => {
            axios.get(url, config).then((res) => {
                resolve(res)
            }).catch((err) => {
                if (err) {
                    reject(err)
                }
            })
        })
    }
    ApiPOST(endpoint, payload) {
        let token = localStorage.getItem('token');
        const url = `${env.BASE_URL}/${endpoint}`;
        let config = {
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, payload, config).then((res) => {
                resolve(res)
            }).catch((err) => {
                if (err) {
                    reject(err)
                }
            })
        })
    }
}

export default ServiceUtils