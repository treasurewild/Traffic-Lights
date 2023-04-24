import React from 'react';
import { socket } from '../socket';
import { Button } from 'react-bootstrap';

const ConnectionManager = () => {
    const connect = () => {
        socket.connect();
    }

    const disconnect = () => {
        socket.disconnect();
    }

    return (
        <>
            <Button className='m-1 btn-warning' onClick={connect}>Connect</Button>
            <Button className='m-1 btn-secondary' onClick={disconnect}>Disconnect</Button>
        </>
    );
};

export default ConnectionManager;