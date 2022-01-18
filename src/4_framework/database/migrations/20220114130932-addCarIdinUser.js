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
    await queryInterface.bulkInsert("cars", [
      {
        secure_id: "fa_01",
        model: "flex",
        color: "red",
        year: 2000,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    const values = await queryInterface.sequelize.query("Select * From cars");
    console.log(values[0]);
    await queryInterface.changeColumn("users", "car_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "cars",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "user_id");
  },
};
