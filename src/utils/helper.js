import jwtDecode from 'jwt-decode';

const PERSIST_KEY = 'userInfo';
const getUser = (token) => {
    try {
        const jwt = token ? token : localStorage.getItem(PERSIST_KEY);
        if (jwt !== null) {
            const userDecoded = jwtDecode(jwt);
            return userDecoded;
        }
        return null;
    } catch (ex) {
        return null;
    }
};

export default getUser;
