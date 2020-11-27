"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "likeNum", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      field: "likeNum"
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn("posts", "likeNum");
  }
};
