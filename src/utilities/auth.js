import jwtDecode from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem("pucShopAuthToken");
    if (token) {
        const userInfo = jwtDecode(token);
        if ((Date.now() <= userInfo.exp * 1000) && (userInfo.role==='admin')) {
            return true;
        } else {
            localStorage.removeItem("pucShopAuthToken");
            return false;
        }
    }
    return false;
}

export const userInfo = () => {
	const token = localStorage.getItem("pucShopAuthToken");
	if (token) {
        const userInfo = jwtDecode(token);
        return userInfo;
    }
    return false;
};

export const setToken = (token) => {
    const { role } = jwtDecode(token);
    if (role === 'admin') {
        localStorage.setItem("pucShopAuthToken", token);
        return true;
    }
    return false;
}

export const getToken = () => {
    
    return localStorage.getItem("pucShopAuthToken");
}

export const removeToken = (navigate) => {
    localStorage.removeItem("pucShopAuthToken");
    navigate();
};
