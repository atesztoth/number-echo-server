# Number Echo Server [![Build Status](https://travis-ci.org/atesztoth/number-echo-server.svg?branch=master)](https://travis-ci.org/atesztoth/number-echo-server)

A little server that echoes the number back you've sent to it via a request.

## Details

Can be used with any client, an example one is attached, that is made in react.

## Install
Clone, run npm install.

If you wish to use the example client, ought you run an npm i 
in the "EXAMPLE_CLIENT" directory too.

## Endpoints

- GET /number/{number}
  - number: the number you would like to have echoed back (eg. 100)
