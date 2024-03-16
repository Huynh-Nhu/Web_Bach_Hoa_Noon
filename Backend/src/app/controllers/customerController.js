const { response } = require("express");
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Address = require("../models/Address");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

const authService = require("../services/authService");
const { decode } = require("jsonwebtoken");
const StaffController = require("./staffController");

// let refreshTokens = [];

const customerController = {
  // register customer
  registerCustomer: async (req, res) => {
    try {
      const {
        nameCustomer,
        passwordCustomer,
        phoneCustomer,
        emailCustomer,
        nameAddress,
      } = req.body;

      // Kiểm tra xem người dùng đã tồn tại hay chưa
      const existingUserEmail = await authService.findOneCustomerEmail(
        emailCustomer
      );
      const existingUserPhone = await authService.findOneCustomerPhone(
        phoneCustomer
      );

      // console.log(existingUserPhone);
      if (existingUserEmail || existingUserPhone) {
        return res.json({ message: "Người dùng đã tồn tại" });
      } 
      // Kiểm tra sự tồn tại và rỗng của các trường dữ liệu
      if (!nameCustomer) {
        return res.json({ message: "Vui lòng nhập tên" });
      } else if (!phoneCustomer) {
        return res.json({ message: "Vui lòng nhập số điện thoại" });
      } else if (!nameAddress) {
        return res.json({ message: "Vui lòng nhập địa chỉ" });
      } else if (!passwordCustomer) {
        return res.json({ message: "Vui lòng nhập mật khẩu" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(passwordCustomer, salt);

      // Tạo đối tượng địa chỉ
      const newAddress = new Address({
        nameAddress: nameAddress,
      });
      const address = await authService.createdAddress(newAddress);

      // Tạo đối tượng khách hàng
      const newCustomer = new Customer({
        nameCustomer: nameCustomer,
        passwordCustomer: hashPassword,
        phoneCustomer: phoneCustomer,
        emailCustomer: emailCustomer,
        idAddress: address._id,
      });

      // Lưu đối tượng địa chỉ

      // Lưu đối tượng khách hàng
      const customer = await authService.createdCustomer(newCustomer);

      res
        .status(200)
        .json({ message: "Thành công", customer: customer, address: address });
    } catch (error) {
      console.log("Không thể đăng ký khách hàng", error);
      res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
  },
  // login customer

  generateAccessToken: (customer) => {
    return jwt.sign(
      {
        id: customer._id,
      },
      config.jwt.secretkey,
      { expiresIn: "5d" }
    );
  },

  loginCustomer: async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;
      const customer = await authService.findOneCustomer(emailOrPhone);
      if (
        !customer ||
        !(await bcrypt.compare(password, customer.passwordCustomer))
      ) {
        return res
          .status(404)
          .json({ message: "Email/phone or password is incorrect" });
      } else {
        const accessToken = customerController.generateAccessToken(customer);

        return res
          .status(200)
          .json({ message: "Success login customer", customer, accessToken });
      }
    } catch (error) {
      console.log("cannot login customer", error);
    }
  },
  googleCustomer: async (req, res) => {
    try {
      const { token } = req.body;
      var userObject = await decode(token);

      const user = await authService.findOneCustomer(userObject.email);
      if (!user) {
        const newCustomer = new Customer({
          nameCustomer: userObject.name,
          avatarCustomer: userObject.picture,
          emailCustomer: userObject.email,
        });
        const customer = await authService.createdCustomer(newCustomer);
        res
          .status(200)
          .json({
            message: "Tạo thành công khách hàng",
            customer,
            iss: userObject.iss,
            jti: userObject.jti,
          });
      } else {
        res
          .status(200)
          .json({ message: "Khách hàng đã tồn tại", customer: user });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = customerController;
