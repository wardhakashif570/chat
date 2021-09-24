import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../actions/user.actions';
import userimg from '../../image/user.jpg'


const User = (props) => {


    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img src={userimg} alt="" />
            </div>

            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
                <span >{user.firstName} {user.lastName}</span>
                {/* <span>{user.isOnline ? `onlineStatus` : `onlineStatus off`}</span> */}
                <span>{user.isOnline ? `online` : `offline`}</span>
            </div>
        </div>
    );
}
const HomePage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    let unsubscribe;

    useEffect(() => {

        unsubscribe = dispatch(getRealtimeUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.log(error);
            })

    }, []);

    useEffect(() => {
        return () => {

            unsubscribe.then(f => f()).catch(error => console.log(error));

        }
    }, []);


    // const initChat = (user) => {

    //     setChatStarted(true)
    //     setChatUser(`${user.firstName} ${user.lastName}`)
    //     // setUserUid(user.uid);

    // } 
    return (
        <Layout>
            <section className="container">
                <div className="listOfUsers">

                    {
                        user.users.length > 0 ?
                            user.users.map(user => {
                                return (
                                    <User
                                        // onClick={initChat}
                                        key={user.uid}
                                        user={user}
                                    />
                                );
                            }) : null
                    }
                </div>
                <div className="chatArea">
                    {
                        chatStarted ? chatUser : ''
                    }
                    <div className="messageSections">
                        {
                            chatStarted ?
                                <div className="chatControls">
                                    <textarea

                                        placeholder="Write Message"
                                    />
                                    <button >Send</button>
                                </div> : null
                        }

                    </div>
                    <div className="chatControls">
                        <textarea />
                        <button>Send</button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default HomePage;