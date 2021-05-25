import {MongoClient, ObjectId} from "mongodb";

import MeetupDetails from "../../components/meetups/MeetupDetais";
import Head from "next/head";

const MeetupDetailsPage = props => {
    return (
        <>
            <Head>
                <title>{props.meetup.title}</title>
                <meta name="description" content={props.meetup.description}></meta>
            </Head>
            <MeetupDetails
                description={props.meetup.description}
                address={props.meetup.address}
                title={props.meetup.title}
                id={props.meetup.id}
                image={props.meetup.image}
            />
        </>
    );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://katerina:1621324n@cluster0.4e57v.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsConnections = db.collection('meetups');
    const meetups = await meetupsConnections.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: { meetupId: meetup._id.toString() }})),
    }
}

export async function getStaticProps(context) {
    const id = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://katerina:1621324n@cluster0.4e57v.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsConnections = db.collection('meetups');
    const selectedMeetup = await meetupsConnections.findOne({_id: ObjectId(id)});

    return {
        props: {
            meetup: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        },
    };
}

export default MeetupDetailsPage;
