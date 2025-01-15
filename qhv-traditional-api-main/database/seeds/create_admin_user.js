exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("accounts").insert({
        id: 1,
        name: "Admin",
        user_name: "admin",
        password: "$2a$10$92zgiSdTKOCiOM06ge.C9OFoKDgvgid.d3S/qyPEQ05OP4N8qe74O", // Admin@123
        email: "admin@gmail.com",
        phone: "0123456789",
      });
    });
};
