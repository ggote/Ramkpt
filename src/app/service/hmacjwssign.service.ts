import { Injectable } from '@angular/core';
import * as jose from 'node-jose';


@Injectable({
    providedIn: 'root'
  })

  export class HmacJwsSignService {
    constructor() { }


     encryptAndSignJWSWithHMAC = async (reqStr: string, secretKey: string, clientid: string): Promise<string> => {
        const keystore = jose.JWK.createKeyStore();
        const signingKey = await keystore.generate('oct', 256, { alg: 'HS256', use: 'sig' });
        
        const jwsHeader = {
            alg: 'HS256',
            clientid,
        };
        
        const jwsObject = await jose.JWS.createSign({ format: 'compact' }, signingKey)
            .update(reqStr)
            .final();
        
        return jwsObject;
    }
    
     verifyAndDecryptJWSWithHMAC = async(encryptedSignedMessage: string, verificationKey: string): Promise<string> => {
        const keystore = jose.JWK.createKeyStore();
        const verifyingKey = await keystore.add({
            kty: 'oct',
            k: jose.util.base64url.toBuffer(verificationKey),
            alg: 'HS256',
            use: 'sig',
        });
        
        const jwsObject = await jose.JWS.createVerify(verifyingKey)
            .verify(encryptedSignedMessage, 'utf8');
        
        const clientId = jwsObject.header.clientid;
        console.log(`clientId = ${clientId}`);
        
        const isVerified = true; // In node-jose, verification is done automatically during decryption
        console.log(`is valid ${isVerified}`);
        
        const message = jwsObject.payload.toString('utf8');
        return message;
    }
  }