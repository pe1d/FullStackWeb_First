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
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;//All, id
    let users = await userService.getAllUser(id);
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing require parameters',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        users
    })
}
let handleCreateUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body.data;
    if (!data.id) {
        return res.status(200).json({
            errCode: 2,
            message: `id doesn't exist`
        });
    } else {
        let message = await userService.EditUserData(data);
        return res.status(200).json(message);
    }
}
let handleDelUser = async (req, res) => {
    let id = req.body.id;
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: `Id isn't exist!!`
        })
    } else {
        let message = await userService.delUser(id);
        return res.status(200).json(message);
    }
}
let getAllcodes = async (req, res) => {
    try {
        setTimeout(async () => {
            let data = await userService.getAllCodeFromDB(req.query.type);
            return res.status(200).json(data)
        })
    } catch (e) {
        console.log("Get all codes errer: ", e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDelUser: handleDelUser,
    getAllcodes: getAllcodes,
}