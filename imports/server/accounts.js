Accounts.onCreateUser((options, user) => {
  // console.log(options, user);
  if(options.email == 'test3@gmail.com') {
    user.roles= ['admin'];
  }
  return user;
});
