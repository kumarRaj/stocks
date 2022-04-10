FROM openjdk:11-jre-slim-buster

ARG JAR_FILE=build/libs/stocks-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8081:8081

ENTRYPOINT ["java","-jar","/app.jar"]