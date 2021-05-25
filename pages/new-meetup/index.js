import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";

const NewMeetupPage = props => {

    const router = useRouter();

    const addMeetupHandler = async (enteredData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        router.replace('/');
    };

    return (
        <>
            <Head>
                <title>Add New Meetup</title>
                <meta name="description" content="Add your own meetups here!"></meta>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>
    )
};

export default NewMeetupPage;
