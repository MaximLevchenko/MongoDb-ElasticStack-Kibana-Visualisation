# MongoDB Technology Overview

## 📝 Table of Contents

- [General Behavior](#general-behavior)
- [Basic Principles](#basic-principles)
- [CAP Theorem](#cap-theorem)
- [Architecture](#architecture)
- [Persistence](#persistence)
- [Security](#security)
- [Advantages and Disadvantages](#advantages-and-disadvantages)
- [Use Cases](#use-cases)
- [Custom Dataset Description](#custom-dataset-description)
- [Conclusion](#conclusion)
- [Sources](#sources)

## General Behavior <a name = "general-behavior"></a>
A document-based, NoSQL database, MongoDB stores the data using flexible BSON documents that support nested structures.
### Differences Among NoSQL Databases
- **Redis**: In-memory data store, ideal for caching and real-time analytics.
- **Apache Cassandra**: Wide-column store designed for scalability and high availability.
- **Neo4j**: Graph database, optimal for managing relationships.

### SQL vs. NoSQL
SQL databases are relational, tabular-based, and support the ACID properties; they are scaled vertically. NoSQL databases, for instance, MongoDB, are schema-less, making it easy to store any structure of data; they scale horizontally among multiple servers.
## Basic Principles <a name = "basic-principles"></a>
MongoDB supports flexibility and scalability through a document-oriented data model, hence sharding. Sharding actually supports horizontal scaling via distributing data over various nodes. The support for replication of data is done to ensure the data are available at all times; it is fault-tolerant.
## CAP Theorem <a name = "cap-theorem"></a>
MongoDB gives preference to availability and partition tolerance over strong consistency. It attains high availability from sharding and network partitioning through the use of replica sets.
## Architecture <a name = "architecture"></a>
A sharded cluster where each of the three shards has a primary with two secondary replicas for MongoDB setup. This provides maximum availability, fault tolerance, and scalability for an architecture. It uses load balancing for routers and metadata management through the use of config servers.
## Persistence <a name = "persistence"></a>
Data durability is ensured through replication, write concern settings, and periodic backups. Replication across shards enhances fault tolerance and data availability.
## Security <a name = "security"></a>
Right now, there is no security implemented in it, but the common practices of security ensured are through authentication, authorization, encryption, and auditing.
## Advantages and Disadvantages <a name = "advantages-and-disadvantages"></a>
- **Advantages**: It provides a flexible schema, horizontal scaling, support for diverse data types, and enhanced fault tolerance through replication.
- **Disadvantages**:  It is hard to deal with data consistency while maintaining it, and with sharding comes more complex system management.

## Use Cases <a name = "use-cases"></a>
Appropriate for workloads with continuously flexible data modeling, dynamic schemas, and horizontal scaling. Not suitable for strict ACID transaction requirements.
## Custom Dataset Description <a name = "custom-dataset-description"></a>
The data model is designed for a MongoDB-based application, related to movies. Collections of the database include movies, embedded movies, comments, users, and theatres. The sharded structure ensures its scalability and its capability to handle and carry out all operations efficiently.
## Conclusion <a name = "conclusion"></a>
Schema flexibility, sharding strategy, and potential security measures make MongoDB a winning data-intensive application choice—just like with the database for information about the movies. With choosing MongoDB also comes the consideration of increased complexity due to sharding and the scale of your application.
## Sources <a name = "sources"></a>
- [MongoDB Cluster Docker Compose](https://github.com/minhhungit/mongodb-cluster-docker-compose)
- [MongoDB Sample Data](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/)
