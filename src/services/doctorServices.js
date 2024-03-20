import db from "../models/index";
import bcrypt from 'bcryptjs';


let getTopDoctorApi = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            // console.log(e);
            reject(e)
        }
    })
}

let getAllDoctorEditDesApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDoctor = await db.User.findAll({
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password', 'image']
                },
                raw: true,
            })

            resolve({
                errCode: 0,
                data: allDoctor,
            })
        } catch (e) {
            reject(e)
        }
    })
}
let postInfoDoctorApi = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.selectedDoctor.value || !data.contentHtml || !data.contentMarkdown || !data.actions) {
                resolve({
                    errCode: -1,
                    message: 'Missing parameter'
                })
            } else {
                if (data.actions === 'CREATE') {
                    await db.Markdown.create({
                        contentMarkdown: data.contentMarkdown,
                        contentHtml: data.contentHtml,
                        DoctorId: data.selectedDoctor.value,
                        description: data.description
                    })
                } else {
                    console.log(data);
                    await db.Markdown.update({
                        contentMarkdown: data.contentMarkdown,
                        contentHtml: data.contentHtml,
                        description: data.description,
                    }, {
                        where: { DoctorId: data.selectedDoctor.value }
                    }
                    )
                }

                resolve({
                    errCode: 0,
                    message: 'Save info doctor success'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getDoctorInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(id);
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHtml', 'contentMarkdown', 'description']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopDoctorApi: getTopDoctorApi,
    getAllDoctorEditDesApi: getAllDoctorEditDesApi,
    postInfoDoctorApi: postInfoDoctorApi,
    getDoctorInfoById: getDoctorInfoById
}