#!/bin/bash -e
# =====================================================================
# Build script running Meteor in Docker environment
#
# Source:
# Web:
#
# =====================================================================

START_DELAY=5

METEOR_HOME=/home/meteor/
METEOR_PROJECT_NAME=meteor-app
METEOR_PROJECT_HOME=/home/meteor/meteor-app

# Error codes
E_ILLEGAL_ARGS=126

# Help function used in error messages and -h option
usage() {
  echo ""
  echo "Docker entry script for Meteor service container"
  echo ""
  echo "-f: Start Meteor in foreground with existing configuration."
  echo "-h: Show this help."
  echo "-s: Initialize environment like -i and start Meteor in foreground." !!!!!
  echo ""
}


initConfig() {
  if [ "$(ls --ignore .keys --ignore .authoritative --ignore .recursive --ignore -A ${METEOR_HOME})"  ]; then
    su meteor
    cd ~/
    git clone https://github.com/rohscx/docker-meteor.git ${METEOR_PROJECT_NAME}
    cd ${METEOR_PROJECT_NAME}
    meteor npm update --quiet
  else
    echo "Meteor configuration already initialized........."
  fi
}


start() {
  sleep ${START_DELAY}
  meteor --settings settings.json
}

# Evaluate arguments for build script.
if [[ "${#}" == 0 ]]; then
  usage
  exit ${E_ILLEGAL_ARGS}
fi

# Evaluate arguments for build script.
while getopts fhis flag; do
  case ${flag} in
    f)
      start
      exit
      ;;
    h)
      usage
      exit
      ;;
    s)
      initConfig
      start
      exit
      ;;
    *)
      usage
      exit ${E_ILLEGAL_ARGS}
      ;;
  esac
done

# Strip of all remaining arguments
shift $((OPTIND - 1));

# Check if there are remaining arguments
if [[ "${#}" > 0 ]]; then
  echo "Error: To many arguments: ${*}."
  usage
  exit ${E_ILLEGAL_ARGS}
fi
