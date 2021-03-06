require('dotenv').config()

var assert = require('assert')

var database = require('./database.js')

const ARCHIVE_FILES_SCHEMA = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
          "fileName",
          "fileKey",
          "fileSize",
          "dateUploaded",
          "mimeType"
      ],
      properties: {
        fileName: {
          bsonType: "string",
          description: "Original name of the digitized archive file"
        },
        fileKey: {
          bsonType: "string",
          description: "The S3 key of the digitized archive file"
        },
        fileSize: {
          bsonType: "int",
          description: "The size of the digitized archive file in bytes"
        },
        dateUploaded: {
          bsonType: "date",
          description: "The date the file was added to the site"
        },
        mimeType: {
          bsonType: "string",
          description: "The file's type"
        },
        parts: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: [
              "artists",
              "date",
              "program"
            ],
            properties: {
              artists: {
                bsonType: "array",
                items: {
                  bsonType: "string"
                },
                description: "List of artists associated with the file",
                uniqueItems: true,
                minItems: 1
              },
              date: {
                bsonType: "date",
                description: "Dates associated with this part of the file",
              },
              program: {
                bsonType: "string",
                description: "The name of the program this part of the file was originally recorded for"
              },
              timeStart: {
                bsonType: "int",
                description: "Number of seconds into the media file that this part begins at"
              },
              length: {
                bsonType: "int",
                description: "Number of seconds long that this part is"
              }
            }
          },
          uniqueItems: true,
          minItems: 1
        },
        originalFormat: {
          enum: [
            "CD",
            "VHS",
            "Betamax",
            "DAT",
            "Cassette",
            "5_Reel",
            "7_Reel",
            "10_Reel",
            "Digital"
          ],
          description: "The type of medium the file was originally recorded to"
        },
        notes: {
          bsonType: "string",
          description: "Any additional notes regarding the file's condition or contents"
        }
      }
    }
  }
}

const USERS_SCHEMA = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "username",
        "passwordHash"
      ],
      properties: {
        username: {
          bsonType: "string",
          description: "The username that the user uses to log in with"
        },
        passwordHash: {
          bsonType: "string",
          description: "The bcrypt-ed hash of the user's password"
        }
      }
    }
  }
}

database.getClient().connect((err, client) => {
  assert.equal(null, err)
  console.log('Successfully connected to MongoDB')

  var db = client.db()
  console.log('Creating archiveFiles collection')

  db.createCollection('archiveFiles', ARCHIVE_FILES_SCHEMA, (err) => {
    assert.equal(null, err)
    console.log('Created archiveFiles collection')
  })

  db.createCollection('users', USERS_SCHEMA, (err) => {
    assert.equal(null, err)
    console.log('Created users collection')
    client.close()
  })
})
