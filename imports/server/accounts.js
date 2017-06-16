Accounts.onCreateUser((options, user) => {
  // console.log(options, user);
  if(options.email == 'test2@gmail.com') {
    user.roles= ['admin'];
  }
  return user;
});
