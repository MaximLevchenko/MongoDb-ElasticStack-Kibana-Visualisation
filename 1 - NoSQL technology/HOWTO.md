# Instructions for Setting Up the Project
### Running Docker-Compose

To start all necessary containers, run the following command in the main repository:
```
docker-compose up -d
```

or, if superuser permissions are needed:

```
sudo docker-compose up -d
```
After all containers are set up, execute the initialization script:
```
./init_script.sh
```
or
```
sudo ./init_script.sh
```
## Cluster and Database Verification

### ✅ Verify the status of the sharded cluster 

To check the status of the sharded cluster, use:

```bash
sudo docker-compose exec router01 mongosh --port 27017
sh.status()
```


### ✅ Verify status of replica set for each shard
> You should see 1 PRIMARY, 2 SECONDARY

```bash
sudo docker exec -it shard-01-node-a bash -c "echo 'rs.status()' | mongosh --port 27017" 
sudo docker exec -it shard-02-node-a bash -c "echo 'rs.status()' | mongosh --port 27017" 
sudo docker exec -it shard-03-node-a bash -c "echo 'rs.status()' | mongosh --port 27017" 
```
### ✅ Check database status 
To check the overall status of the database:
```bash
docker-compose exec router01 mongosh --port 27017
use moviesDb
db.stats()
db.movies.getShardDistribution()
```

### ✅ Running Queries
First, access the MongoDB instance:
```bash
docker-compose exec router01 mongosh --port 27017
use moviesDb
```
Then, execute queries from the queries.txt file. For example:
```bash
db.comments.aggregate([
  // Perform a lookup to get movie details based on the movie_id field in comments
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movieDetails"
    }
  },
  {
    $unwind: "$movieDetails"
  },
  // Group the data by language and count the number of comments for each language
  {
    $group: {
      _id: "$movieDetails.languages",
      commentCount: { $sum: 1 }
    }
  },
  // Unwind the languages array to get individual language entries
  {
    $unwind: "$_id"
  },
  // Group by language and sum the comment count
  {
    $group: {
      _id: "$_id",
      commentCount: { $sum: "$commentCount" }
    }
  },
  // Sort the languages based on comment count in descending order
  {
    $sort: {
      commentCount: -1
    }
  },
  // Limit the result to the top 5 languages
  {
    $limit: 5
  }
]);
```

## 🔎 Additional Commands 
For more monitoring and administrative commands:

```bash
docker exec -it mongo-config-01 bash -c "echo 'rs.status()' | mongosh --port 27017"


docker exec -it shard-01-node-a bash -c "echo 'rs.help()' | mongosh --port 27017"
docker exec -it shard-01-node-a bash -c "echo 'rs.status()' | mongosh --port 27017" 
docker exec -it shard-01-node-a bash -c "echo 'rs.printReplicationInfo()' | mongosh --port 27017" 
docker exec -it shard-01-node-a bash -c "echo 'rs.printSlaveReplicationInfo()' | mongosh --port 27017"
```

### ✦ Clean up docker-compose 
To stop and remove the Docker containers, networks, volumes, and images, use:
```bash
docker-compose down -v --rmi all --remove-orphans
```