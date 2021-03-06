// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import CSSClassnames from 'grommet/utils/CSSClassnames';
import VideoShare from './Share';
import VideoPlayButton from './PlayButton';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Overlay extends Component {

  constructor (props, context) {
    super(props, context);

    this._onResponsive = this._onResponsive.bind(this);
    this.state = {
      iconSize: props.size &&
        (props.size === 'small' || props.size === 'medium') ?
          'large' : 'xlarge'
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.size !== this.props.size) {
      this.setState({
        iconSize: newProps.size &&
          (newProps.size === 'small' || newProps.size === 'medium') ?
            'large' : 'xlarge'
      });
    }
  }

  _onResponsive (small) {
    if (small) {
      this.setState({ iconSize: 'medium' });
    } else {
      let iconSize = (('small' === this.props.size) ? undefined : 'xlarge');
      this.setState({ iconSize: iconSize });
    }
  }

  _renderReplayMenu() {
    const { ended, shareLink, shareHeadline, shareText } = this.props;

    let replayContent;
    if (ended) {
      replayContent = (
        <Box className={`${CLASS_ROOT}__replay`} align="center">
          <Heading tag="h3" strong={true} uppercase={true}>Replay</Heading>
          <VideoShare shareLink={shareLink} shareHeadline={shareHeadline}
            shareText={shareText} />
        </Box>
      );
    }

    return replayContent;
  }

  render() {
    const { ended, playing, togglePlay, videoHeader, title, path } = this.props;

    return (
      <Box pad="none" align="center" justify="center"
        className={`${CLASS_ROOT}__overlay`}>
        {videoHeader}
        <Box pad="none" align="center" justify="center">
          <VideoPlayButton iconSize={this.state.iconSize}
            playing={playing}
            ended={ended}
            togglePlay={togglePlay}
            title={title}
            path={path} />
        </Box>
        {this._renderReplayMenu()}
      </Box>
    );
  }
}
