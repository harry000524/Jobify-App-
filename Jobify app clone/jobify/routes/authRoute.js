import express from 'express';
import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from '../controllers/authControllers.js';
import authMiddleWare from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';
import testUser from '../middleware/testUser.js';

const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 1000 * 60 * 15,
  max: 10,
  message: 'Too many requests from this IP, please try agian after some time',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').put(authMiddleWare, testUser, updateUser);
router.route('/getCurrentUser').get(authMiddleWare, getCurrentUser);
router.get('/logout', logout);

// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/updateUser').put(updateUser);
// router.route('/getCurrentUser').get(getCurrentUser);
// router.get('/logout', logout);

// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/updateUser').put(updateUser);
// router.route('/getCurrentUser').get(getCurrentUser);
// router.get('/logout', logout);

// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/updateUser').put(updateUser);
// router.route('/getCurrentUser').get(getCurrentUser);
// router.get('/logout', logout);

// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/updateUser').put(updateUser);
// router.route('/getCurrentUser').get(getCurrentUser);
// router.get('/logout', logout);

// router.route('/forgotPassword').post(forgotPassword);
// router.route('/resetPassword/:resetToken').put(resetPassword);

// router.route('/logout').get(logout);

// router.route('/googleLogin').post(googleLogin);

// router.route('/facebookLogin').post(facebookLogin);

// router.route('/twitterLogin').post(twitterLogin);

// router.route('/linkedinLogin').post(linkedinLogin);

// router.route('/githubLogin').post(githubLogin);

// router.route('/sendVerificationEmail').post(sendVerificationEmail);

// router.route('/verifyEmail').post(verifyEmail);

// router.route('/sendForgotPasswordEmail').post(sendForgotPasswordEmail);

// router.route('/resetPassword').post(resetPassword);

// router.route('/getUser').get(getUser);

// router.route('/getAllUsers').get(getAllUsers);

// router.route('/updateUser').put(updateUser);

// router.route('/deleteUser').delete(deleteUser);')

export default router;
