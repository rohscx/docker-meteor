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
RUN adduser --disabled-password --gecos "" meteor


# Run Entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]
RUN chmod 755 /docker-entrypoint.sh


# Set Docker default user and  working directory
USER meteor
WORKDIR /home/meteor
RUN git clone https://github.com/rohscx/docker-meteor.git meteor-app \
&& meteor npm update --quiet



# Run METEOR.js server/app
CMD [ "-s" ]
