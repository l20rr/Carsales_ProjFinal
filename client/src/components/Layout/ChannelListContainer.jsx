import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview'

const SideBar = () => (

    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <FontAwesomeIcon icon={faCar} />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner">
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

const ChanelListContainer = () => {
  return (
    <>
        <SideBar />
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