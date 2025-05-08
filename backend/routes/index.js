
const express = require("express");
const router = express.Router();

// ======================= USER ROUTES =======================
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userLogout = require("../controller/user/userLogout");
const userDetailsController = require("../controller/user/userDetails");
const updateUser = require("../controller/user/updateUser");
const allUsers = require("../controller/user/allUsers");

router.post("/user/signup", userSignUpController);
router.post("/user/login", userSignInController);
router.get("/user/logout", userLogout);
router.get("/user/details", userDetailsController);
router.post("/update-user", updateUser);
router.get("/all-user", allUsers);

// ======================= HOSPITAL ROUTES =======================
const hospitalSignUpController = require("../controller/hospital/hospitalSignUp");
const hospitalSignInController = require("../controller/hospital/hospitalSignIn");
const hospitalLogout = require("../controller/hospital/hospitalLogout");
const hospitalDetailsController = require("../controller/hospital/hospitalDetails");

router.post("/hospital/signup", hospitalSignUpController);
router.post("/hospital/login", hospitalSignInController);
router.get("/hospital/logout", hospitalLogout);
router.get("/hospital/details", hospitalDetailsController);

// ======================= DOCTOR ROUTES =======================
const doctorSignIn = require("../controller/doctor/doctorSignIn");
const doctorLogout = require("../controller/doctor/doctorLogout");
const doctorDetails = require("../controller/doctor/doctorDetails");
const addDoctorController = require("../controller/doctor/addDoctor");
const updateDoctor = require("../controller/doctor/updateDoctor");
// const deleteDoctor = require("../controller/doctor/deleteDoctor");
// const getAllDoctors = require("../controller/doctor/getAllDoctors");

router.post("/doctor/login", doctorSignIn);
router.get("/doctor/logout", doctorLogout);
router.get("/doctor/details", doctorDetails);
router.post("/doctor/create", addDoctorController);
// router.get("/doctor", getAllDoctors);
router.patch("/doctor/:id", updateDoctor);
// router.delete("/doctor/:id", deleteDoctor);

// ======================= PRODUCT ROUTES =======================
const createProduct = require("../controller/product/addProduct");
const getAllProducts = require("../controller/product/getProduct");
const getProductByCategory = require("../controller/product/getProductByCategory");
const getProductDetails = require("../controller/product/getProductDetails");
const updateProduct = require("../controller/product/updateProduct");
const deleteProduct = require("../controller/product/deleteProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProductOne");

router.post("/product/create", createProduct);
router.get("/product", getAllProducts);
router.get("/product/category/:category", getProductByCategory);
router.get("/product/:id", getProductDetails);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);

// ======================= SUBSCRIPTION ROUTES =======================
const createSubscription = require("../controller/subscription/addSubscription");
const getAllSubscriptions = require("../controller/subscription/getProduct");
const updateSubscription = require("../controller/subscription/updateProduct");
const deleteSubscription = require("../controller/subscription/deleteProduct");

router.post("/subscription/create", createSubscription);
router.get("/subscription", getAllSubscriptions);
router.patch("/subscription/:id", updateSubscription);
router.delete("/subscription/:id", deleteSubscription);

// ======================= SERVICE ROUTES =======================
const createService = require("../controller/service/addProduct");
const getAllServices = require("../controller/service/getProduct");
const updateService = require("../controller/service/updateProduct");
const deleteService = require("../controller/service/deleteProduct");

router.post("/service/create", createService);
router.get("/service", getAllServices);
router.patch("/service/:id", updateService);
router.delete("/service/:id", deleteService);

// ======================= CART ROUTES =======================
const addToCart = require("../controller/user/addToCartController");
const countCartItems = require("../controller/user/countAddToCartProduct");
const viewCart = require("../controller/user/addToCartViewProduct");
const updateCartItem = require("../controller/user/updateCartProduct");
const deleteCartItem = require("../controller/user/deleteAddToCartProduct");

router.post("/addtocart", addToCart);
router.get("/countAddToCartProduct", countCartItems);
router.get("/view-card-product", viewCart);
router.post("/update-cart-product", updateCartItem);
router.post("/delete-cart-product", deleteCartItem);

// ======================= ORDER & PAYMENT ROUTES =======================
const createOrder = require("../controller/order/createOrder");
const getUserOrders = require("../controller/order/userOrder");
const getAllOrders = require("../controller/order/allOrder");
const verifyPayment = require("../controller/payment/verifyPayment");
const checkout = require("../controller/payment/checkout");
const orderList = require("../controller/order/orderList");

router.post("/order/create", createOrder);
router.get("/order/user", getUserOrders);
router.get("/all-order", getAllOrders);
router.post("/payment/verify", verifyPayment);
router.post("/checkout", checkout);
router.get("/order-list", orderList);

// ======================= SEARCH & FILTER =======================
const searchAll = require("../controller/search/searchAll");
const filterProduct = require("../controller/product/filterProduct");

router.get("/search", searchAll);
router.post("/filter-product", filterProduct);

module.exports = router;
