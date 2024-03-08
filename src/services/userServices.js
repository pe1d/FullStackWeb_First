import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUser(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
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
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'ABC';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            // console.log(users);
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let errCode, message = '';
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            let check = await checkUser(data.email)
            if (check === true) {
                errCode = 1;
                message = 'Email is exist';
            } else {
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                    image: data.avatar
                })
                errCode = 0;
                message = 'ok';
            }
            resolve({
                errCode: errCode,
                message: message
            })
        } catch (e) {
            reject(e)
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
let EditUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                // user.firstName = data.firstName;
                // user.lastName = data.lastName;
                // user.address = data.address;
                // user.roleId = data.role;
                // user.positionId = data.position;
                // user.gender = data.gender;
                // user.phonenumber = data.phonenumber;

                await db.User.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    roleId: data.role,
                    positionId: data.position,
                    gender: data.gender,
                    phonenumber: data.phonenumber,
                    image: data.avatar
                }, {
                    where: { id: data.id },
                })
                resolve({
                    errCode: 0,
                    message: 'Update user compelete!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Update user uncompelete!'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let delUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message, errCode = ''
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: id }
                });
                message = 'Del user compeleted!';
                errCode = 0;
            } else {
                message = 'Del user uncompeleted!';
                errCode = 1;
            }
            resolve({
                errCode: errCode,
                message: message
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getAllCodeFromDB = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require parameters!"
                })
            } else {
                let res = {};
                let allcodes = await db.Allcode.findAll(
                    { where: { type: typeInput } }
                )
                res.errCode = 0;
                res.data = allcodes;
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    EditUserData: EditUserData,
    delUser: delUser,
    getAllCodeFromDB: getAllCodeFromDB,
}