const mongoose = require("mongoose");
const URL = `mongodb://127.0.0.1:27017/hisaby`;
mongoose.connect(URL, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log(`DB Connected!`);
});
