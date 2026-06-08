/**
 * Appwrite Spotify Collection Setup Script (ESM Version)
 * 
 * This script automates the creation of the 'spotify' collection and its
 * required attributes with public read/write permissions.
 * 
 * Run using Node's native env loader:
 *   node --env-file=.env scripts/setup-appwrite.js
 */

import * as sdk from 'node-appwrite';

async function setup() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_SPOTIFY_COLLECTION_ID || 'spotify';
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!projectId || !databaseId) {
    console.error('Error: NEXT_PUBLIC_APPWRITE_PROJECT_ID or NEXT_PUBLIC_APPWRITE_DATABASE_ID are missing in environment variables.');
    process.exit(1);
  }

  if (!apiKey) {
    console.error('Error: APPWRITE_API_KEY is missing in your environment variables.');
    process.exit(1);
  }

  console.log(`Connecting to Appwrite at ${endpoint}...`);
  const client = new sdk.Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const databases = new sdk.Databases(client);

  try {
    console.log(`Checking collection "${collectionId}"...`);
    try {
      await databases.createCollection(
        databaseId,
        collectionId,
        'Spotify Last Played Caching',
        [
          sdk.Permission.read(sdk.Role.any()),
          sdk.Permission.create(sdk.Role.any()),
          sdk.Permission.update(sdk.Role.any()),
        ]
      );
      console.log('Collection created successfully.');
    } catch (colErr) {
      if (colErr.code === 409 || colErr.message?.includes('already exists')) {
        console.log(`Collection "${collectionId}" already exists. Verifying/updating permissions...`);
        try {
          await databases.updateCollection(
            databaseId,
            collectionId,
            'Spotify Last Played Caching',
            [
              sdk.Permission.read(sdk.Role.any()),
              sdk.Permission.create(sdk.Role.any()),
              sdk.Permission.update(sdk.Role.any()),
            ]
          );
        } catch (permErr) {
          console.warn('Could not update permissions (may already be set correctly):', permErr.message || permErr);
        }
      } else {
        throw colErr;
      }
    }

    // Wait slightly to prevent race conditions on attribute creation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const attributes = [
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'artist', type: 'string', size: 255, required: true },
      { key: 'albumArt', type: 'string', size: 1000, required: false },
      { key: 'songUrl', type: 'string', size: 1000, required: false },
      { key: 'lastPlayedAt', type: 'string', size: 100, required: false },
      { key: 'isPlaying', type: 'boolean', required: false, default: false },
    ];

    for (const attr of attributes) {
      try {
        console.log(`Creating attribute: "${attr.key}"...`);
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.size,
            attr.required
          );
        } else if (attr.type === 'boolean') {
          await databases.createBooleanAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.required,
            attr.default
          );
        }
        console.log(`Attribute "${attr.key}" created successfully.`);
        // Sleep slightly between attribute creation to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (attrErr) {
        if (attrErr.code === 409 || attrErr.message?.includes('already exists')) {
          console.log(`Attribute "${attr.key}" already exists. Skipping.`);
        } else {
          console.error(`Failed to create attribute "${attr.key}":`, attrErr.message || attrErr);
        }
      }
    }

    console.log('\n🎉 Successfully configured Appwrite collection attributes!');
    console.log('Please wait up to 1-2 minutes for Appwrite to finish indexing the new attributes.');
  } catch (error) {
    console.error('Operation failed:', error.message || error);
    process.exit(1);
  }
}

setup();
