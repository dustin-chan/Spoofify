import React from 'react';
import NavBar from '../navbar/navbar';
import { PulseLoader } from 'react-spinners';
import SongsIndexItem from './songs_index_item';
import Header from '../header/header';
import Modal from '../modals/modal';

class GridShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.fetchElement = this.props.fetchPlaylist || this.props.fetchAlbum;
    this.elementId = this.props.playlistId || this.props.albumId;
    this.fetchElement = this.fetchElement.bind(this);
  }

  componentDidMount(){
    this.fetchElement(this.elementId)
    .then( () => setTimeout(() => this.setState({loading: false}), 700));
  }

  render () {
    const {playlist, album, logout, songs} = this.props;
    if (album) {
      playlist = album;
    }
    let tracks = '';
    if(songs[0]){
       tracks = songs.map( (song) => {
        return (
          <SongsIndexItem key={song.id} song={song} playlist={playlist}/>
        );
      });
    } else {
      tracks = (
        <div className="no-results">
          Nothing to see here...
        </div>
      );
    }

    if (this.state.loading) {
      //add gradient to background
      return (
        <div className='loading'>
          <PulseLoader
            sizeUnit={"px"}
            height={40}
            width={40}
            color={'#bbffe8'}
            loading={this.state.loading}
          />
        </div>
      );
    }
    // <div>
    //   <NavBar className="nav" logout={logout.bind(this)}/>
    // </div>
    return (
      <div className="main-container">

        <div className="show-body">

          <div className="body-items">
            <div className="playlist-show-item" key={playlist.id}>
              <div className="playlist-show-item-image">
                <img src={playlist.photoUrl}></img>
              </div>
              <div className="playlist-show-subtext">
                <p>{playlist.title}</p>
                <span>{playlist.author}</span>
              </div>
            </div>

            <div className="tracks">
              {tracks}
            </div>

          </div>
        </div>


        <Modal/>
      </div>
    );
  }
}
export default GridShow;
