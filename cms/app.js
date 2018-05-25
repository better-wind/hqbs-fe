'use strict';

var proxy = require('fm-reverse-proxy');
proxy.start({
  port: 8002,
  prefixPath: '/cms-test',
  staticPath: '',
  target: 'http://118.178.125.173'
});