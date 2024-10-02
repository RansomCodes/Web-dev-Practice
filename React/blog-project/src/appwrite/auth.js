/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from '../conf/conf'
import { Client, Account, ID} from 'appwrite';

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setEndpoint(conf.appwriteProjectId);
        this.account= new Account(this.client)
    }

    async createAccount({email,password,name}){
        try
        {
            const userAcc=await this.account.create(ID.unique,email,password,name);
            if(userAcc){
                return this.login({email,password})
            }
            else
            {
                return userAcc
            }
        }
        catch(e)
        {
            throw e;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(e){
            throw e;
        }
    }

    async getCurrentUser(){
        try{
            await this.account.get();
        }catch(e){
            throw e;
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions('current');
        } catch(e){
            throw e;
        }
    }
}

const authService=new AuthService();

export default authService