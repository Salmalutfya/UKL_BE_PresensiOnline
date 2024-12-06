const express = require('express')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const userModel = require('../models/index').user

const authenticate = async(request, response) => {
    let dataLogin = {
        username: request.body.username,
        password: md5(request.body.password)
    }
    let dataUser = await userModel.findOne({ where: dataLogin })

    if(dataUser) {
        let payload = JSON.stringify(dataUser)
        let secret = 'mokleters'
        let token = jwt.sign(payload, secret)

        return response.json({
            status: `success`,
            message: 'Login berhasil',
            token: token
        })
    }
    return response.json({
        success: false,
        logged: false,
        message: 'Authentication Failed. Invalid usernmae or password'
    })
}
const authorize = (request, response, next) => {
    let headers = request.headers.authorization
    let tokenKey = headers && headers.split(" ")[1]
    if (tokenKey == null) {
        return response.json({
            success: false,
            message: 'Unathorized User'
        })
    }
    let secret = 'mokleters'
    jwt.verify(tokenKey, secret, (error, user) =>{
        if (error) {
            return response.json({
                success: false,
                message: 'Invalid token'
            })
        }
    })

}
module.exports = {authenticate, authorize}
