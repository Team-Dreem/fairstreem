const db = require("./connection");
const faker = require("faker");
const { User, Song, Genre } = require("../models");

db.once("open", async () => {
  await Genre.deleteMany();

  const genres = await Genre.insertMany([
    { name: "Rock/Alternative" },
    { name: "R&B" },
    { name: "Country" },
    { name: "Hip-hop/Rap" },
    { name: "Electronic" },
    { name: "Jazz" },
    { name: "Blues" },
    { name: "Classical" },
    { name: "Other" },
  ]);

  console.log("genres seeded");

  await Song.deleteMany();

  const songs = await Song.insertMany([
    {
      title: "Catharsis",
      artist: "Jeff Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "JeffJohnston.jpg",
      price: 0.99,
      genre: genres[0]._id,
      tags: "indie",
      song_url: "empty",
      s3_object_key: "empty",
    },
    {
      title: "Wild Eyes",
      artist: "Jeff Warren Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "JeffJohnston.jpg",
      price: 0.99,
      genre: genres[2]._id,
      tags: "outlaw",
      song_url: "empty",
      s3_object_key: "empty",
    },
  ]);

  console.log("songs seeded");

  await User.deleteMany();

  await User.create({
    avatar: "../../public/images/default.png",
    username: "Pam86",
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        songs: [songs[0]._id],
      },
    ],
  });

  await User.create({
    avatar: null,
    username: "EH42",
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const avatar = "../../public/images/default.png";
    const username = faker.internet.userName();
    const firstName = faker.internet.firstName();
    const lastName = faker.internet.lastName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ avatar, username, firstName, lastName, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log("users seeded");

  // create artist data
  const artistData = [];

  for (let i = 0; i < 50; i += 1) {
    const avatar = "../../public/images/default.png";
    const artistName = faker.internet.artistName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log("users seeded");

  process.exit(0);
});
