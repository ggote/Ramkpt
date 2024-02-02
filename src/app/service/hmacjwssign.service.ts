import { Injectable } from '@angular/core';
// import * as jose from 'node-jose';
// import { JWS, JWSHeaderParameters, JWSSigner, MACSigner } from 'jose';
// import { JWS, JWSHeaderParameters, JWSSigner, MACSigner } from 'jose';
// import * as jose from 'jose'
import * as CryptoJS from 'crypto-js';



@Injectable({
    providedIn: 'root'
  })

  export class HmacJwsSignService {
    constructor() { }


     encryptAndSignJWSWithHMAC = async (header,reqStr: string, secretKey: string, clientid: string): Promise<string> => {
        // const keystore = jose.JWK.createKeyStore();
        // const signingKey = await keystore.generate('oct', 256, { alg: 'HS256', use: 'sig' });
        
        // const jwsHeader = {
        //     alg: 'HS256',
        //     clientid,
        // };
        
        // const jwsObject = await jose.JWS.createSign({ format: 'compact' }, signingKey)
        //     .update(reqStr)
        //     .final();
        
        // return jwsObject;

        try {
            // const keystore = await jose.JWK.createKeyStore();
            // const key = await keystore.add({
            //     kty: 'oct',
            //     k: jose.util.base64url.decode(secretKey),
            //     alg: 'HS256',
            //     use: 'sig',
            // });

            // console.log(key,"key")
            // const signer = jose.JWS.createSign({ format: 'compact', fields: { clientid } }, key);
            // await signer.update(reqStr, 'utf8');
            // const jwsObject = await signer.final();
            // return jwsObject;
            // const token = jwt.sign({ data: reqStr }, secretKey, { algorithm: 'HS256', header: { clientid } });
            // return token;

            // const keystore = jose.JWK.createKeyStore();
            // const signingKey = await keystore.generate('oct', 256, { alg: 'HS256', use: 'sig' });
            
            // const jwsHeader = {
            //     alg: 'HS256',
            //     clientid,
            // };
            
            // const jwsObject = await jose.JWS.createSign({ format: 'compact' }, signingKey)
            //     .update(reqStr)
            //     .final();
            
            // return jwsObject;

            // const signer: JWSSigner = new MACSigner(secretKey);
            // const customParams: Record<string, any> = { clientid };
            // const jwsHeader: JWSHeaderParameters = {
            //     alg: 'HS256',
            //     crit: ['clientid'],
            //     clientid
            // };
            // const jwsObject = new JWS.Sign(reqStr);
            // jwsObject.setProtectedHeader(jwsHeader);
            // jwsObject.sign(signer);
            // return jwsObject.serialize();

             // Encode header and payload as Base64Url
             header={ alg: 'HS256', typ: 'JWT' };
            const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
            const encodedPayload = this.base64UrlEncode(JSON.stringify(reqStr));

            // Combine encoded header and payload with a dot separator
            const encodedMessage = `${encodedHeader}.${encodedPayload}`;

            // Create the HMAC SHA-256 signature
            const signature = this.calculateHmacSha256(encodedMessage, secretKey);

            // Combine encoded message and signature with a dot separator to create the JWT
            const jwt = `${encodedMessage}.${signature}`;

            return jwt;
            
        } catch (error) {
            console.error('Error during encryption and signing:', error.message);
            throw error;
        }
    
    }
    
    signJwsHmac(payload: any, clientId: string, secretKey: string): string {
        const header = {
          alg: 'HS256',
          clientid: clientId
        };
    
        const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
        const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    
        const signature = this.calculateHmacSha256(`${encodedHeader}.${encodedPayload}`, secretKey);
    
        return `${encodedHeader}.${encodedPayload}.${signature}`;
      }
    
      private base64UrlEncode(value: string): string {
        const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
        return this.base64ToBase64Url(base64);
      }
    
      private calculateHmacSha256(message: string, secretKey: string): string {
        const hash = CryptoJS.HmacSHA256(message, secretKey);
        return this.base64ToBase64Url(CryptoJS.enc.Base64.stringify(hash));
      }
    
      private base64ToBase64Url(base64: string): string {
        return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      }

      verifyAndDecryptJWSWithHMAC(encryptedSignedMessage: string, verificationKey: string): string | null {
        try {
          // Decode the JWS-HMAC message
          const [encodedHeader, encodedPayload, signature] = encryptedSignedMessage.split('.');
    
          // Verify the signature
          const isSignatureValid = this.verifySignature(`${encodedHeader}.${encodedPayload}`, signature, verificationKey);
          if (!isSignatureValid) {
            throw new Error('Invalid signature');
          }
    
          // Decode the Base64Url-encoded header and payload
          const decodedHeader = this.base64UrlDecode(encodedHeader);
          const decodedPayload = this.base64UrlDecode(encodedPayload);
    
          // Extract the decrypted message
          const decryptedMessage = decodedHeader + '.' + decodedPayload;
    
          return decryptedMessage;
        } catch (error) {
          console.error('Decryption failed:', error);
          return null;
        }
      }
    
      private verifySignature(message: string, signature: string, verificationKey: string): boolean {
        const expectedSignature = this.calculateHmacSha256(message, verificationKey);
        return expectedSignature === signature;
      }
    
      private base64UrlDecode(value: string): string {
        value = value.replace('-', '+').replace('_', '/');
        while (value.length % 4) {
          value += '=';
        }
        return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
      }

    //  verifyAndDecryptJWSWithHMAC = async(encryptedSignedMessage: string, verificationKey: string): Promise<string> => {
    //     const keystore = jose.JWK.createKeyStore();
    //     const verifyingKey = await keystore.add({
    //         kty: 'oct',
    //         k: jose.util.base64url.decode(verificationKey),
    //         alg: 'HS256',
    //         use: 'sig',
    //     });
        
    //     const jwsObject = await jose.JWS.createVerify(verifyingKey)
    //         .verify(encryptedSignedMessage, 'utf8');
        
    //     const clientId = jwsObject.header.clientid;
    //     console.log(`clientId = ${clientId}`);
        
    //     const isVerified = true; // In node-jose, verification is done automatically during decryption
    //     console.log(`is valid ${isVerified}`);
        
    //     const message = jwsObject.payload.toString('utf8');
    //     return message;
    // }
  }