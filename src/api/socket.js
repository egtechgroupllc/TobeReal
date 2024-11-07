import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import {baseUrl} from './url';
import {useAuthentication} from '~/hooks/useAuthentication';

const newSocket = io(baseUrl, {
  transports: ['websocket', 'polling'], // Fallback to polling
});

export const updateSocketToken = token => {
  if (newSocket) {
    newSocket.disconnect();
    newSocket.io.opts.extraHeaders = {
      Authorization: token,
    };
    newSocket.connect();
  }
};

export function useSocket() {
  const {token} = useAuthentication(); // Get the token from the hook
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      updateSocketToken(token);
      setSocket(newSocket);
    }
  }, [token]);

  return socket;
}
