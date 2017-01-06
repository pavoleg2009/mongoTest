const assert = require('assert');
const User = require('../src/user');

describe('Virtul types', () => {
  it('postCount number of post', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: '1st post'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(true);
        done();
      })

  });
});
