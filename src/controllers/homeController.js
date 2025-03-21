import db from '../models/index';
import CRUDService from '../services/CRUDService';

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

const getCRUD = async (req, res) => {
    return res.render('crud.ejs');
};

const postCRUD = async (req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud form server');
};

const displayGetCRUD = async (req, res) => {
    const data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
};

const getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData,
        });
    } else {
        return res.send('không tìm thấy user');
    }
};

const putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updataUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser,
    });
};

const deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('xoa thanh cong');
    } else {
        return res.send('khong tim thay user');
    }
};

export default {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
