#!/bin/sh

if [ -f program.pid ]; then
        kill -9 `cat program.pid`
fi

nohup node ./src > nohup.out 2>&1 &
echo $! > program.pid
