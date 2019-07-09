# docker-meteor
Docker {{Meteor}}

To build container:
docker build -t docker-meteor .

## Version 18:01
  The Dockerfile and docker-entrypoint.sh have been updated to allow for a workflow change. Prior to this version any updated would first need to be committed and then pulled from the repository. This was less than ideal. The project is now incorporated in the build when the container is run.
    -d : development mode
    -s sudo : production mode
    $(pwd) : environmental var representing the current directory

    docker run -itd -v $(pwd)/:/home/meteor/meteor-app/ -p 3000:3000 -h meteor --name docker-meteor docker-meteor -d

    docker-compose u


## Version 18:00
  This version is intended to simplify the base code by removing unused single page applications. It will also move the codebase to a newer version of Meteor and NodeJs.
