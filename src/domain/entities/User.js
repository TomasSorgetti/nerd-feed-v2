export class User {
  constructor({ id, email, profile = null }) {
    this.id = id;
    this.email = email;
    this.profile = profile; 
  }
}
