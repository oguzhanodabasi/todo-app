import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    salt: { type: String, default: '' },
    refresh_token: { type: String, default: '' }
}, {
    collection: 'users', // Koleksiyon adı burada belirtilir
    minimize: false,  // Boş alt belgeleri belgede tutar
    timestamps: true,  // createdAt ve updatedAt alanlarını ekler
    //versionKey: false,  // __v alanını eklemez
    // toJSON: {
    //     virtuals: true,  // Sanal alanları JSON çıktısına dahil eder
    //     transform: (doc, ret) => {  // JSON çıktısını değiştirmek için bir transform fonksiyonu
    //         delete ret.password;  // Parola alanını JSON çıktısından kaldırır
    //         return ret;
    //     }
    // },
    // toObject: { virtuals: true }  // Sanal alanları JavaScript objesi çıktısına dahil eder
});

const User = mongoose.model('User', userSchema);

export default User;
