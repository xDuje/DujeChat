const users = [];

// Join sobi i kojoj sobi
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// trenutni korisnici
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// Korisnik napušta
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Korisnici u sobi
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
