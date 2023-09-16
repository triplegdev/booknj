const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ loggin: false }).then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
        await sequelize.createSchema(process.env.SCHEMA);
    }
});
