export class Register {

    constructor(
        public _id: string,
        public email: string,
        public password: string,
        public active: boolean,
        public role: string,
        public subscribe: boolean,
        public passString: string
    ) { }
}
