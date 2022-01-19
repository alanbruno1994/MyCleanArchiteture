"suse strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "car_id", {
      // add colum
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "cars",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "car_id");
  },
};
