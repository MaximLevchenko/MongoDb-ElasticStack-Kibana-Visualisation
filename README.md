# Project Overview

This project showcases the use of NoSQL technologies and usage of Elastic Stack for comprehensive data processing and visualization.

## Description

The project is divided into two main sections:

1. **NoSQL Technology**: Focuses on MongoDB, where sharding and replication are used to manage large datasets efficiently and ensure high availability.
2. **Elastic Stack**: Utilizes Apache Spark for data processing, with Logstash, Elasticsearch, and Kibana for indexing and visualization.

### 📝Additional information 

For detailed instructions, refer to the individual README.md files located in the respective directories. Additionally, please pay special attention to the `HOWTO.md` and `README.md` files located in the `results` folder within the Elastic Stack directory for crucial details on setting up and understanding the visualizations.
## Project Structure

The project is organized as follows:
```
/1 - NoSQL technologie
|  /data
|  /configdb
|  /db
|  |  - .gitkeep
|  |  - sample_mflix.comments.json
|  |  - sample_mflix.embedded_movies.json
|  |  - sample_mflix.movies.json
|  |  - sample_mflix.theaters.json
|  |  - sample_mflix.users.json
|  /scripts
|  |  - import_data.sh
|  |  - init-configserver.js
|  |  - init-router.js
|  |  - init-shard01.js
|  |  - init-shard02.js
|  |  - init-shard03.js
|  |  - validation_schema_init.js
|  - docker-compose.yml
|  - HOWTO.md
|  - init_script.sh
|  - queries.txt
|  - README.md
/2 - Elastic Stack   
|  /elasticsearch
|  |  /config
|  |    - elasticsearch.yml
|  /kibana
|  |  /config
|  |  | - kibana.yml
|  /logstash
|  |  /config
|  |  |  - logstash.yml
|  |  |  - pipelines.yml
|  |  /data
|  |  /pipeline
|  |  /template
|  /results
|  |  /images
|  |  - .gitkeep
|  |  - HOWTO.md
|  |  - README.md
|  /spark
|  - .gitignore
|  - docker-compose.yml
|  - HOWTO.md
|  - init_script.sh
|  - queries.txt
|  - README.md
- README.md
```
