FROM gradle:jdk17-alpine as builder
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM openjdk:17-jdk-alpine
COPY --from=builder /home/gradle/src/build/libs/reports.jar /app/reports.jar
WORKDIR /app
EXPOSE 8074
CMD ["java","-XX:+UseG1GC","-jar","reports.jar"]