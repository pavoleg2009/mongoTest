const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yep, it really is'});

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean uo dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count()) // returns count of collection items
      .then((count) => {
        assert(count === 0);
        done();
      })
  })
});
