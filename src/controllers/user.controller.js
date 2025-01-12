import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import UserResource from "../resources/user.resource.js";


async function signup(req, res) {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        preferences: Joi.array().items(Joi.string()).required()
    })
    const { error, value } = userSchema.validate(req.body, { abortEarly: true });

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
            errors
        })
    }

    if(UserModel.emailExists(value.email)){
        return res.status(400).json({
            errors: ["Email already exists"]
        })
    }

    const user = value;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.id = UserModel.getInsertId();
    UserModel.addUser(user);
    return res.json({
        success: true,
        message: "User created successfully",
        data: UserResource.resource(user)
    });
}

async function login(req, res) {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const { error, value } = loginSchema.validate(req.body, { abortEarly: true });

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
            errors
        })
    }

    const email = value.email;
    const password = value.password;
    const user = UserModel.getUserByEmail(email);
    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json({
            success: false,
            message: "Username or password wrong"
        });
    }
    const JWT_SECRET = process.env.JWT_SECRET || "r@nd0mS3cr3tK3y!";
    const JWT_EXPIRES_IN = "1d";
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
    return res.json({
        success: true,
        message: "User logged in successfully",
        token,
        data: {
            user: UserResource.resource(user)
        }
    });
}

function getProfile(req, res) {
    const id = req.user.id
    const user = UserModel.getUserById(id);
    if(user){    
        return res.json({
            data: UserResource.resource(user)
        });
    }
    return res.status(404).json({
        message: "User not found"
    });
}

function updateProfile(req, res) {
    let user = req.user;
    const id = user.id;
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
    const updateProfileSchema = Joi.object({
        name: Joi.string().required(),
    })

    const { error, value } = updateProfileSchema.validate(req.body, { abortEarly: true });

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
            errors
        })
    }

    user.name = value.name;
    user = UserModel.updateUserById(id, user);

    return res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
            user: UserResource.resource(user)
        }
    });
}

function updatePreferences(req, res) {
    let user = req.user;
    const id = user.id;
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    const prefSchema = Joi.object({
        preferences: Joi.array().items(Joi.string()).required(),
    })
    const { error, value } = prefSchema.validate(req.body, { abortEarly: true });

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
            errors
        })
    }

    user.preferences = value.preferences;
    user = UserModel.updateUserById(id, user);
    return res.json({
        success: true,
        message: "User preferences updated successfully",
        preferences: user.preferences
    });
}

function getPreferences(req, res) {
    let user = req.user;
    const id = user.id;
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
    return res.json({
        preferences: user.preferences
    });
}

async function changePassword(req, res) {
    let user = req.user;
    const id = user.id;
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
    const passwordSchema = Joi.object({
        current_password: Joi.string().required(),
        new_password: Joi.string().required(),
    })
    const { error, value } = passwordSchema.validate(req.body, { abortEarly: true });

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
            errors
        })
    }

    console.log(value.current_password, user.password)
    if(!await bcrypt.compare(value.current_password, user.password)){
        return res.status(401).json({
            success: false,
            message: "Old password wrong"
        });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hashSync(value.new_password, salt);
    user = UserModel.updateUserById(id, user);
    return res.json({
        success: true,
        message: "User password changed successfully",
        data: {
            user: UserResource.resource(user)
        }
    });
}

export { signup, login, getProfile, updateProfile, updatePreferences, getPreferences, changePassword };