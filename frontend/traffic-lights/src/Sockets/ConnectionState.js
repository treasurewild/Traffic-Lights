import React from 'react';

const ConnectionState = ({ isConnected, shortId }) => {
    return (
        <>
            {isConnected ?
                <p>
                    Connected to lesson: {shortId}
                </p>
                :
                <p>Not connected.</p>
            }
        </>
    )
}

export default ConnectionState