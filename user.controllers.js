const userModel = require('../models/index').user;
const Op = require('sequelize').Op
const md5 = require('md5');
const { where } = require('sequelize');

// Controller to add a new user
exports.addUser = (request, response) => {
    // Debugging: Log the request body
    let newUser = {
        name: request.body.name,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    };

    userModel.create(newUser).then(result => {
        let userData = {
            id: result.id,
            name: result.name,
            username: result.username,
            role: result.role
        };
        return response.json({
            status: "success",
            message: "User added successfully",
            data: userData
        });
    })
    .catch(error => {
        return response.json({
            status: false,
            message: error.message
        });
    });
};

// Controller to update an existing user
exports.updateUser = (request, response) => {
    let dataUser = {
        name: request.body.name,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    };

    let id = request.params.id

    userModel.update(dataUser, { where: { id: id } }).then(() => {
        userModel.findOne({ where: { id: id } }).then(updatedUser => {
            let userData = {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role
            }
            return response.json({
                status: "success",
                message: "User updated successfully",
                data: userData
            })
        })
        .catch(error => {
            return response.json({
                status: "error",
                message: `Gagal mengambil data pengguna setelah update`,
                error: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

// Controller to get a user by ID
exports.getUserById = async (request, response) => {
    const {id}  = request.params;
    let userData = await userModel.findOne({ where: { id: id } });

    if (!userData) {
        return response.status(404).json({
            status: false,
            message: `User with ID ${id} not found`
        })
    }
    userData = {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        role: userData.role
    }
    return response.json({
        status: "success",
        data: userData
    });
};

// Controller to delete a user
exports.deleteUser = async (request, response) => {
    const { id } = request.params;

    userModel.findOne({ where: { id: id } }).then(user => {
        if (!user) {
            return response.status(404).json({
                status: false,
                message: `User with ID ${id} not found`
            });
        }

        return userModel.destroy({ where: { id: id } }).then(() => {
            response.json({
                status: true,
                message: `User with ID ${id} has been deleted`
            })
        });
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            message: `Error deleting user: ${error.message}`
        });
    })
};
