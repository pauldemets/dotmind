import axios from "axios";
import { User } from "../types/user.type";

class mainService {

    constructor() {
        axios.defaults.withCredentials = false;
    }

    public fetchUsers = async (): Promise<User[]> => {
        return new Promise((resolve, reject) => {
            axios.get('https://reqres.in/api/users?page=1&delay=1', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => resolve(
                    response.data.data
                ))
                .catch((error) =>
                    reject(error)
                )
        })
    };

    public fetchAllUsers = async (): Promise<User[]> => {
        return new Promise((resolve, reject) => {
            axios.get('https://reqres.in/api/users?page=2&delay=1', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => resolve(
                    response.data.data
                ))
                .catch((error) =>
                    reject(error)
                )
        })
    };

}

export default new mainService();