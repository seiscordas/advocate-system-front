import { Secret, sign, verify } from 'jsonwebtoken';

class JWT {
  private key: Secret | null = null;

  getKey(): Secret {
    if (!this.key) {
      this.key = process.env.AUTH_SECRET as Secret;
    }
    return this.key;
  }

  generateToken(data: object): string {
    const secret = this.getKey();
    console.log("data: ", data, secret)
    const token = sign(data, secret, { algorithm: 'HS256' });
    return token;
  }

  verifyToken(token: string): object {
    const secret = this.getKey();
    const decoded = verify(token, secret) as object;
    return decoded;
  }
}

export default JWT;
