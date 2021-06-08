import { datatype } from 'faker'
import { factory, primaryKey } from '@mswjs/data'
import { printSchema } from 'graphql'

const db = factory({
  user: {
    id: primaryKey(datatype.uuid),
    firstName: String,
    age: Number,
  },
})

test('generates a graphql schema', () => {
  const schema = db.user.toSchema('graphql')
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    "type Query {
      user(where: UserQueryInput): User
      users(take: Int, skip: Int, cursor: ID, where: UserQueryInput): [User]
    }

    type User {
      id: ID
      firstName: String
      age: Int
    }

    input UserQueryInput {
      id: IdQueryType
      firstName: StringQueryType
      age: IntQueryType
    }

    input IdQueryType {
      equals: ID
      notEquals: ID
      contains: ID
      notContains: ID
      in: ID
      notIn: ID
    }

    input StringQueryType {
      equals: String
      notEquals: String
      contains: String
      notContains: String
      in: String
      notIn: String
    }

    input IntQueryType {
      equals: Int
      notEquals: Int
      between: Int
      notBetween: Int
      gt: Int
      gte: Int
      lt: Int
      lte: Int
    }

    type Mutation {
      createUser(data: UserInput): User
      updateUser(where: UserQueryInput, data: UserInput): User
      updateUsers(where: UserQueryInput, data: UserInput): [User]
      deleteUser(where: UserQueryInput): User
      deleteUsers(where: UserQueryInput): [User]
    }

    input UserInput {
      id: ID
      firstName: String
      age: Int
    }
    "
  `)
})