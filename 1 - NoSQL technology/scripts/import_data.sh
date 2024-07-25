#!/bin/bash
import_data() {
    collection_to_import=$1
    file_to_import=$2

    if mongoimport --db moviesDb --collection "$collection_to_import" --type json --file "$file_to_import" --jsonArray; then
        echo "Successfully imported $collection_to_import"
    else
        echo "Error importing $collection_to_import"
        exit 1
    fi
}

import_data "comments" "data/sample_mflix.comments.json"
import_data "movies" "data/sample_mflix.movies.json"
import_data "embedded_movies" "data/sample_mflix.embedded_movies.json"
import_data "users" "data/sample_mflix.users.json"
import_data "theaters" "data/sample_mflix.theaters.json"
