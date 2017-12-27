export class User {

    constructor(private id: string, private firstname: string, private lastname: string, private username: string) {}

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
