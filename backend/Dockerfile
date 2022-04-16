FROM openjdk:11.0.6-jdk-slim-buster AS BUILD_JAR

WORKDIR /opt/app

COPY *.gradle gradle.* gradlew ./

COPY gradle ./gradle

RUN ./gradlew --version

COPY . .

RUN ./gradlew build

FROM openjdk:11-jre-slim-buster

#ARG JAR_FILE=build/libs/stocks-0.0.1-SNAPSHOT.jar
COPY --from=BUILD_JAR /opt/app/build/libs/stocks-0.0.1-SNAPSHOT.jar app.jar
#COPY ${JAR_FILE} app.jar

EXPOSE 8081:8081

ENTRYPOINT ["java","-jar","/app.jar"]
