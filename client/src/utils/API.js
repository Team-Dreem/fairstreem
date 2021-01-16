// save song data for a logged in user
export const saveSong = (bookData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

export const uploadSong = (userData) => {
  return fetch("/api/artists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

router.post("/", (req, res) => {
  const s3 = new S3();
  const params = {
    ACL: "public-read",
    Bucket: "fairstreem",
    Key: uuid(),
    Body: req.files.song.data,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }

    Song.create({
      title: req.body.title,
      artist: req.body.artist,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      song_url: data.Location,
      s3_object_key: data.Key,
    })
      .then((dbSongData) => res.redirect("/"))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

export const searchS3Bucket = (query) => {};
