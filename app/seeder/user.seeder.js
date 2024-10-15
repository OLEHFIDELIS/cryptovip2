


const users = [
    {
      username: "johndoe123",
       email: "hndoe123@example.com",
      password: "password123"
    },
    {
      username: "janesmith456",
      email: "janesmith456@example.com",
      password: "password456"
    },
    {
      username: "mikejohnson789",
      email: "mikejohnson789@example.com",
      password: "password789"
    },
    {
      username: "annabrown101",
      email: "annabrown101@example.com",
      password: "password101"
    },
    {
      username: "davidharris234",
      email: "davidharris234@example.com",
      password: "password234"
    }
];

const userSeedRecords = async () => {
    for (const element of users) {
      await createUser(element);
   }
  
}

module.exports = userSeedRecords