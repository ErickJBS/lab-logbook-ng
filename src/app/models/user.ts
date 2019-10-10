export class User {
    public email: string;
    public name: string;
    public role: number;

    constructor(email: string, name: string, role: number) {
        this.email = email;
        this.name = name;
        this.role = role;
    }
}
