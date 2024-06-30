FROM gradle:jdk17-alpine as builder
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM openjdk:17-jdk-alpine
COPY --from=builder /home/gradle/src/build/libs/template.jar /app/template.jar
WORKDIR /app
EXPOSE 8072
CMD ["java","-XX:+UseG1GC","-jar","template.jar"]