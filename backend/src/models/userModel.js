export default class User {
    /**
     * A constructor for User
     * @param {String} username 
     * @param {String} password 
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.CPmonList = [];
    }
}