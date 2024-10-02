/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from '../conf/conf'
import { Client, ID,Databases, Storage, Query} from 'appwrite';

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setEndpoint(conf.appwriteProjectId);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title,content, featuredImage, status})
    {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deleteDocument(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try
        {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }catch(e)
        {
            console.log(e)
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(id){
        try
        {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                id
            )
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async getFilePreview(id){
        try
        {
            return this.Storage.getFilePreview(
                conf.appwriteBucketId,
                id,
            )
        }catch(e){
            console.log(e)
            return false;
        }
    }
}

const service=new Service()
export default service