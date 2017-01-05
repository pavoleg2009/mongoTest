const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user with:', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name:'Joe'});
    joe.save()
      .then(() => done());
  });

  it('instance method remove', (done) => {
    // joe.remove
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove a bunch a records with a given criteria
    User.remove({ name: 'Joe'})
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  })

  it('model method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('model method findByIdAndRemove', (done) => {
    User.findByIdAndRemove({ _id: joe._id })
    .then(() => User.findOne({ _id: joe._id }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });
});
