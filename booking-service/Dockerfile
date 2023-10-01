FROM openjdk:11
ADD ./target/booking-service-0.0.1-SNAPSHOT.jar /usr/src/booking-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "booking-service-0.0.1-SNAPSHOT.jar"]