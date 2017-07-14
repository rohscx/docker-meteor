# Build:
# docker build -t meteorjs/mean .
#
# Run:
# docker run -it meteor/mean
#
# Compose:
# docker-compose up -d

FROM ubuntu:latest
MAINTAINER RoHscx

# 80 = HTTP, 443 = HTTPS, 3000 = MEAN.JS server, 35729 = livereload, 8080 = node-inspector
EXPOSE 80 443 3000 35729 8080

# Set development environment as default
ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q  \
 curl \
 apt-get locale-gen \
 git
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN locale-gen en_US.UTF-8

# Install metoer
 RUN curl https://install.meteor.com/ | sh
 RUN apt-get clean \
 RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


USER meteor
RUN cd ~/
RUN git clone https://github.com/rohscx/docker-meteor.git
RUN meteor npm install --quiet && npm cache clean
WORKDIR /home/docker-meteor


# Run METEOR.js server
CMD bash
