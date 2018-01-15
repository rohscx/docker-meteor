#!/bin/bash -e
# =====================================================================
# Build script running Meteor in Docker environment
#
# Source:
# Web:
#
# =====================================================================

START_DELAY=2

METEOR_HOME=/home/meteor/
METEOR_PROJECT_NAME=meteor-app
METEOR_PROJECT_HOME=/home/meteor/meteor-app
METEOR_PROJECT_APP=/home/meteor/meteor-app
METEOR_PROJECT_CD="cd ~/meteor-app"
METEOR_PROJECT_GIT_PULL="git pull"
METEOR_PROFILE="100"
METEOR_NODE_OPTIONS="--debug-brk"
GIT_PROJECT="https://github.com/rohscx/docker-meteor.git"
GIT_PROJECT_BRANCH="docker-meteor-18.01"





# Error codes
E_ILLEGAL_ARGS=126

# Help function used in error messages and -h option
usage() {
  echo ""
  echo "Docker entry script for Meteor service container"
  echo ""
  echo "-f: Start Meteor in foreground with existing configuration."
  echo "-d: Start Meteor in foreground with debug configuration."
  echo "-h: Show this help."
  echo "-s: Initialize environment like -i and start Meteor in foreground." !!!!!
  echo ""
}


initConfig() {
  if [ -f "${METEOR_PROJECT_NAME}/logs/setupComplete" ]; then
    # do nothing run the app
    echo "Meteor configuration already initialized....."
    cd ${METEOR_PROJECT_NAME}
    meteor npm install
  else
    echo "Creating setupComplete file in"
    cd ${METEOR_PROJECT_NAME}
    touch logs/setupComplete
    ls $(pwd)  
    echo "Running Meteor npm install"
    meteor npm install
  fi
}


start_prod() {
  #sleep ${START_DELAY}
  cd ~/meteor-app
  echo "Starting Meteor application...."
  meteor --settings settings.json --production > logs/stdout.log 2> logs/stderr.log
}

start_dev() {
  #sleep ${START_DELAY}
  cd ~/meteor-app
  export METEOR_PROFILE
  export METEOR_NODE_OPTIONS
  echo "Starting Meteor application...."
  meteor --settings settings.json > logs/stdout.log 2> logs/stderr.log
}

# Evaluate arguments for build script.
if [[ "${#}" == 0 ]]; then
  usage
  exit ${E_ILLEGAL_ARGS}
fi

# Evaluate arguments for build script.
while getopts fhisd flag; do
  case ${flag} in
    d)
      initConfig
      start_dev
      exit
      ;;
    f)
      start_prod
      exit
      ;;
    h)
      usage
      exit
      ;;
    s)
      initConfig
      start_prod
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
