const assert = require('assert');
const User = require('../src/user');

describe('Updating user tests: ', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance SET & SAVE method', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);

  });

  it('instance can UPDATE method', (done) => {
    assertName(joe.update({ name: 'Alex'}),done);
  });

  it('A class UPDATE method', (done) => {
    assertName(
      User.update({ name: 'Joe'}, { name: 'Alex'}),
      done
    );
  });

  it('A class selectOneAndUpdate method', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}),
      done
    );
  });

  it('A class delectByIdAndUpdate method', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex'}),
      done
    );
  });

});
