const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {
  let joe;

  beforeEach((done) => {
    alex = new User ({ name: 'Alex' });
    joe = new User({name: 'Joe'});
    maria = new User ({ name: 'Maria' });
    zach = new User ({ name: 'Zach' });

    Promise.all([ alex.save(), joe.save(), maria.save(), zach.save() ])
      .then(() => done());
  });

  it('finds all user thit the name of Joe', (done) => {
     // instance of a user
     User.find({ name: 'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });

  it('find a user with particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit result test', (done) => {
    // Alex Joe Maria Zach
    User.find({})
      .sort({ name: 1 }) // 1 = ascending, -1 - descending
      .skip(1)
      .limit(2)
      .then((users) => {
        console.log(users);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        assert(users.length === 2);
        done();
      })
  });
});
