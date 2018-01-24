export const setAuthenticationNeeded = (redirectPath) => (dispatch) => {
    console.log('action');
    dispatch({
        type: 'AUTHENTICATION_NEEDED',
        redirectPath: redirectPath
    });
};

export const setHomeAuthenticationNeeded = (redirectPath) => (dispatch) => {
    console.log('action');
    dispatch({
        type: 'HOME_AUTHENTICATION_NEEDED',
        redirectPath: redirectPath
    });
};