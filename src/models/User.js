import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, 
    required: [true, "User name is required."], 
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [50,  "Name cannot exceed 50 characters."],
    },
    email: {
        type: String, 
        required: [true, "Email is required."], 
        lowercase: true, 
        unique: true,
        validate:{
            validator:(value)=>{
                const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;

                return emailRegex.test(value);
            },
            message:"Invalid Email Address",
        },
    },
    password:{
        type: String,
        required: [true, "Password is required."],
        minLength:[6, "Password length must be greater than 6."],
    },
    phone:{
        type: String,
        required: [true, "Phone number is required."],
        unique: true,
         match: [/^(98|97)\d{8}$/, "Phone number must start with 98 or 97 and contain exactly 10 digits."],
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    address: {
        city: {
            type: String,
            required: [true, "Local Address is required."],
            minLength: [3, "Local Address must be at least 3 characters."],
            maxLength: [150, "Local Address cannot exceed 150 characters."],
            match: [/^[A-Za-z0-9][A-Za-z0-9\s,-]*[A-Za-z0-9]$/, "Please enter a valid city."],
        },
        province: { 
            type: String,
            required: [true, "Please select a province."],
            validate: {
                validator: (value) => {
                    return (
                        typeof value === "string" &&
                        value.trim().length > 0
                    );
                },
                message: "Please select a province.",
            },
        },
        street: String,
        country:{
            type: String,
            default: "Nepal",
        },
    },
    //role based access control
    roles:{
        type: [String],
        enum: ["CUSTOMER","MERCHANT", "ADMIN", "SUPER_ADMIN"],
        default:["CUSTOMER"],
    },
    profileImageUrl: {
        type: String,
    },
});

export default mongoose.model("User", userSchema);
