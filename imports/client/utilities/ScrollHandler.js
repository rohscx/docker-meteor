import React from 'react';

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
    //console.log("windowHeight", windowHeight)
    //console.log("docHeight",docHeight)
    console.log("windowBottom",windowBottom)
    if ((windowBottom + 21) >= docHeight) {
      this.setState({
        message:'bottom reached'
      });
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
    console.log(this.state.message)
    console.log(this)
    return (
      <div>
        <div > {this.props.children}</div>
        <div >{this.state.message}</div>
      </div>
    );
  }
}

ScrollHandler.propTypes = {
}

ScrollHandler.defaultProps = {
}

export default ScrollHandler;
