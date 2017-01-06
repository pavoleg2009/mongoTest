const assert = require('assert');
const User = require('../src/user');

describe('Updating user tests: ', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe', likes: 0});
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

  it('A user can have their post count incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
