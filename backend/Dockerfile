FROM eclipse-temurin:17-jdk-jammy AS build_jar

WORKDIR /opt/build

COPY *.gradle gradle.* gradlew ./

COPY gradle ./gradle

RUN ./gradlew --version

COPY . .

RUN ./gradlew build -x test 

FROM eclipse-temurin:17-jre-jammy

WORKDIR /opt/app

COPY --from=build_jar /opt/build/build/libs/stocks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081:8081

ENTRYPOINT ["java","-jar","app.jar"]
