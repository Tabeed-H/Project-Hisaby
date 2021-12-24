const Exp = require("../Exp/exp.Model");

/**
 * Function : doAdd
 * Adds a new Expense and saves the same on the DB
 * @param  {JSON}         req.body contains the details that has to be added
 * Success
 * @return {HTTP-Status}  201-Created
 * @return {JSON}         Added Expense JSON Object
 * Error
 * @return {HTTP-Status}  400-Bad Request
 * @return {JSON}         Error JSON  Object
 */
exports.doAdd = async (req, res) => {
  try {
    const exp = new Exp(req.body); //  Creates a new Expense
    await exp.save(); // Saves the created Expense to DB

    res.status(201).send(exp);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Function : doGetExp
 * Gets all the Expense of a Authorized User and Populates them on the exp Field of the User
 * @param   {JSON} req.User From the Authorization middleware
 * Success
 * @return  {HTTP-Status}   200-OK
 * @return  {JSON}          req.user.exp  JSON Object
 * Error
 * @return  {HTTP-Status}   500-Internal Server Error
 * @return  {JSON}          Error JSON Object
 */
exports.doGetExp = async (req, res) => {
  try {
    // Populates the exp field of the User
    await req.user.populate({
      path: "exp",
    });

    res.status(200).send(req.user.exp);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Function : doMarkComplete
 * Marking a Expense as Complete by changing the exp.completed field
 * @param {Mongo Object ID} req.body.expId  ID of the Expense
 * Success
 * @return  {HTTP-Status}   200=OK
 * Error
 * @return  {HTTP-Status}   500-Internal Server Error
 * @return  {JSON}          Error JSON Object
 */
exports.doMarkComplete = async (req, res) => {
  try {
    const exp = await Exp.findOne({ _id: req.body.expid }); // Finds the Expense with the given Id
    exp.completed = true; // Changes the field valude to true
    await exp.save(); // Saves the Expense on DB
    res.status(200).send("Success!");
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Function : doDelete
 * Deletes a Expense
 * @param {Mongo Object ID} req.body.expid  ID of the Expense
 * Success
 * @return {HTTP-Status}    200-OK
 * Error
 * @return {HTTP-Status}    500-Internal Server Error
 * @return {JSON}           Error JSON Object
 */
exports.doDelete = async (req, res) => {
  try {
    const exp = await Exp.findOneAndDelete({ _id: req.body.expid }); // Finds and delete the Expense with the given ID
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};
