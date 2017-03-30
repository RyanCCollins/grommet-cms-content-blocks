/* @flow */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { findDOMNode } from 'react-dom';
import type { GrommetBoxTypes$Size } from 'grommet';
import ImageBox from './ImageBox';
import WrapperBox from './WrapperBox';
import ImageWrapper from './ImageWrapper';
import ContentBox from './ContentBox';
import calculateAnimation from './animationUtils';

type Props = {
  carousel: any,
  imageSize: GrommetBoxTypes$Size,
  content: string,
  button: ?{
    label: string,
    path: string,
  }
}

type State = {
  scale: number,
  opacity: number,
  isMobile: boolean
}

class BlockMarquee extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.heroRef = null;
    this.state = {
      scale: 1,
      isMobile: window.innerWidth <= 720,
      opacity: 1,
    };
  }
  state: State;
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }
  handleScroll: () => void;
  handleResize: () => void;
  heroRef: ?HTMLElement;
  props: Props;
  handleScroll() {
    if (this.heroRef) {
      const node = findDOMNode(this.heroRef);
      if (node) {
        const state = calculateAnimation(node);
        window.requestAnimationFrame(() => {
          this.setState({
            ...state,
          });
        });
      }
    }
  }
  handleResize() {
    const isMobile = window.innerWidth <= 720;
    this.setState({
      isMobile,
    });
  }
  render() {
    const { carousel, imageSize, content, button } = this.props;
    const { scale, opacity, isMobile } = this.state;
    const size = imageSize ? imageSize.toLowerCase() : 'large';
    const randomIndex = Math.floor(Math.random() * carousel.length);
    const parsedContent = content || '';
    const { image, color, justification } = carousel[randomIndex];
    const align = justification === 'left' ? 'start' : 'end';
    const contentClassName = (color === 'white' && !isMobile)
      ? 'grommetux-background-color-index--dark'
      : 'grommetux-background-color-index--light';
    const imagePath = image && image.path
      ? image.path
      : '';

    return (
      <WrapperBox size={size} id="grommet-cms-content-blocks--marquee">
        <ImageWrapper id="grommet-cms-content-blocks--marquee__image-wrapper" size={size}>
          <ImageBox
            id="grommet-cms-content-blocks--marquee__image-box"
            ref={(ref) => {
              this.heroRef = ref;
            }}
            size={size}
            style={{ transform: `scale(${scale})` }}
            scale={scale}
            texture={imagePath}
          />
        </ImageWrapper>
        <ContentBox
          id="grommet-cms-content-blocks--marquee__content-box"
          justify="center"
          pad="large"
          align={align}
          style={!isMobile && { opacity }}
        >
          <Box
            pad="large"
            justify="center"
            className={contentClassName}
          >
            <Markdown
              content={parsedContent}
              components={{
                p: { props: { size: 'large', margin: 'small' } },
                h1: { props: { strong: true } },
                h2: { props: { strong: true } },
              }}
            />
            <Footer className="grommetux-background-color-index--light">
              {button && button.label && button.path &&
                <Button
                  primary
                  {...button}
                />
              }
            </Footer>
          </Box>
        </ContentBox>
      </WrapperBox>
    );
  }
}

export default BlockMarquee;
