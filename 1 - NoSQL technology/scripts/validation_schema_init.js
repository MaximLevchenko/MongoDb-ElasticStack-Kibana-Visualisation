var newDatabaseName = "moviesDb";
var myDb = db.getSiblingDB(newDatabaseName);
sh.enableSharding('moviesDb');

myDb.createCollection("comments", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "required": ["name", "email", "movie_id", "text", "date"],
      "properties": {
        "name": {
          "bsonType": "string",
          "description": "The name of the user."
        },
        "email": {
          "bsonType": "string",
          "description": "The email address of the user."
        },
        "movie_id": {
          "bsonType": "objectId",
          "description": "The ID of the associated movie."
        },
        "text": {
          "bsonType": "string",
          "description": "The user's text."
        },
        "date": {
          "bsonType": "date",
          "description": "The date when the user's entry was created."
        },
        "user_id":{
          "bsonType": "objectId",
          "description": "Id of the user who left the comment"
        }
      }
    }
  }
})

myDb.createCollection("embedded_movies", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "required": ["_id"],
      "properties": {
        "_id": {
          "bsonType": "objectId",
          "description": "The unique identifier for the document."
        },
        "plot": {
          "bsonType": "string",
          "description": "The plot summary of the movie."
        },
        "genres": {
          "bsonType": "array",
          "description": "An array of genres associated with the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "runtime": {
          "bsonType": "int",
          "description": "The duration of the movie in minutes."
        },
        "cast": {
          "bsonType": "array",
          "description": "An array of cast members in the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "title": {
          "bsonType": "string",
          "description": "The title of the movie."
        },
        "languages": {
          "bsonType": "array",
          "description": "An array of languages in which the movie is available.",
          "items": {
            "bsonType": "string"
          }
        },
        "directors": {
          "bsonType": "array",
          "description": "An array of directors of the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "writers": {
          "bsonType": "array",
          "description": "An array of writers involved in the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "awards": {
          "bsonType": "object",
          "description": "Information about awards won and nominations.",
          "properties": {
            "wins": {
              "bsonType": "int",
              "description": "Number of awards won."
            },
            "nominations": {
              "bsonType": "int",
              "description": "Number of award nominations."
            },
            "text": {
              "bsonType": "string",
              "description": "Textual information about awards."
            }
          }
        },
        "year": {
          "bsonType": "int",
          "description": "The year the movie was released."
        },
        "imdb": {
          "bsonType": "object",
          "description": "IMDb information about the movie.",
          "properties": {
            "rating": {
              "bsonType": ["double", "string"],
              "description": "IMDb rating of the movie."
            },
            "votes": {
              "bsonType": ["int", "string"],
              "description": "Number of IMDb votes."
            },
            "id": {
              "bsonType": "int",
              "description": "IMDb ID of the movie."
            }
          }
        },
        "countries": {
          "bsonType": "array",
          "description": "An array of countries associated with the movie.",
          "items": {
            "bsonType": "string"
          }
        },
      }
    }
  },
  validationLevel: "moderate",
}
)

myDb.createCollection("movies", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "required": ["_id"],
      "properties": {
        "_id": {
          "bsonType": "objectId",
          "description": "The unique identifier for the document."
        },
        "plot": {
          "bsonType": "string",
          "description": "The plot summary of the movie."
        },
        "genres": {
          "bsonType": "array",
          "description": "An array of genres associated with the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "runtime": {
          "bsonType": "int",
          "description": "The duration of the movie in minutes."
        },
        "cast": {
          "bsonType": "array",
          "description": "An array of cast members in the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "title": {
          "bsonType": "string",
          "description": "The title of the movie."
        },
        "fullplot": {
          "bsonType": "string",
          "description": "The full plot description of the movie."
        },
        "languages": {
          "bsonType": "array",
          "description": "An array of languages in which the movie is available.",
          "items": {
            "bsonType": "string"
          }
        },
        "directors": {
          "bsonType": "array",
          "description": "An array of directors of the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "rated": {
          "bsonType": "string",
          "description": "The rating of the movie."
        },
        "awards": {
          "bsonType": "object",
          "description": "Information about awards won and nominations.",
          "properties": {
            "wins": {
              "bsonType": "int",
              "description": "Number of awards won."
            },
            "nominations": {
              "bsonType": "int",
              "description": "Number of award nominations."
            },
            "text": {
              "bsonType": "string",
              "description": "Textual information about awards."
            }
          }
        },
        "year": {
          "bsonType": "int",
          "description": "The year the movie was released."
        },
        "imdb": {
          "bsonType": "object",
          "description": "IMDb information about the movie.",
          "properties": {
            "rating": {
              "bsonType": ["double", "string"],
              "description": "IMDb rating of the movie."
            },
            "votes": {
              "bsonType": ["int", "string"],
              "description": "Number of IMDb votes."
            },
            "id": {
              "bsonType": "int",
              "description": "IMDb ID of the movie."
            }
          }
        },
        "countries": {
          "bsonType": "array",
          "description": "An array of countries associated with the movie.",
          "items": {
            "bsonType": "string"
          }
        },
        "theater_ids": {
          "bsonType": "array",
          "description": "An array of theaters where this movies can be seen.",
          "items": {
            "bsonType": "objectId"
          }
        }
      }
    }
  },
  validationLevel: "moderate"
})

myDb.createCollection("users", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "required": ["_id", "name", "email", "password"],
      "properties": {
        "_id": {
          "bsonType": "objectId",
          "description": "The unique identifier for the document."
        },
        "name": {
          "bsonType": "string",
          "description": "The name of the user."
        },
        "email": {
          "bsonType": "string",
          "description": "The email address of the user."
        },
        "password": {
          "bsonType": "string",
          "description": "The hashed password of the user."
        }
      }
    }
  }
})



myDb.createCollection("theaters", {
  validator: {
    $jsonSchema: {
      "bsonType": "object",
      "required": ["_id", "theaterId", "location"],
      "properties": {
        "_id": {
          "bsonType": "objectId",
          "description": "The unique identifier for the document."
        },
        "theaterId": {
          "bsonType": "int",
          "description": "The ID of the theater."
        },
        "location": {
          "bsonType": "object",
          "required": ["address", "geo"],
          "properties": {
            "address": {
              "bsonType": "object",
              "required": ["street1", "city", "state", "zipcode"],
              "properties": {
                "street1": {
                  "bsonType": "string",
                  "description": "The street address of the theater."
                },
                "city": {
                  "bsonType": "string",
                  "description": "The city where the theater is located."
                },
                "state": {
                  "bsonType": "string",
                  "description": "The state where the theater is located."
                },
                "zipcode": {
                  "bsonType": "string",
                  "description": "The ZIP code of the theater's location."
                }
              }
            },
            "geo": {
              "bsonType": "object",
              "required": ["type", "coordinates"],
              "properties": {
                "type": {
                  "enum": ["Point"],
                  "description": "The type of the geographical point."
                },
                "coordinates": {
                  "bsonType": "array",
                  "items": {
                    "bsonType": "double"
                  },
                  "description": "The coordinates [longitude, latitude] of the theater's location."
                }
              }
            }
          }
        }
      }
    }
  }
})

sh.shardCollection("moviesDb.movies", { "_id": 1, "year": 1 });
sh.shardCollection("moviesDb.embedded_movies", { "_id": 1, "year": 1 });
sh.shardCollection("moviesDb.comments", { "movie_id": 1, "date": 1 });  
sh.shardCollection("moviesDb.users", { "_id": 1});  
sh.shardCollection("moviesDb.theaters", { "theaterId": 1});
sh.status();  







