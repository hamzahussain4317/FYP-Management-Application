//IMPORTANT: a sample for microservices implementation,still in progress
const db = require("../db"); // Assuming you have a db module to interact with your database
async function getUnregisteredUsersByRole(role) {
  if (role === "student") {
    return await db.students.findMany({ where: { isRegistered: false } });
  } else if (role === "supervisor") {
    return await db.supervisors.findMany({ where: { isRegistered: false } });
  }
}

async function getUsersByIds(role, ids) {
  if (role === "student") {
    return await db.students.findMany({ where: { id: { in: ids } } });
  } else if (role === "supervisor") {
    return await db.supervisors.findMany({ where: { id: { in: ids } } });
  }
}

async function markUsersAsRegistered(role, userId) {
  if (role === "student") {
    await db.students.update({
      where: { id: userId },
      data: { isRegistered: true },
    });
  } else if (role === "supervisor") {
    await db.supervisors.update({
      where: { id: userId },
      data: { isRegistered: true },
    });
  }
}

async function createLoginCredentials({ email, password, role, userId }) {
  await db.users.create({
    data: {
      email,
      password,
      role,
      linkedId: userId, // or studentId / supervisorId
    },
  });
}

module.exports = {
  getUnregisteredUsersByRole,
  getUsersByIds,
  markUsersAsRegistered,
  createLoginCredentials,
};
