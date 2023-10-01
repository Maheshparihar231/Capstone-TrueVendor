FROM openjdk:11
ADD ./target/search-service-0.0.1-SNAPSHOT.jar /usr/src/search-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "search-service-0.0.1-SNAPSHOT.jar"]
