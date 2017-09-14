import React, { PropTypes} from 'react';
// note: THis does not provide true secuirty, it simply obfuscates
const IsRole = ({role, children}) => {
  const cssBlur = {
    color: "transparent",
    textShadow: "rgba(0, 0, 0, 0.5) 0px 0px 7px",
    userSelect: "none",
    pointerEvents: "none",
    cursor: "default",
    opacity: "100%"

  }
  // debug
  //console.log(children,)
  //typeof(children)
  if (Roles.userIsInRole(Meteor.userId(), role)) {
    return children;
  }
  return (<div style={cssBlur}>{children}</div>)
}

// checks type, throws and error. children should be simple object in a div
IsRole.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired
};

export default IsRole;
