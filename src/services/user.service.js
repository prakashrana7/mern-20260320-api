import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_SUPER_ADMIN } from "../constants/roles.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileUploader.js";
import authService from "./auth.service.js";

const getAll = async (query) => {
    const sort = query.sort ? JSON.parse(query.sort):{};
    const offset = query.offset ?? 0;
    
    const filters={};
    
    const { name, email, phone} = query;
    
    if (name) filters.name = { $regex: name , $options: "i" };
    if (email) filters.email = { $regex: email , $options: "i" };
    if (phone) filters.phone = { $regex: phone , $options: "i" };
        
    return await User.find(filters).select("-password").sort(sort).skip(offset);
};

const getById =async(id, authUser) => {
     if (authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN)) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }
    return await User.findById(id).select("-password");
};

const createUser = async (data)=>{
    return await authService.register(data);
};

const updateUser = async (id, data, authUser) => {
    if (authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN)) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

      if (data?.phone) {
        const existingUser = await User.findOne({
            phone: data.phone,
            _id: { $ne: id },
        });

        if (existingUser) {
            throw {
                status: 400,
                message: "Phone number is already registered with another user.",
            };
        }
    }
    
    return await User.findByIdAndUpdate(
        id, 
         {
            name: data?.name,
            phone: data?.phone,
            address: data?.address,
            isActive: data?.isActive,
         }, 
         { 
            returnDocument: "after",
            runValidators: true,
          },
        ).select("-password");
 };

const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);

    return "User deleted successfully.";
};

const updateProfileImage = async(id, file)=>{
    const uploadedFiles = await uploadFile([file]);
    return await User.findByIdAndUpdate(
        id, 
        {
            profileImageUrl: uploadedFiles[0].url, 
            },
             { returnDocument: "after" },
            ).select("-password");
};

const updateUserRoles = async (id, roles, authUser) => {
     const allowedRoles = [ROLE_ADMIN, ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_SUPER_ADMIN, ];

    const hasInvalidRole = roles.some(
        (role) => !allowedRoles.includes(role)
    );

    if (hasInvalidRole) {
        throw {
            status: 400,
            message: "Invalid role.",
        };
    }

    if (
        (roles.includes(ROLE_ADMIN) || roles.includes(ROLE_SUPER_ADMIN)) && 
        !authUser.roles.includes(ROLE_SUPER_ADMIN)
    ) {
       throw {
            status: 403,
            message: "Access denied.",
        };
    }
    return await User.findByIdAndUpdate(id, { roles }, { returnDocument: "after" },
    ).select("-password");
};

export default { 
    createUser, 
    getAll, 
    getById, 
    updateUser, 
    deleteUser, 
    updateProfileImage, 
    updateUserRoles, 
};