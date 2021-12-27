const mongoose = require("mongoose");

const URL = `mongodb+srv://admin:tab69A@cluster0.doxpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`; // DB address

mongoose.connect(URL, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log(`DB Connected!`);
});
