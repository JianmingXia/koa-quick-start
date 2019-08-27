'use strict';

const ErrorMsg = require('../common/error_msg');
const SysError = require('../common/sys_error');
const Log = require('../plugin/log');
const LogType = require('../common/log_type');

const ESClient = require('../plugin/es');
const {esIndex} = require('../config');

module.exports = {
  /**
   * @param {Object} data
   * @param {Object} data.title
   * @param {Boolean} data.title.isTerm
   * @param {String} data.title.title
   * @param {Object} data.author
   * @param {Boolean} data.author.isTerm
   * @param {String} data.author.author
   * @param {String} data.content
   * @returns {{query: {bool: Object}}
   */
  parseSearchParam(data) {
    const must = [];
    const should = [];

    if (data.title) {
      if (data.title.isTerm) {
        must.push({
          'term': {
            'title.keyword': data.title.title,
          },
        });
      } else {
        should.push({
          'match': {
            'title': data.title.title,
          },
        });
      }
    }

    if (data.author) {
      if (data.author.isTerm) {
        must.push({
          'term': {
            'author.keyword': data.author.author,
          },
        });
      } else {
        should.push({
          'match': {
            'author': data.author.author,
          },
        });
      }
    }

    if (data.content) {
      should.push({
        'match': {
          'content': data.content,
        },
      });
    }

    return {
      'query': {
        'bool': {
          must,
          should,
        },
      },
    };
  },

  /**
   * @param {Object} data
   * @param {Object} data.title
   * @param {Boolean} data.title.isTerm
   * @param {String} data.title.title
   * @param {Object} data.author
   * @param {Boolean} data.author.isTerm
   * @param {String} data.author.author
   * @param {String} data.content
   * @returns {{total: Number, data: [{id:String, title: String, author: String, content: [String]}]}}
   */
  async search(data) {
    const searchBody = this.parseSearchParam(data);

    try {
      const {body} = await ESClient.search({
        body: searchBody,
        index: esIndex.chinesePoetry,
      });

      let res = {};
      if (body.hits) {
        res.total = body.hits.total.value;

        res.data = body.hits.hits.map(searchItem => {
          const {_id: id, _source: source} = searchItem;
          return {
            id,
            ...source,
          };
        });
      }

      return res;
    } catch (err) {
      Log.error({
        type: LogType.RUN_WARN,
        msg: err.message,
      });

      throw new SysError(ErrorMsg.NO_CHINESE_POETRY);
    }
  },
};
