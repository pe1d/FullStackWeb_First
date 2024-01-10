import bcrypt from 'bcryptjs';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.fName,
                lastName: data.lName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleid,
            })
            resolve('create new user success')
        } catch (e) {
            reject(e);
        }
    })
}
let readUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    readUser: readUser,
}