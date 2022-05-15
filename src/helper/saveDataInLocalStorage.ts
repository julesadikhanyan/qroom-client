import { IUser } from "../redux/User/types";

export const saveDataInLocalStorage = (data: IUser) => {
    localStorage.setItem("id", data.id);
    localStorage.setItem("login", data.login);
    localStorage.setItem("name", data.name);
    localStorage.setItem("authenticateToken", data.tokens.authenticateToken);
    localStorage.setItem("refreshToken", data.tokens.refreshToken);
};
