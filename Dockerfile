# Build:
# docker build -t meanjs/mean .
#
# Run:
# docker run -it meanjs/mean
#
# Compose:
# docker-compose up -d

FROM ubuntu:latest
MAINTAINER RoHscx

# 80 = HTTP, 443 = HTTPS, 3000 = Meteor server, 35729 = livereload, 8080 = node-inspector
EXPOSE 3000

# Set development environment as default
ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 git \
 ssh \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 sudo \
 apt-utils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install meteor
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN curl https://install.meteor.com/ | sh

# Install Meteor Prerequisites
RUN useradd -ms /bin/bash meteor
USER meteor
RUN git clone https://github.com/rohscx/docker-meteor.git meteor-web
WORKDIR /home/meteor-web
 

# Run Meteor server
CMD meteor
