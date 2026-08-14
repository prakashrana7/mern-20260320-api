import authService from "../services/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res)=>{
    try{
        const user = await authService.login(req.body);

        const token = jwt.createToken(user);

        res.cookie("authToken", token,{
            maxAge: 86400*1000,
        });
        res.json( {...user, token });
    }catch (error){
        console.error("Login error:", error);

        if (error?.status) {
        return res.status(error.status).json({message: error.message});
        }

        return res.status(500).json({message:"Unable to process login at the moment. Please try again later."});
    }
};

const register = async (req, res)=>{
    try{
        const user = await authService.register(req.body);
        
        const token = jwt.createToken(user);
        
        res.cookie("authToken", token,{
            maxAge: 86400*1000,
        });
        res.json({...user, token });
    }catch (error){
        console.error("Register error:", error);

        if (error?.status) {
        return res.status(error.status).json({message: error.message});
        }

    return res.status(500).json({message:"Unable to create your account at the moment. Please try again later."});
    }
};

const forgotPassword = async (req, res)=>{
    try{
        const data = await authService.forgotPassword(req.body?.email);
        
        res.json(data);
    }catch (error){
        console.error("Forgot password error:", error);

        if (error?.status) {
        return res.status(error.status).json({message: error.message});
        }

    return res.status(500).json({message:"Unable to process your request at the moment. Please try again later."});
    }
};

const resetPassword = async (req, res)=>{
    try{
        const data = await authService.resetPassword(req.body);
        
        res.json(data);
    }catch (error){
        console.error("Reset password error:", error);

        if (error?.status) {
            return res.status(error.status).json({message: error.message});
        }

    return res.status(500).json({message:"Unable to reset your password at the moment. Please try again later."});
    }
};
export default{register, login, forgotPassword, resetPassword };