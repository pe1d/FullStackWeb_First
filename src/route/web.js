import express from 'express'
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getDisplayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putEditCRUD);
    router.get('/delete-crud', homeController.DelCRUD);
    //api
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/del-user', userController.handleDelUser);

    router.get("/api/allcodes", userController.getAllcodes);

    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);

    return app.use("/", router);
}


module.exports = initWebRoutes;