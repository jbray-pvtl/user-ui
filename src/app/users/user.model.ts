export class User {

    id: string;
    firstname: string;
    lastname: string;
    username: string;

    constructor(id: string, firstname: string, lastname: string, username: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public getUsername(): string {
        return this.username;
    }
}
