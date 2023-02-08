export const createUser = async (sessionId) => {
    const lastActivity = moment()
      .utcOffset("+00:00")
      .format("YYYY-MM-DD hh:mm:ss");
    const result = await sequelize.query(
      `update userSession set lastActivity= :lastActivity where id=:sessionId`,
      {
        replacements: { sessionId, lastActivity },
        type: QueryTypes.UPDATE,
      }
    );
    return true;
  };