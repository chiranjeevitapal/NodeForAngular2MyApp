"use strict";
var AuthModel = (function () {
    function AuthModel(fb_id, fb_first_name, fb_last_name, fb_email, fb_gender, fb_verified, fb_picture) {
        this.fb_id = fb_id;
        this.fb_first_name = fb_first_name;
        this.fb_last_name = fb_last_name;
        this.fb_email = fb_email;
        this.fb_gender = fb_gender;
        this.fb_verified = fb_verified;
        this.fb_picture = fb_picture;
    }
    return AuthModel;
}());
exports.AuthModel = AuthModel;
//# sourceMappingURL=auth.model.js.map