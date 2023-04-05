import React from "react";
import { Link } from "react-router-dom";
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChanelListContainer from "../components/Layout/ChannelListContainer";
import ChannelContainer from "../components/Layout/ChannelContainer";

import "../styles/chat-api.css";

const apiKey = 'cd4bcsnrt3ej';

const client = StreamChat.getInstance(apiKey);

const ChatApi = () => {
    return(
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChanelListContainer

                />
                <ChannelContainer

                />
            </Chat>
        </div>
    )
}

export default ChatApi;
