const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {

    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

   it('can add subdocument to existing document', (done) => {
     const joe = new User({
       name: 'Joe',
       posts: [] });

     joe.save()
      .then(User.findOne({ name: 'Joe'}))
      .then((user) => {
        user.posts.push({ title: 'Test post'});
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'Test post');
        done();
      })
   });

   it('can remove an existing subdocument', (done) => {
     const joe = new User({
       name: 'Joe',
       posts: [{ title: 'New post' }]
     });

     joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
   });

});
