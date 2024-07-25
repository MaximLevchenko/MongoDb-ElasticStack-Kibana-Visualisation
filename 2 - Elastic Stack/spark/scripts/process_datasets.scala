import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.FloatType
// println("Hello, Spark!")

// Set up SparkSession
val spark = SparkSession.builder.config("spark.sql.legacy.timeParserPolicy", "LEGACY").getOrCreate()

val games = spark.read.format("csv").option("sep", ",").option("inferSchema", "true").option("header", "true").load("/opt/bitnami/logstash/data/games.csv")
val games_without_null = games.na.drop()
val processed_games = games_without_null

processed_games.show(50)
val games_details = spark.read.format("csv").option("sep", ",").option("inferSchema", "true").option("header", "true").load("/opt/bitnami/logstash/data/games_details.csv")
games_details.show(10)
val processed_games_details = games_details

val teams = spark.read.format("csv").option("sep", ",").option("inferSchema", "true").option("header", "true").load("/opt/bitnami/logstash/data/teams.csv")
val teams_without_null = teams.na.drop()
val processed_teams = teams_without_null
processed_teams.show(50)


// Join for home team
val joinedHomeTeam = processed_games_details.join(processed_games.withColumnRenamed("HOME_TEAM_ID", "TEAM_ID"), Seq("GAME_ID", "TEAM_ID"), "inner")
joinedHomeTeam.show(50)

// Join for visitor team
val joinedVisitorTeam = processed_games_details.join(processed_games.withColumnRenamed("VISITOR_TEAM_ID", "TEAM_ID"), Seq("GAME_ID", "TEAM_ID"), "inner")
joinedVisitorTeam.show(50)

// Union the results
val joinedGames = joinedHomeTeam.union(joinedVisitorTeam)
joinedGames.show(50)

// Step 2: Join the result with teams
val finalResult = joinedGames.join(processed_teams.withColumnRenamed("TEAM_ID", "TEAM_ID"), Seq("TEAM_ID"), "inner")

val resultDFRenamed = finalResult.withColumnRenamed("PLAYER_ID", "PLAYER_ID_TEAM_HOME")

// Step 3: Specify columns for the resulting DataFrame
val resultColumns = Seq(
  "GAME_ID","TEAM_ID", "GAME_DATE_EST",
  "TEAM_ID_home", "PTS_home", "FG_PCT_home", "FT_PCT_home", "FG3_PCT_home", "AST_home", "REB_home",
  "TEAM_ID_away", "PTS_away", "FG_PCT_away", "FT_PCT_away", "FG3_PCT_away", "AST_away", "REB_away",
  "HOME_TEAM_WINS", "ABBREVIATION", "PLAYER_ID_TEAM_HOME", "PLAYER_NAME", "MIN", "FG_PCT",
  "FG3_PCT", "FT_PCT", "OREB", "REB", "AST", "STL", "BLK","PTS", "PLUS_MINUS"
)
// Select only the specified columns
val resultDF = resultDFRenamed.select(resultColumns.map(col): _*)
resultDF.show(50)
var result_without_nullDF = resultDF.na.drop()
result_without_nullDF.show(50)
// Assuming you have a DataFrame named result_without_nullDF
val roundedDF = result_without_nullDF.select(result_without_nullDF.columns.map {
  case colName if result_without_nullDF.schema(colName).dataType == FloatType =>
    format_number(col(colName), 4).alias(colName)
  case colName =>
    col(colName)
}: _*)
roundedDF.show(50)

// resultDF.write.option("header", "true").csv("/opt/bitnami/logstash/data/processed.csv")
roundedDF.coalesce(1).write.mode("overwrite").format("csv").option("sep", ",").option("header", "true").save("/opt/bitnami/logstash/data/processed/")

// Stop the Spark session
spark.stop()
