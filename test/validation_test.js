const assert = require('assert');
const User = require('../src/user');

describe('Validation test: ', () => {

  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();

    // user.validate((validationResult) => { // async call
    //
    // });

//    const message = validationResult.errors.name.message;
    const { message } = validationResult.errors.name; // ES6 alternative syntax
    assert(message === 'Name is required.')
  });

  it('requires user\'s name be longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 caracters.');
  });

  it('dissalow invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 caracters.');
        done();
      });
  });

});
