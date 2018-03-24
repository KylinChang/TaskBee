import openSocket from 'socket.io-client';

import config from '../config/config';

const socket = openSocket(config.DEVWebsite);

export {
  socket,
};
