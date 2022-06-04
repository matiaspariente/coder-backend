import mongoose from "mongoose";
import bCrypt from "bcrypt-nodejs"


(async () => {
    const CS = 'mongodb+srv://coderhouse:coderhouse@matiaspariente.qctoeul.mongodb.net/?retryWrites=true&w=majority'
    try {
        await mongoose.connect(CS);
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
})();

const usersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

export default usersSchema