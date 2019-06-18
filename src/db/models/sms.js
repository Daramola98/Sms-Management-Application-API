module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define(
    'Sms',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['SENT', 'DELIVERED'],
        defaultValue: 'SENT',
      },
    },
    {},
  );
  Sms.associate = (models) => {
    // associations can be defined here
    Sms.belongsTo(models.Contact, {
      foreignKey: 'senderContactId',
      onDelete: 'CASCADE',
    });
    Sms.belongsTo(models.Contact, {
      foreignKey: 'receiverContactId',
      onDelete: 'CASCADE',
    });
  };
  return Sms;
};
