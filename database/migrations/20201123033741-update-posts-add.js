"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.addColumn("posts", "readCount", {
      type: INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn("posts", "commentNum", {
      type: INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn("posts", "shortContent", STRING(200));
  },

  down: async queryInterface => {
    await queryInterface.removeColumn("posts", "readCount");
    await queryInterface.removeColumn("posts", "commentNum");
    await queryInterface.removeColumn("posts", "shortContent");
  }
};
