import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelListContainer from "../components/Layout/ChannelListContainer";
import ChannelContainer from "../components/Layout/ChannelContainer";
import ChannelSearch from "../components/Layout/ChannelSearch";
import TeamChannelList from "../components/Layout/TeamChannelList";
import TeamChannelPreview from "../components/Layout/TeamChannelPreview";
import ChannelInner from "../components/Layout/ChannelInner";
import CreateChannel from "../components/Layout/CreateChannel";
import EditChannel from "../components/Layout/EditChannel";
import TeamMessage from "../components/Layout/TeamMessage";
import UserList from "../components/Layout/UserList";
import ResultsDropdown from "../components/Layout/ResultsDropdown";



import Register from "../components/Header/Register"

import 'stream-chat-react/dist/css/index.css';
import "../styles/chat-api.css";

const cookies = new Cookies();

const apiKey = 'cd4bcsnrt3ej';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}

const ChatApi = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState('');
    const [isEditing, setIsEditing] = useState('');

    if(!authToken) return <Register />

    return(
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}

                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}

                />
            </Chat>
        </div>
    )
}

export default ChatApi;
