import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    completed: { type: Boolean, default: false },
    board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true } // Board modeline referans
}, {
    collection: 'todos', // Koleksiyon adı burada belirtilir
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

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
