import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { withAuthenticator } from '@aws-amplify/ui-react'

import { createSong as CreateSong } from '../graphql/mutations'
import { listSongs as ListSongs } from '../graphql/queries'
import config from '../aws-exports'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

function App() {
  const [file, updateFile] = useState(null)
  const [songName, updateSongName] = useState('')
  const [songs, updateSongs] = useState([])
  useEffect(() => {
    listSongs()
  }, [])

  // Query the API and save them to the state
  async function listSongs() {
    const songs = await API.graphql(graphqlOperation(ListSongs))
    updateSongs(songs.data.listSongs.items)
  }

  function handleChange(event) {
    const { target: { value, files } } = event
    const fileForUpload = files[0]
    updateSongName(fileForUpload.name.split(".")[0])
    updateFile(fileForUpload || value)
  }

  return (
    <div style={styles.container}>
      <input
        type="file"
        onChange={handleChange}
        style={{margin: '10px 0px'}}
      />
      <input
        placeholder='Song Name'
        value={songName}
        onChange={e => updateSongName(e.target.value)}
      />
      <button
        style={styles.button}
        onClick={createSong}>Create Song</button>

      {
        songs.map((p, i) => (
          <img
            style={styles.image}
            key={i}
            src={p.image}
          />
        ))
      }
    </div>
  );
}

const styles = {
  container: {
    width: 400,
    margin: '0 auto'
  },
  image: {
    width: 400
  },
  button: {
    width: 200,
    backgroundColor: '#ddd',
    cursor: 'pointer',
    height: 30,
    margin: '0px 0px 8px'
  }
}

export default withAuthenticator(App);
