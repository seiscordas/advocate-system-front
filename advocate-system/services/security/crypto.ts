import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'hex';
const IV_LENGTH = 16;
const KEY = process.env.AUTH_SECRET!;

export const encrypt = (data: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, new Buffer(KEY), iv);
  return Buffer.concat([cipher.update(data,), cipher.final(), iv]).toString(ENCODING);
}

export const decrypt = (data: string) => {
  const binaryData = Buffer.from(data, ENCODING);
  const iv = binaryData.slice(-IV_LENGTH);
  const encryptedData = binaryData.slice(0, binaryData.length - IV_LENGTH);
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);

  return Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString();
}


// class CryptoManager {

//     private cryptoKey: CryptoKey;
//     private secretKey: string;
//     constructor(){
//         this.secretKey = process.env.AUTH_SECRET as string;
//         const rawKey = crypto.getRandomValues(new Uint8Array(16));
//         this.cryptoKey = this.deriveCryptoKey(rawKey);  
//     }
  
//     async generateKey(): Promise<void> {
//       this.cryptoKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);

//       const rawKey = crypto.getRandomValues(new Uint8Array(16));
//       console.log("this.cryptoKey: ", this.cryptoKey);
//       console.log("rawKey: ", rawKey);
//     }
  
//     async encryptData(data: string): Promise<string> {
//       if (!this.cryptoKey) {
//         throw new Error('Chave não gerada. Chame generateKey() primeiro.');
//       }
  
//       const encodedData = new TextEncoder().encode(data);
//       const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, this.cryptoKey, encodedData);
//       return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
//     }
  
//     async decryptData(encryptedData: string): Promise<string> {
//       if (!this.cryptoKey) {
//         throw new Error('Chave não gerada. Chame generateKey() primeiro.');
//       }
  
//       const decodedData = atob(encryptedData);
//       const decryptedArrayBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, this.cryptoKey, new TextEncoder().encode(decodedData));
//       return new TextDecoder().decode(decryptedArrayBuffer);
//     }

//     async deriveCryptoKey(password: string): Promise<CryptoKey> {
//         const encoder = new TextEncoder();
//         const encodedPassword = encoder.encode(password);
      
//         const importedKey = await crypto.subtle.importKey(
//           'raw',
//           encodedPassword,
//           { name: 'PBKDF2' },
//           false,
//           ['deriveBits', 'deriveKey']
//         );

//         console.log("importedKey: " + importedKey);
      
//         const salt = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]); // Exemplo de sal
//         const iterations = 100000; // Número de iterações (ajuste conforme necessário)
      
//         const derivedKey = await crypto.subtle.deriveKey(
//           {
//             name: 'PBKDF2',
//             salt: salt,
//             iterations: iterations,
//             hash: 'SHA-256',
//           },
//           importedKey,
//           { name: 'AES-GCM', length: 256 },
//           true,
//           ['encrypt', 'decrypt']
//         );
      
//         return derivedKey;
//       }
      
      
      
// }

// export default CryptoManager
  
// // Exemplo de uso da classe CryptoManager
// async function main() {
// const cryptoManager = new CryptoManager();
// await cryptoManager.generateKey();

// const dataToEncrypt = 'Seu token JWT aqui';
// const encryptedData = await cryptoManager.encryptData(dataToEncrypt);

// console.log('Token JWT criptografado:', encryptedData);

// // Exemplo de como descriptografar
// const decryptedData = await cryptoManager.decryptData(encryptedData);

// console.log('Token JWT descriptografado:', decryptedData);
// }

// main();
  