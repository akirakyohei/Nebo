#FROM gradle:jdk17-alpine as builder
#COPY --chown=gradle:gradle . /home/gradle/src
#WORKDIR /home/gradle/src
#RUN gradle build --no-daemon

#FROM openjdk:17-jdk-alpine
#COPY --from=builder /home/gradle/src/build/libs/configserver.jar /app/configserver.jar
#WORKDIR /app
#EXPOSE 8088
#CMD ["java","-XX:+UseG1GC","-jar","configserver.jar"]

# using multistage docker build
# ref: https://docs.docker.com/develop/develop-images/multistage-build/

# temp container to build using gradle
FROM gradle:jdk17-alpine AS TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
#COPY build.gradle settings.gradle $APP_HOME

COPY gradle $APP_HOME/gradle
COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src

RUN gradle build || return 0
COPY . .
RUN gradle clean build

# actual container
FROM adoptopenjdk/openjdk17:alpine-jre
ENV ARTIFACT_NAME=configserver.jar
ENV APP_HOME=/usr/app/

WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .

EXPOSE 8080
ENTRYPOINT exec java -jar ${ARTIFACT_NAME}