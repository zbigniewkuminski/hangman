import React from 'react';
import YouTube from 'react-youtube';
import "./AuthorsPage.scss";


class AuthorsPage extends React.Component {
  videoId = 'r5uzc3U8Qhc';

  render() {
    const opts = {
      height: '1000',
      width: '1000',
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <div className="authors-page-wrapper">
        <span className="authors">
          ZBYDAN
      </span>
        <span>ENTERTAINMENT</span>
        <br />
        <span>2021</span>
        <YouTube videoId={this.videoId} opts={
          {
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 1,
          }
        }
        } onReady={this._onReady}/>
      </div>
    )
  }

}

export default AuthorsPage;
