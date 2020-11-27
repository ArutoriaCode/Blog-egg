"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("like", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ownerId: {
        type: Sequelize.INTEGER,
        field: "ownerId"
      },
      type: {
        type: Sequelize.INTEGER,
        field: "type"
      },
      uid: {
        type: Sequelize.INTEGER,
        field: 'uid'
      }
    }, {
      tableName: 'like',
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable("like");
  }
};
