import db from "../models";
import crudServices from "../services/crudServices";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('--------------', data)
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}
let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
}
let getCRUD = (req, res) => {
    return res.render("CRUD.ejs");
}
let postCRUD = async (req, res) => {
    let mess = await crudServices.createNewUser(req.body);
    console.log(mess);
    let allUsers = await db.User.findAll();
    return res.render('display-crud.ejs', {
        dataTable: allUsers,
    });
}
let getDisplayCRUD = async (req, res) => {
    let data = await crudServices.readUser();
    return res.render('display-crud.ejs', {
        dataTable: data,
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(req.query.id);
    if (userId) {
        let userData = await crudServices.getUserById(userId);
        //check user data not found
        return res.render('editCRUD.ejs', {
            userData: userData,
        });
    }
    else {
        return res.send('user not found!')
    }
}
let putEditCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await crudServices.updateUserData(data);
    return res.render('display-crud.ejs', {
        dataTable: allUsers,
    })
}
let DelCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await crudServices.DelUserData(userId);
        getDisplayCRUD(req, res);
    }
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getDisplayCRUD: getDisplayCRUD,
    getEditCRUD: getEditCRUD,
    putEditCRUD: putEditCRUD,
    DelCRUD: DelCRUD,
}