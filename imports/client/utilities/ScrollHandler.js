import React from 'react';
import PropTypes from 'prop-types';

class ScrollHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message:'not at bottom',
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    let scrollNext = this.props.scrollCurrent + this.props.scrollBy;
    // debugs
    //console.log("windowHeight", windowHeight)
    //console.log("docHeight",docHeight)
    //console.log("windowBottom",windowBottom)
    //console.log("scrollNext",scrollNext)
    if ((windowBottom + 21) >= docHeight) {
      this.setState({
        message:'bottom reached'
      });
      this.props.scrollFunction(scrollNext)
    } else {
      this.setState({
        message:'not at bottom'
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    // debug  add to return <div><div/>
    //<div >{this.state.message}</div>
    return (
      <div>
        <div > {this.props.children}</div>
      </div>
    );
  }
}

ScrollHandler.propTypes = {
}

ScrollHandler.defaultProps = {
}

export default ScrollHandler;
