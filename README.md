# Nerd Feed

## Features

- **Authentication**
  - [x] Login
  - [ ] Google Login
  - **Register**
    - [x] Check email before sign up
    - [ ] Input validation
  - [ ] Reset Password
  - [ ] Forgot Password
- **Pages**
  - [x] Home (no footer)
  - [ ] Features
  - [ ] Blog
  - [ ] Demo
  - [x] Feed
  - [x] Feed Post
  - [x] Profile
  - [x] Private Message
- **Notifications**
  - [ ] List of notifications
  - [ ] Mark all as read
  - [ ] Delete all notifications
  - [ ] Delete notification
- **Publications**
  - [x] List of publications
  - [x] Add publication
  - [ ] Add image to publication
  - [ ] Delete publication
- **Favorites**
  - [ ] List of favorites
  - [x] Toogle favorite
  - [x] Show favorite count
  - [x] Show if post is favorited
- **Comments**
  - [x] List of comments
  - [x] Add comment (bug: doesn't show profile when pushing new comment, if reloads, it works)
  - [ ] Delete comment
  - [ ] Edit comment
  - [ ] Reply comment
  - [ ] Like comment
  - [x] Show comment count
  - [ ] Show if comment is liked
- **Private Chat**
  - [x] List of private chats
  - [x] Add local chat before start messaging
  - [ ] Add private chat
  - [ ] Delete private chat
  - [ ] Send message

```json
/
├── public/
│ └── favicon.svg
│
├── src
│ ├── application/
│ │ ├── usecases/
│ │ └── auth/
│ │ │ └── AuthService.js
│ │
│ ├── domain/
│ │ ├── entities/
│ │ │ ├── Profile.js
│ │ │ └── User.js
│ │ └── interfaces
│ │ │ ├── ProfileRepositoryInterface.js
│ │ │ └── AuthRepositoryInterface.js
│ │
│ └── infrastructure/
│ │ ├── repositories/ # interaccion con supabase (ej: AuthRepository, ProfileRepository)
│ │ ├── storage/ # LocalStorageUserStore
│ │ └── supabase.js # cliente de supabase
│ │
│ ├── presentation/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── composables/
│ │ ├── pages/
│ │ ├── router/
│ │ ├── App.vue
│ │ └── main.js
│
├── .env
├── index.html
├── package.json
└── ...rest
```
