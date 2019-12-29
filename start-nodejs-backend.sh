#!/bin/bash

cd server/nodejs/
cp ../../kotus-sanalista/kotus-sanalista_v1.xml ./kotus-sanalista_v1.xml
yarn install
nodejs index.js