import React from 'react';
import PropTypes from 'prop-types';

const MgmtIp = ({role, children}) => {
  if (Roles.userIsInRole(Meteor.userId(), role)) {
    return children;
  }
  return ("sdfad");
}

// checks type, throws and error
MgmtIp.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default MgmtIp;
