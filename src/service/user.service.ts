export class UserService {
    public async userLogin(email: string, password: string) {
            if (email === 'excellence@gmail.com' && password === '123456789') {
                return { email: email };
            } else {
                throw new Error("Invalid email or password");
            }
    }
}