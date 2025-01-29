import mongoose, {mongo} from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'EL rol es obligatorio']
    }
})

export default mongoose.model('Role', RoleSchema);