import {serverURL} from "../redux/Room/actions";

const axios = require('axios');
export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
    async (config: { headers: { Authorization: string; Accept: string; 'Content-Type': string; }; }) => {
        const accessToken = localStorage.getItem("authenticateToken");
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error)
    });

axiosApiInstance.interceptors.response.use((response: any) => {
    return response
}, async function (error: { config: any; response: { status: number; }; }) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessToken();
        console.log("collect new acces from storage")
        const accessToken = localStorage.getItem("authenticateToken");
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});

const refreshAccessToken = async () => {
    //let accessToken: string;
    console.log(" In refreshing")
    const refreshToken = localStorage.getItem("refreshToken");
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    });
    await authAxios.put(`${serverURL}/users/authenticate/refresh`)
        .then((response: { data: { authenticateToken: string; }; }) => {
            console.log("collect new access");
            localStorage.setItem("authenticateToken", response.data.authenticateToken);
            //accessToken = response.data.authenticateToken;
        })
        .catch((error: { response: any; }) => {
            console.log("error in refresh token");
            console.log(error.response);
        })
}