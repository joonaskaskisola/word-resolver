#!/bin/bash

cd server/php/
cp ../../kotus-sanalista/kotus-sanalista_v1.xml ./kotus-sanalista_v1.xml
php -S 0.0.0.0:3001 index.php
