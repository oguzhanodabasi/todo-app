import mongoose from 'mongoose';

const userBoardSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }
}, {
    collection: 'user_boards', // Koleksiyon adı burada belirtilir
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

const UserBoard = mongoose.model('UserBoard', userBoardSchema);
export default UserBoard;
