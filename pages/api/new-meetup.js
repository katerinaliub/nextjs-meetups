import { MongoClient } from 'mongodb';

async function handler(request, response) {
    if (request.method === 'POST') {
        const data = request.body;
        const client = await MongoClient.connect('mongodb+srv://katerina:1621324n@cluster0.4e57v.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsConnections = db.collection('meetups');

        meetupsConnections.insertOne(data);

        client.close();

        response.status(201).json({message: 'Meetup Inserted'});
    }
};

export default handler;
