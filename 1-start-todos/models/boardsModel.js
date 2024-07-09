import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    collection: 'boards', // Koleksiyon adı burada belirtilir
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

const Board = mongoose.model('Board', boardSchema);
export default Board;
