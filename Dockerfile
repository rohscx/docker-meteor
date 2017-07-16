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

# 80 = HTTP, 443 = HTTPS, 3000 = Meteor.JS server
EXPOSE 80 443 3000

# Set development environment as default
ENV NODE_ENV development

# Install Utilities
RUN apt-get update \
&& apt-get install -qy apt-utils \
 curl \
 locales \
 git
RUN apt-get clean \
&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
&& locale-gen en_US.UTF-8

# Install Meteor.js
 RUN curl https://install.meteor.com/ | sh


# Add Meteor user
RUN adduser --disabled-password --gecos "" username
USER meteor
WORKDIR ~/docker-meteor

# Clone application
RUN cd ~/ \
  && git clone https://github.com/rohscx/docker-meteor.git \
  && cd ~/docker-meteor \
  && meteor npm update --quiet

# Run METEOR.js server/app
CMD meteor --settings settings.json
