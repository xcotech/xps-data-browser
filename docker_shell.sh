#!/bin/bash
usage ()
{
  echo 'Usage : docker_shell.sh <container_name>'
  exit
}

if [ "$#" -ne 1 ]
then
    usage
fi

if [ $1 = "xco_nginx" ]
then
    docker exec -it `docker ps | grep xco_nginx | awk '{print $1}'` bash
else
    usage
fi