# Elastic Stack

The data processing workflow utilizes Apache Spark to merge data from three separate datasets into a single CSV file. The processing pipeline is managed by Logstash, which is configured via the `logstash/config/logstash.yml` file. This configuration specifies the pipeline's input source, data transformations, and output destination. The merged and processed data is then indexed in Elasticsearch, with Kibana providing a user-friendly interface to visualize this data.

## NBA Games

### Dataset Description

#### logstash/data/games.csv 
Contains game-specific information including:
- Date of the game
- Unique game identifier
- Game status (e.g., "Final")
- Team IDs for home and visiting teams
- Season information
- Indicator of whether the home team won

Also includes performance metrics for both home and away teams such as:
- Points scored (PTS)
- Field goal percentage (FG_PCT)
- Free throw percentage (FT_PCT)
- Three-point percentage (FG3_PCT)
- Assists (AST)
- Rebounds (REB)

#### logstash/data/games_details.csv
Provides detailed metrics including:
- Unique game identifiers
- Team IDs, abbreviations, and locations
- Player-centric statistics such as player IDs, names, nicknames, starting positions, minutes played, and various game statistics (field goals, three-pointers, free throws, rebounds, assists, steals, blocks, turnovers, personal fouls, points scored, and point differentials)
- Additional comments or notes and timestamps for each record

#### logstash/data/teams.csv
Includes team-specific details such as:
- League ID, team ID
- Active years range (**MIN_YEAR**, **MAX_YEAR**)
- Team abbreviation and nickname
- Additional information about each team, including founding year, city, arena, arena capacity, ownership, general management, and head coach details

This dataset provides insights into the organizational structure and performance metrics of NBA teams.

### Data Sources
- [Kaggle: NBA Games Dataset](https://www.kaggle.com/datasets/nathanlauga/nba-games)
- [FIT CTU BIG Tutorial 07](https://courses.fit.cvut.cz/BI-BIG/tutorials/07/index.html)
- [FIT CTU BIG Tutorial 08](https://courses.fit.cvut.cz/BI-BIG/tutorials/08/index.html)
- [FIT CTU BIG Tutorial 09](https://courses.fit.cvut.cz/BI-BIG/tutorials/09/index.html)

### Data modifications performed

The data was processed using Scala scripts in Apache Spark. Key steps included:
1. **Removing all null values from `games.csv` and `teams.csv`**:
   ```scala
   val games_without_null = games.na.drop()
   val teams_without_null = teams.na.drop()
   ```
2. **Performing two inner joins**:
   1. Between games.csv and **games_details.csv** based on **TEAM_ID**
   2. Union of the **resulting joins**
3. **Final join with teams.csv to create the complete DataFrame**:
   ```scala
   val joinedHomeTeam = processed_games_details.join(processed_games.withColumnRenamed("HOME_TEAM_ID", "TEAM_ID"), Seq("GAME_ID", "TEAM_ID"), "inner")
   val joinedVisitorTeam = processed_games_details.join(processed_games.withColumnRenamed("VISITOR_TEAM_ID", "TEAM_ID"), Seq("GAME_ID", "TEAM_ID"), "inner")
   val joinedGames = joinedHomeTeam.union(joinedVisitorTeam)
   val finalResult = joinedGames.join(processed_teams.withColumnRenamed("TEAM_ID", "TEAM_ID"), Seq("TEAM_ID"), "inner")
    ```
4. **Selecting only the necessary columns and removing remaining null values**:
   ```scala
    val resultColumns = Seq(
      "GAME_ID","TEAM_ID", "GAME_DATE_EST",
      "TEAM_ID_home", "PTS_home", "FG_PCT_home", "FT_PCT_home", "FG3_PCT_home", "AST_home", "REB_home",
      "TEAM_ID_away", "PTS_away", "FG_PCT_away", "FT_PCT_away", "FG3_PCT_away", "AST_away", "REB_away",
      "HOME_TEAM_WINS", "ABBREVIATION", "PLAYER_ID_TEAM_HOME", "PLAYER_NAME", "MIN", "FG_PCT",
      "FG3_PCT", "FT_PCT", "OREB", "REB", "AST", "STL", "BLK","PTS", "PLUS_MINUS"
    )
    val resultDF = resultDFRenamed.select(resultColumns.map(col): _*)
    var result_without_nullDF = resultDF.na.drop()
    ```
5. **Writing the final dataset to a CSV file**:
   ```scala
   roundedDF.coalesce(1).write.mode("overwrite").format("csv").option("sep", ",").option("header", "true").save("/opt/bitnami/logstash/data/processed/")
    ```
**Final Dataset is saved to logstash/data/games_result_processed.csv**

### Data Format
#### Key Fields in the Result Dataset:
- **GAME_ID**: Unique identifier for each game. (Integer)
- **TEAM_ID**: Unique identifier for each team. (Integer) 
- **ABBREVIATION**: Team abbreviation. (Keyword)
- **GAME_DATE_EST**: Date of the game. (Date)
- **TEAM_ID_home/away**: Identifiers for home and away teams. (Integer)
- **PTS_home/away**: Points scored by home and away teams. (Float)
- **FG_PCT_home/away**: Field goal percentage for home and away teams. (Float)
- **FT_PCT_home/away**: Free throw percentage for home and away teams. (Float)
- **FG3_PCT_home/away**: Three-point percentage for home and away teams. (Float)
- **AST_home/away**: Assists for home and away teams. (Float)
- **REB_home/away**: Rebounds for home and away teams. (Float)
- **HOME_TEAM_WINS**: Boolean indicating if the home team won. (Boolean)

#### Player-Related Fields:

- **PLAYER_ID_TEAM_HOME**: Player identifier for the home team. (Integer)
- **PLAYER_NAME**: Player's name. (Keyword)
- **MIN**: Minutes played by the player. (Keyword)
- **PTS**: Points scored by the player. (Float)
- **FG_PCT**: Field goal percentage for the player. (Float)
- **FG3_PCT**: Three-point percentage for the player. (Float)
- **FT_PCT**: Free throw percentage for the player. (Float) 
- **OREB/REB/AST/STL/BLK**: Offensive rebounds, total rebounds, assists, steals, and blocks by the player. (Float)
- **PLUS_MINUS**: Point differential when the player is on the court. (Float)

## Conclusion

This data processing project involved cleaning and processing NBA games datasets using Apache Spark and Scala. By handling null values and performing inner joins, a comprehensive dataset was created, containing crucial information on game details, team specifics, and player-centric metrics. The final dataset was written to a CSV file, providing a valuable resource for further analysis and integration, with significant insights into NBA game statistics and player performance.
