const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 5000;   

app.post('/doc', async () => {
  const authClient = await auth()

  const createDocResponse = await createDoc(authClient);

  const documentId = createDocResponse.data.documentId
  console.log({ link: "https://docs.google.com/document/d/" + documentId + "/edit#" });

  await shareWith10Pines(authClient, documentId)
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

async function auth() {
  const auth = new google.auth.GoogleAuth({
      keyFile: 'google_credentials.json',
      scopes: ['https://www.googleapis.com/auth/drive']
    });
  
  return auth.getClient()
}

const createDoc = async (authClient) => {
  const client = google.docs({
      version: 'v1',
      auth: authClient
  });

  return client.documents.create({
    requestBody: {
      title: 'Your new document!'
    },
  })
}

async function shareWith10Pines(authClient, documentId) {
  const drive = google.drive({
    version: 'v3', 
    auth: authClient
  });

  const level = { 
    type: "domain",
    domain: "10pines.com", 
    role: "writer"
   }
  
  const { data } = await drive.permissions.create({ 
    fileId: documentId, 
    sendNotificationEmail: false, 
    requestBody: level
  })

  return data;
}
