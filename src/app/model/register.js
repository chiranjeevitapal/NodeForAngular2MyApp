"use strict";
var Register = (function () {
    function Register(_id, email, password, active, role, subscribe, passString) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.active = active;
        this.role = role;
        this.subscribe = subscribe;
        this.passString = passString;
    }
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=register.js.map