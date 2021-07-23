# WeTube

Cloning Youtube with Vanilla and NodeJS

## Pages:

- [ ] Home
- [ ] Join
- [ ] Login
- [x] Search
- [ ] User Detail
- [ ] Edit Profile
- [ ] Change Password
- [ ] Upload
- [ ] Video Detail
- [ ] Edit Video

<Root Router>
/ -> Home
/join -> Join
/login -> Login
/search -> Search

<User Router>
/users/:id -> See User
/users/logout -> Log out
/users/edit -> Edit My Profile
/users/remove -> Remove My user

<Video Router>
/videos/:id -> Watch Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

/videos/comments -> Comment on a Video
/videos/comments/delete -> Delete a comment of a Video