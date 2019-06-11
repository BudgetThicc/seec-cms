export const loginAsUser = (user) => ({ type: 'LOGINASUSER',user:user});

export const loginAsAdmin=(admin)=> ({ type: 'LOGINASADMIN',admin:admin});

export const logout = () => ({ type: 'LOGOUT'});

export const showDrawer = (content) =>({ type: 'SHOWDRAWER',content:content})

export const closeDrawer = () =>({ type: 'CLOSEDRAWER'})

export const resetDrawer = () =>({ type: 'RESETDRAWER'})

export const showSignIn= () =>({ type: 'SHOWSIGNIN'})

export const showSignUp= () =>({ type: 'SHOWSIGNUP'})

export const cancelModal= () =>({ type: 'CANCELMODAL'})

export const setOnCancel = (onCancel) =>({ type: 'SETONCANCEL',onCancel:onCancel})

export const showSignInWithOnCancel = (onCancel) =>({ type: 'SHOWSIGNINCANCEL',onCancel:onCancel})