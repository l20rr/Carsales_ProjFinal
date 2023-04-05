import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

const SideBar = () => (
    
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <FontAwesomeIcon icon={faCar} />
            </div>
        </div>
    </div>
);

const ClassifyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Contactar Vendedor/Comprador</p>
    </div>
)

const ChanelListContainer = () => {
  return (
    <>
        <SideBar />
        <div className="channel-list__list__wrapper">
            <ClassifyHeader />
        </div>
    </>    
  )
}

export default ChanelListContainer