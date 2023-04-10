import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview'

const cookies = new Cookies();

const SideBar = ({ logout }) => (

    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <FontAwesomeIcon icon={faCar} />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
        </div>
    </div>
);

const ClassifyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Chat-room</p>
    </div>
)

const ChanelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('fullname');
        cookies.remove('email');
        cookies.remove('hashedPassword');

        window.location.reload();
    }

    return (
    <>
        <SideBar logout={logout} />
        <div className="channel-list__list__wrapper">
            <ClassifyHeader />
            <ChannelSearch />
            <ChannelList 
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type="team"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType} 
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        type="team"
                    />
                )}
            />
            <ChannelList 
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type="messaging"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType} 
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        type="messging"
                    />
                )}
            />          
        </div>
    </>    
  )
}

export default ChanelListContainer