import db from "../models/index";
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUser(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `oke`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `user not found`;
                }
            } else {
                //return err
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in database, please try other email!!!`;
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
let checkUser = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin
}