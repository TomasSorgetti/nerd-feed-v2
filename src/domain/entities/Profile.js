export class Profile {
  // todo private properties
  constructor({
    id,
    username,
    email,
    tag = "Nerd Feed User",
    bio = "A simple starter example bio.",
    avatar,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.tag = tag;
    this.bio = bio;
    this.avatar = avatar;
  }
}
