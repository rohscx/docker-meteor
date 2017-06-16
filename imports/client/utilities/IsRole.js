import React from 'react';

const IsRole = ({role, children}) => {
  if (Roles.userIsInRole(Meteor.userId(Meteor.userId), role)) {
    return children;
  }
  return null;
}

export default IsRole;
