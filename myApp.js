const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const document = new Person({ name: "Rodrigo", age: 30, favoriteFoods: ["Pasta"] });
  document.save(function (err, data) {
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ 'name': personName }, function (err, data) {
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ 'favoriteFoods': food }, function (err, data) {
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, savedPerson) {
      done(null, savedPerson);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ 'name': personName }, { 'age': ageToSet }, { 'new': true }, function (err, updatedPerson) {
    done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ "name": nameToRemove }, function (err, data) {
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let query = Person.find({ 'favoriteFoods': foodToSearch }).
    sort("name").
    limit(2).
    select("name favoriteFoods");

  query.exec(function (err, data) {
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
