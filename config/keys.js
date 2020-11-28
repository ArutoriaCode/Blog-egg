'use strict';
const LIKE_TYPE = {
  POST: 1,
  COMMENT: 2
};

const COMMENT_TYPE = {
  // 在文章进行评论
  POST: 1,
  // 在留言处直接评论或在其他评论下进行评论
  COMMENT: 2
};

module.exports = {
  LIKE_TYPE,
  COMMENT_TYPE
};
