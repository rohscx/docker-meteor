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


# 80 = HTTP, 443 = HTTPS, 3000 = Meteor.JS server 8080 = node-inspector
EXPOSE 80 8080 443 3000 9229


# Set development environment as default
ENV NODE_ENV development


# Install Utilities
RUN apt-get update \
&& apt-get install -qy curl \
 locales \
 git \
 vim
RUN apt-get clean \
&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
&& locale-gen en_US.UTF-8


# Install Meteor.js
 RUN curl https://install.meteor.com/ | sh


 # Add Entrypoint script
 COPY docker-entrypoint.sh /docker-entrypoint.sh
 ENTRYPOINT [ "/docker-entrypoint.sh" ]
 RUN chmod 755 /docker-entrypoint.sh


# Add Meteor user
RUN adduser --disabled-password --gecos "" meteor


# Set Docker default user and  working directory
USER meteor
WORKDIR /home/meteor



# Run METEOR.js server/app
CMD [ "-s" ]
