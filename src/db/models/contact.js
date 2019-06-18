module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'This number is already in use',
        },
      },
    },
    {});
  Contact.associate = (models) => {
    Contact.hasMany(models.Sms, {
      foreignKey: 'senderContactId',
      as: 'sentSms',
    });
    Contact.hasMany(models.Sms, {
      foreignKey: 'receiverContactId',
      as: 'receivedSms',
    });
  };
  return Contact;
};
