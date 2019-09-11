'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user', [{
      first_name: 'John',
      last_name: 'Doe',
      email: 'demo@demo.com',
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
