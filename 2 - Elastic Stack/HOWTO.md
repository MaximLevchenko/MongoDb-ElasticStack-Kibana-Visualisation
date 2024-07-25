# Instructions for Setting Up the Project

To begin, navigate to the main directory and execute the initialization script:
```
./init_script.sh
```
or, if you need superuser permissions:

```
sudo ./init_script.sh
```
This script will import three datasets into the Spark Docker container, process and clean the data, merge them into a single dataset, and store the resulting file in **logstash/data/games_processed_details.csv**.

## Starting the Services

Next, start the services using Docker Compose:
```
docker-compose up -d
```
or, with superuser permissions:
```
sudo docker-compose up -d
```

This command will set up the necessary architecture, including Logstash, Elasticsearch, and Kibana.
## Kibana visualizations

To view the visualizations:

1. Go to ***http://localhost:5601/***
2. Navigate to the **Dashboard in the Analytics** section on the sidebar.
3. Click on the **Visualisations NBA** to see the visual data.

#### IIf the visualizations are not present, follow these steps to import them:
1. In the navigation pane, select **Stack Management**.
2. Choose **Saved Objects**.
3. On the Saved Objects page, select **Import**.
4. Locate and select the file **logstash/data/import_dashboard.ndjson**
5. Click on **Import** to add the visualizations.



## 🔎 Additional Commands 

To monitor the logs of various services, use the following commands:
```bash
sudo docker logs -f logstash         # View Logstash logs
sudo docker logs -f elasticsearch    # View Elasticsearch logs
sudo docker logs -f kibana           # View Kibana logs
```

### ✦ Clean up docker-compose 
To clean up the Docker environment and remove all containers, volumes, images, and orphaned data, run:
```bash
docker-compose down -v --rmi all --remove-orphans
