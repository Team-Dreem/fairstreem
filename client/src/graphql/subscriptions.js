/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGenre = /* GraphQL */ `
  subscription OnCreateGenre {
    onCreateGenre {
      id
      _id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGenre = /* GraphQL */ `
  subscription OnUpdateGenre {
    onUpdateGenre {
      id
      _id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGenre = /* GraphQL */ `
  subscription OnDeleteGenre {
    onDeleteGenre {
      id
      _id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong {
    onCreateSong {
      id
      title
      artist
      description
      image
      price
      genre {
        id
        _id
        name
        createdAt
        updatedAt
      }
      tags
      song_url
      s3_object_key
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
      id
      title
      artist
      description
      image
      price
      genre {
        id
        _id
        name
        createdAt
        updatedAt
      }
      tags
      song_url
      s3_object_key
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
      id
      title
      artist
      description
      image
      price
      genre {
        id
        _id
        name
        createdAt
        updatedAt
      }
      tags
      song_url
      s3_object_key
      createdAt
      updatedAt
    }
  }
`;
