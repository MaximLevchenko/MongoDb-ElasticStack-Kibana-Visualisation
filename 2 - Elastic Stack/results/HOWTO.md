# Visualization Creation Guide

## Visualization 1: Average Points per Team

This visualization displays the average number of points scored by each team in every game.

- **Metrics:** 
  - Y-axis: Aggregation -> Average, Field -> PTS_HOME
- **Buckets:**
  - X-axis: Aggregation -> Terms, Field -> ABBREVIATION

## Visualization 2: Player Personal Stats

This visualization sorts players by their average points per game and displays additional stats including average assists, rebounds, blocks, steals, and plus-minus ratings.

- **Metrics:**
  - Y-axis: Aggregation -> Average, Fields -> PTS, AST, REB, STL, BLK
- **Buckets:**
  - Split Rows: Aggregation -> Terms, Field -> PLAYER_NAME

## Visualization 3: Total Points Distribution by Team

This visualization shows the total points scored by each team in the NBA, using the total points scored at home.

- **Metrics:**
  - Slice Size: Aggregation -> Sum, Field -> PTS_HOME
- **Buckets:**
  - Split Slices: Aggregation -> Terms, Field -> ABBREVIATION

## Visualization 4: Top Scoring Games by Player

This visualization sorts players by their highest points scored in a single game, along with their field-goal percentage. It also lists the next four highest-scoring games for each player, sorted by field-goal percentage in descending order.

- **Metrics:**
  - Aggregation -> Max, Field -> PTS
- **Buckets:**
  - Y-axis: Aggregation -> Terms, Field -> PLAYER_NAME
  - X-axis: Aggregation -> Terms, Field -> FG_PCT

## Visualization 5: Total Points by Los Angeles Lakers Players

This visualization displays the total points scored by each player on the Los Angeles Lakers.

- **Metrics:**
  - Aggregation -> Count
- **Buckets:**
  - Split Slices: Aggregation -> Terms, Field -> PLAYER_NAME

## Visualization 6: Giannis Antetokounmpo's Career Progression

This visualization shows the progression of total points, rebounds, assists, blocks, and steals accumulated by Giannis Antetokounmpo throughout his career, broken down by year.

- **Metrics:**
  - Y-axis: Cumulative Sum -> Aggregation -> Sum, Fields -> PTS, AST, REB, STL, BLK
- **Buckets:**
  - X-axis: Aggregation -> Date Histogram, Field -> GAME_DATE_EST, Interval -> Weekly

## Visualization 7: Team Contributions to Rebounds by Year

This visualization shows the contribution of each team to the total rebounds recorded each year.

- **Metrics:**
  - Y-axis: Aggregation -> Sum, Field -> REB_home
- **Buckets:**
  - X-axis: Aggregation -> Date Histogram, Field -> GAME_DATE_EST, Interval -> Yearly
  - Split Series: Sub Aggregation -> Terms, Field -> ABBREVIATION

## Visualization 8: All-Time Team Shooting Percentages

This visualization shows the average field goal percentage, free throw percentage, and three-point percentage for all teams across the league.

- **Metrics:**
  - Y-axis: Aggregation -> Average, Fields -> FG_PCT_home, FG3_PCT_home, FT_PCT_home
- **Buckets:**
  - X-axis: Aggregation -> Terms, Field -> ABBREVIATION
