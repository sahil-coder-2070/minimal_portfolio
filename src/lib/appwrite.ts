import { Client, Databases, ID } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

if (!PROJECT_ID || !ENDPOINT) {
  console.warn("Appwrite credentials not configured");
}

const client = new Client()
  .setEndpoint(ENDPOINT ?? "https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID ?? "");

const databases = new Databases(client);

export { client, databases, ID };
