import mongoose from 'mongoose';

// MongoDB'ye bağlanma işlemi
const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('MongoDB\'ye başarıyla bağlandı.');
        })
        .catch((err) => {
            console.error('MongoDB bağlantı hatası:', err.message);
            process.exit(1); // Uygulamayı hata durumunda sonlandır
        })
};

export default connectDB;
