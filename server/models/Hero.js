const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedHeroes` array in User.js
const heroSchema = new Schema({
  code: Number,
  status: String,
  copyright: String,
  attributionText: String,
  attributionHTML: String,
  data: {
    offset: Number,
    limit: Number,
    total: Number,
    count: Number,
    results: [
      {
        id: Number,
        name: String,
        description: String,
        modified: Date,
        resourceURI: String,
        urls: [
          {
            type: String,
            url: String
          }
        ],
        thumbnail: {
          path: String,
          extension: String
        },
        comics: {
          available: Number,
          returned: Number,
          collectionURI: String,
          items: [
            {
              resourceURI: String,
              name: String
            }
          ]
        },
        stories: {
          available: Number,
          returned: Number,
          collectionURI: String,
          items: [
            {
              resourceURI: String,
              name: String,
              type: String
            }
          ]
        },
        events: {
          available: Number,
          returned: Number,
          collectionURI: String,
          items: [
            {
              resourceURI: String,
              name: String
            }
          ]
        },
        series: {
          available: Number,
          returned: Number,
          collectionURI: String,
          items: [
            {
              resourceURI: String,
              name: String
            }
          ]
        }
      }
    ]
  },
  etag: String
});

module.exports = heroSchema;


