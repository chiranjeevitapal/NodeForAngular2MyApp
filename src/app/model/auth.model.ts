export class AuthModel {
    constructor(
      public fb_id: string,
      public fb_first_name: string,
      public fb_last_name: string,
      public fb_email: string,
      public fb_gender: string,
      public fb_verified: boolean,
      public fb_picture: string
    ) { }
}
