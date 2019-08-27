'use strict';

const SearchService = require('../service/search');

module.exports = {
  /**
   * @param {*} ctx
   */
  async search(ctx) {
    const {title, author, content} = ctx.reqParams.body;

    ctx.body = await SearchService.search({
      title,
      author,
      content,
    });
  },
};
