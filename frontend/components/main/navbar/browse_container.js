import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/session_actions';
import { fetchPlaylists } from '../../../actions/playlist_actions';
import { fetchSongs } from '../../../actions/song_actions';
import { selectAllUnauthoredPlaylists, selectRandomAlbums, selectRandomArtists} from '../../../reducers/selectors';
import MainContent from '../main_content';

const mapStateToProps = (state, ownProps) => {
  return {
    playlists: selectAllUnauthoredPlaylists(state),
    albums: selectRandomAlbums(state),
    artists: selectRandomArtists(state),
    navpath: "browse",
    path: ownProps.location.pathname
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchPlaylists: () => dispatch(fetchPlaylists()),
    fetchSongs: () => dispatch(fetchSongs())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);

// selectRandomAlbums, selectRandomArtists