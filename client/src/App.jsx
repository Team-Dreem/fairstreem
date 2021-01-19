import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Upload from "./pages/Upload";
import Champion from "./pages/Champion";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { listGenres, listSongs } from "./graphql/queries";

import { IconButton, Paper } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FavoriteIcon from "@material-ui/icons/Favorite";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

Amplify.configure(awsconfig);

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      // const genreData = await API.graphql(graphqlOperation(listGenres));
      // const genreList = genreData.data.listGenres.items;
      // console.log("GENRE LIST:", genreList);
      const songData = await API.graphql(graphqlOperation(listSongs));
      const songList = songData.data.listSongs.items;
      console.log("SONG LIST:", songList);
      setSongs(songList);
    } catch (error) {
      console.log("error on fetching songs:", error);
    }
  };
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <AmplifySignOut />
            <h2>My App Content</h2>
          </header>
          <div className="songList">
            {songs.map((song) => {
              return (
                <Paper variant="outlined" elevation={2}>
                  <div className="songCard">
                    <IconButton aria-label="play">
                      <PlayArrowIcon />
                    </IconButton>
                    <div>
                      <div className="songTitle">{song.title}</div>
                      <div className="artist">{song.artist}</div>
                    </div>
                    <div>
                      <IconButton aria-label="like">
                        <FavoriteIcon />
                      </IconButton>
                    </div>
                    <div className="songDescription">{song.description}</div>
                  </div>
                </Paper>
              );
            })}
          </div>
        </div>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/songs/:id" component={Detail} />
              <Route exact path="/success" component={Success} />
              <Route
                exact
                path="/upload"
                render={(props) => <Upload {...props} />}
              />
              <Route
                exact
                path="/champion/:id"
                render={(props) => <Champion {...props} />}
              />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}
// Did you notice how we use the <StoreProvider> to wrap all of our components? Everything between those JSX tags are considered the children of <StoreProvider>; that's why it was so important that we had ...props in the definition of our StoreProvider function!

// export default App;

export default withAuthenticator(App);
