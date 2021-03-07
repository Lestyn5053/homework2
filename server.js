const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
require('dotenv').config();
const UserRoutes = require('./routes/userRoutes');
const ProductRoutes = require('./routes/productRoutes');

const app = Express();
app.use(BodyParser.json());
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);

(async () => {
  await Mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
