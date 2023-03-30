const addressService = require("../services/address.service");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const responseUtil = require("../utils/response.util");
const customerService = require("../services/customer.service");
const cartService = require("../services/cart.service");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const body = req.body;
      const files = req.files;
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { code, data } = await userService.registerUser(body, files);
        // create address and reference to table User
        if (code === 201) {
          const newAddress = await addressService.create(body, data.data.id);
          // create role customer
          await customerService.register(data.data.id);
          // create cart
          await cartService.create(data.data.id);
        }
        res.status(code).json(data);
      } else {
        const { code, data } = responseUtil.errorsValidate(errors.array());
        res.status(code).json(data);
      }
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError;
      res.status(code).json(data);
    }
  },
  login: async (req, res) => {
    try {
      const body = req.body;
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { code, data } = await userService.login(body);
        setTimeout(() => {
          res.status(code).json(data);
        }, 2500);
      } else {
        const { code, data } = responseUtil.errorsValidate(errors.array());
        res.status(code).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Error");
    }
  },
  getAll: async (req, res) => {
    try {
      // cache redis

      //
      const query = req.query;
      const { code, data } = await userService.getAll(query);
      res.status(code).json(data);
    } catch (error) {
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  update: async (req, res) => {
    try {
      const body = req.body;
      const userId = req.params.userId;
      const { code, data } = await userService.update(body, userId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  getDetail: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { code, data } = await userService.getDetail(userId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const userName = req.body.userName;
        const { code, data } = await userService.resetPassword(userName);
        res.status(code).json(data);
      } else {
        const { code, data } = await responseUtil.errorsValidate(
          errors.array()
        );
        res.status(code).json(data);
      }
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  googleLogin: async (req, res) => {
    try {
      const body = req.body;
      const { code, data } = await userService.googleLogin(body);
      setTimeout(() => {
        res.status(code).json(data);
      }, 3000);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const body = req.body;
      const { code, data } = await userService.facebookLogin(body);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  statsAll: async (req, res) => {
    try {
      const { code, data } = await userService.statsAll();
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      console.log("AD");
      const result = await userService.uploadAvatar(req.files);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  },
  currentUser: async (req, res) => {
    try {
      const userId = req.data.userId;
      const { code, data } = await userService.currentUser(userId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  roleAdmin: async (req, res) => {
    try {
      const userId = req.data.userId;
      const { code, data } = await userService.roleAdmin(userId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
};
