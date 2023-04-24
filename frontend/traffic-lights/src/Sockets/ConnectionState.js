import React from 'react'

const ConnectionState = ({ isConnected }) => {
    return (
        <>
            {isConnected ?
                <p>
                    Connected: {isConnected}
                </p>
                :
                <p>Not connected.</p>
            }
        </>
    )
}

export default ConnectionState