# MongoDB Technology Overview


## Database choice</a>🔍
- I chose MongoDB due to its **high scalability and flexibility**, which allows for efficient handling of large volumes of diverse data such as **movie information, user comments, and theater details**. The ability to modify this information without strict data schemas is particularly advantageous for a project with heterogeneous and constantly changing data, as is often the case with user-generated content and multimedia metadata. 📊

- I opted not to select another NoSQL database because I wanted to practically explore MongoDB specifically, aiming to deepen my experience with NoSQL databases. MongoDB offers a broad set of features well-suited for handling varied and complex data structures, making it an ideal choice for this project. 🗄️

- The use of MongoDB is advisable when **horizontal scalability** is needed to process a large volume of data with an inconsistent structure, where frequent updates and changes to the data are the norm. This setup is ideal for both analytical and operational queries where fast response times are critically important. ⏲️

- However, the choice of MongoDB might not be optimal if complex transactional operations with multiple dependencies and relationships are required, where traditional SQL databases might offer more robust and optimized solutions. This consideration was relevant to my project, but I embraced the opportunity to explore MongoDB and implemented various database queries effectively. Additionally, if the project requires strict real-time data consistency, other database solutions might be more appropriate. 🖥️
### Differences Among NoSQL Databases🌟
- **MongoDB** is a document-oriented NoSQL database, which is quite different from the others introduced in this paper: Redis, Apache Cassandra, Neo4j.
- **Redis** is a key-value data store and is good in caching and rapid storage of data, while in MongoDB, the kind of data and structure of documents can be more complex and flexible. 
- **Apache Cassandra** is a columnar database designed for high availability and scalability, especially in distributed storage. But MongoDB has been optimized for the flexibility of document structures and horizontal scaling. 
- **Neo4j** is a graph database, specifically designed to operate with graph structures and relationships between objects. However, MongoDB will be most beneficial if used with documents that have hierarchical or complex structures. 
- **Compared with relational databases**, MongoDB does not need a rigid table schema, which makes it highly flexible both in terms of development and iteration. 
- **Data Representation**: MongoDB represents a document using BSON (binary JSON), while in the case of the relational database, tables, rows, and columns are used.
### **MongoDB Basic Principles** 📚
- MongoDB is a popular *NoSQL database* known for its document-oriented nature.

- It primarily uses a *distributed data model*. Depending on the deployment setup, both horizontal scaling (sharding) and vertical scaling are possible.

- *Sharding* is a core feature of MongoDB, allowing it to distribute data across multiple servers. This helps in ensuring high throughput and horizontal scalability.

- *Replication* is also natively supported in MongoDB, enhancing availability and redundancy. A group of MongoDB servers, known as a replica set, ensures data reliability and fault tolerance.

- While Redis is an in-memory key-value store, Apache Cassandra is a column-family store, and Neo4j is a graph database, MongoDB stands out with its *document data model*. This allows for flexible schema representation, especially beneficial for applications with evolving data structures.

- Unlike traditional relational databases that use tables, rows, and columns to represent data, MongoDB uses *collections and BSON (binary JSON) documents*, making data integration more straightforward for certain types of applications.

- This distinction in data representation and storage mechanisms, coupled with its scalability features, makes MongoDB a preferred choice for many large-scale applications and enterprises.

## CAP Theorem🌐 <a name = "cap-theorem"></a>
MongoDB gives preference to availability and partition tolerance over strong consistency. It attains high availability from sharding and network partitioning through the use of replica sets.
## Architecture <a name = "architecture"></a>🔑
A **sharded cluster** where each of the three shards has a **primary with two secondary replicas** for MongoDB setup. This provides **maximum availability, fault tolerance, and scalability** for an architecture. It uses load balancing for routers and metadata management through the use of config servers.
## Persistence <a name = "persistence"></a>🔐
Data durability is ensured through **replication**, write concern settings, and periodic backups. Replication across shards enhances fault tolerance and data availability.
## ✅ **Advantages and Disadvantages of Using MongoDB for my project** ❌
### Advantages ✅:
- **Scalability** 📈: MongoDB is ideal for handling large volumes of unstructured data, making it perfect for managing detailed movie information, user comments, and theater details that can expand dynamically.
- **Schema Flexibility** 🔄: The unstructured data model allows for easy adjustments to the data structure without the need for complex migrations, which is beneficial when updating metadata or adding new data points.
- **Rapid Data Access** ⚡: MongoDB's indexing mechanisms enable fast query processing, which is crucial for features like real-time user reviews, movie metadata retrieval, and recommendation engines.

### Disadvantages ❌:
- **Transactional Reliability** 🪛: MongoDB can be less reliable for ensuring atomic transactions compared to traditional relational databases, which might be critical for applications requiring consistent data states, such as real-time booking systems.
- **Query Complexity** 🔍:  Implementing and optimizing complex queries, especially those requiring multiple joins, can be more challenging in MongoDB compared to SQL databases, potentially complicating detailed analytics.
- **Resource Consumption** 💾: MongoDB may require more system resources to maintain high performance, especially with large datasets, potentially necessitating more robust hardware infrastructure.
## Custom Dataset Description <a name = "custom-dataset-description"></a>📊
### Users:

**Fields**: _id, name, email, password.

**Description**: Contains information about users, including their names, email addresses, and encrypted passwords.

### Comments:

**Fields**: _id, name, email, movie_id, text, date, user_id.

**Description**: Consists of user comments on various movies. Each comment links to a movie via movie_id and includes the comment text, the date it was made, and the ID of the commenting user.

### Movies:

**Fields**: _id, title, plot, genres, runtime, cast, fullplot, languages, directors, rated, awards, year, imdb, countries, theater_ids.

**Description**: Provides detailed metadata about movies, including their titles, plots, genres, runtimes, and cast lists. It also includes additional information such as languages, directors, awards, IMDb ratings, and associated theater IDs.

### Theaters
**Fields**: _id, name, address, city, state, zipcode, phone, location.

**Description**: This dataset contains information about various theaters, including their names, locations, and contact details. The fields cover essential metadata such as the theater's address, city, state, and phone number, as well as geolocation data under the location field. This information is useful for mapping movie screenings to specific venues and for geo-based searches and analytics.

### Embedded Movies

**Fields**: _id, title, plot, genres, runtime, cast, fullplot, languages, directors, rated, awards, year, imdb, countries, theater_ids, comments.

**Description**: This dataset is similar to the Movies dataset but also includes embedded comments directly within the movie documents. This means that each movie record not only includes comprehensive metadata like title, plot, genres, and cast but also contains a nested array of comments related to the movie. This structure facilitates more efficient retrieval and display of movie information along with user-generated content, making it ideal for applications that require a seamless integration of reviews and movie details.

## Conclusion <a name = "conclusion"></a>🛡️
Schema flexibility, sharding strategy, and potential security measures make MongoDB a winning data-intensive application choice—just like with the database for information about the movies. With choosing MongoDB also comes the consideration of increased complexity due to sharding and the scale of your application.
## Sources <a name = "sources"></a>
- [MongoDB Cluster Docker Compose](https://github.com/minhhungit/mongodb-cluster-docker-compose)
- [MongoDB Sample Data](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/)
