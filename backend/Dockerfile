FROM openjdk:11.0.6-jdk-slim-buster AS BUILD_JAR

WORKDIR /opt/build

COPY *.gradle gradle.* gradlew ./

COPY gradle ./gradle

RUN ./gradlew --version

COPY . .

RUN ./gradlew build -x test 

FROM openjdk:11-jre-slim-buster

WORKDIR /opt/app

COPY --from=BUILD_JAR /opt/build/build/libs/stocks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081:8081

ENTRYPOINT ["java","-jar","app.jar"]
