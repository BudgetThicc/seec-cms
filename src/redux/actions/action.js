export const loginAsUser = (user) => ({ type: 'LOGINASUSER',user:user});

export const loginAsAdmin=(admin)=> ({ type: 'LOGINASADMIN',admin:admin});

export const logout = () => ({ type: 'LOGOUT'});