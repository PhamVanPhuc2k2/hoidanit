import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { RAW } from 'sequelize/lib/query-types';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('ok create a new succeed');
        } catch (e) {
            reject(e);
        }
    });
};

const hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resole, reject) => {
        try {
            const users = db.User.findAll({
                raw: true,
            });
            resole(users);
        } catch (e) {
            reject(e);
        }
    });
};

const getUserInfoById = (userId) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resole(user);
            } else {
                resole([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updataUserData = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUser = await db.User.findAll();
                resole(allUser);
            } else {
                resole();
            }
        } catch (e) {
            console.log(e);
        }
    });
};

const deleteUserById = (userId) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
            }
            resole();
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updataUserData: updataUserData,
    deleteUserById: deleteUserById,
};
