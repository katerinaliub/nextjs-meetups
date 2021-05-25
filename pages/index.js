import Head from "next/Head";
import { MongoClient } from 'mongodb';

import MeetupList from "../components/meetups/MeetupList";

const HomePage = props => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="A lot of React Meetups!"></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
};

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://katerina:1621324n@cluster0.4e57v.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsConnections = db.collection('meetups');
    const meetups = await meetupsConnections.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        }
    };
}

export default HomePage;
