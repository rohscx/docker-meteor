import React, { PropTypes} from 'react';

const IsRole = ({role, children}) => {
  const cssBlur = {
    color: "transparent",
    textShadow: "rgba(0, 0, 0, 0.5) 0px 0px 5px",
    userSelect: "none"

  }
  // debug
  //console.log(children,)
  //typeof(children)
  if (Roles.userIsInRole(Meteor.userId(), role)) {
    return children;
  }
  return <div style={cssBlur}>{children}</div>
}

// checks type, throws and error. children should be simple object in a div
IsRole.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.object.isRequired
};

export default IsRole;
