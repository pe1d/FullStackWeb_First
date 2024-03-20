import doctorServices from '../services/doctorServices';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorServices.getTopDoctorApi(+limit);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}
let getAllDoctorEditDes = async (req, res) => {
    try {
        let response = await doctorServices.getAllDoctorEditDesApi();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}
let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorServices.postInfoDoctorApi(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}
let getDoctorInfoById = async (req, res) => {
    try {
        let infoDoctor = await doctorServices.getDoctorInfoById(req.query.id)
        return res.status(200).json(infoDoctor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctorEditDes: getAllDoctorEditDes,
    postInfoDoctor: postInfoDoctor,
    getDoctorInfoById: getDoctorInfoById
}