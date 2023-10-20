"use strict";

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "maulana",
        age: 23,
        address: "Tangerang",
        role: "Super Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const user = await User.findAll();

    await queryInterface.bulkInsert("Auths", [
      {
        email: "maulanaabdullana123@gmail.com",
        password:
          "$2a$12$wUN3Scog9BCmplJw9FK8HOTNAc7faa26AbyfK2pg8VJqblfVjDENe",
        userId: user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
