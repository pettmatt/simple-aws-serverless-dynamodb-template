const dynamoDbClient = require('../../dynamodb')

const USERS_TABLE = process.env.USERS_TABLE

const getSingle = async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }

  try {
    const { Item } = await dynamoDbClient.get(params).promise()
    if (Item) {
      const { userId, name } = Item
      res.json({ userId, name })
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Could not retreive user' })
  }
}

const postSingle = async (req, res) => {
  const { userId, name } = req.body
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' })
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' })
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  }

  try {
    await dynamoDbClient.put(params).promise()
    res.json({ userId, name })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Could not create user' })
  }
}

module.exports = {
  // getAll,
  getSingle,
  postSingle,
  // postSingleInCode,
  // updateSingle,
  // deleteSingle
}