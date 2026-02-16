#!/bin/bash

npm run start &
sleep 5
cd tests
npm run test
