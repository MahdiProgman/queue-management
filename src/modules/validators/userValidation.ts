import { body, ValidationChain } from "express-validator";
import UserModel from "../../models/user.js";

export default new (class {
    registerValidation(): ValidationChain[] {
        return [
            // email validations
            body('email')
                .notEmpty()
                .withMessage('the email field not be empty'),
            body('email')
                .isEmail()
                .withMessage('the email must be a valid email'),
            body('email')
                .custom(async (value) => {
                    const userExists: UserModel | null = await UserModel.findOne({ where: { email: value } });
                    if (userExists) {
                        return Promise.reject('E-mail Already in use');
                    }
                }),
            // password validations
            body('password')
                .notEmpty()
                .withMessage('the password field not be empty'),
            body('password')
                .matches(/^[A-Za-z1-9@]{3,}$/)
                .withMessage('you need to select a stronger password for yourself'),
            // first_name validation
            body('first_name')
                .notEmpty()
                .withMessage("the first_name field not be empty"),
            // last_name validation
            body('last_name')
                .notEmpty()
                .withMessage("the last_name field not be empty")
        ];
    }

    loginValidation(): ValidationChain[] {
        return [
            // email validations
            body('email')
                .notEmpty()
                .withMessage('the email field not be empty'),
            body('email')
                .isEmail()
                .withMessage('the email must be a valid email'),
            // password validations
            body('password')
                .notEmpty()
                .withMessage('the password field not be empty')
        ]
    }
})();