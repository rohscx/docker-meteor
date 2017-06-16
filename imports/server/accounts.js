Accounts.onCreateUser((options, user) => {
  // console.log(options, user);
  if(Meteor.settings.admins.indexOf(options.email) > -1 ) {
    user.roles= ['admin'];
  }
  return user;
});
