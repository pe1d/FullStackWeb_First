import db from "../models";



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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}