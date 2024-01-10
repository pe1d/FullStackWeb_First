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
    return res.send('Post CRUD from sever');
}
let getDisplayCRUD = async (req, res) => {
    let data = await crudServices.readUser();
    console.log('-----------------------');
    console.log(data);
    console.log('-----------------------');
    return res.render('display-crud.ejs', {
        dataTable: data,
    })
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getDisplayCRUD: getDisplayCRUD,
}