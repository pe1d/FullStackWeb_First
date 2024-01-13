import userService from "../services/userServices"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log('your email: ', email, 'password: ', password);
    if (email === '' || (password === '')) {
        return res.status(500).json({
            errCode: 3,
            message: 'Missing input'
        })
    }
    // let user = await
    // check email exist
    // compar password
    // return userInfor
    // access_token:JWT
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin,
}