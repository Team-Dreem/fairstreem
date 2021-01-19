// export default (sequelize, DataTypes) => {
//     const Champion = sequelize.define('champion', {
//       name: {
//         type: DataTypes.STRING,
//       },
//       pictureUrl: {
//         type: DataTypes.STRING,
//       },
//     });

//     return Champion;
//   };

const mongoose = require("mongoose");

const { Schema } = mongoose;

const championSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  pictureUrl: {
    type: String,
    trim: true,
  },
});

const Champion = mongoose.model("Champion", championSchema);

module.exports = Champion;
