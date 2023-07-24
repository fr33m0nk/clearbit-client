import * as Schema from '@effect/schema/Schema'
import { ParseError } from '@effect/schema/ParseResult'
import { Either } from 'effect/Either'

export const personSchema = Schema.struct({
    id: Schema.UUID,
    name: Schema.struct({
      fullName: Schema.nullable(Schema.string),
      givenName: Schema.nullable(Schema.string),
      familyName: Schema.nullable(Schema.string),
    }),
    email: Schema.string,
    location: Schema.nullable(Schema.string),
    timeZone: Schema.nullable(Schema.string),
    utcOffset: Schema.nullable(Schema.number),
    geo: Schema.struct({
      city: Schema.nullable(Schema.string),
      state: Schema.nullable(Schema.string),
      stateCode: Schema.nullable(Schema.string),
      country: Schema.nullable(Schema.string),
      countryCode: Schema.nullable(Schema.string),
      lat: Schema.nullable(Schema.number),
      lng: Schema.nullable(Schema.number),
    }),
    bio: Schema.nullable(Schema.string),
    site: Schema.nullable(Schema.string),
    avatar: Schema.nullable(Schema.string),
    employment: Schema.struct({
      domain: Schema.nullable(Schema.string),
      name: Schema.nullable(Schema.string),
      title: Schema.nullable(Schema.string),
      role: Schema.nullable(Schema.string),
      subRole: Schema.nullable(Schema.string),
      seniority: Schema.nullable(Schema.string),
    }),
    facebook: Schema.struct({
      handle: Schema.nullable(Schema.string),
    }),
    github: Schema.struct({
      handle: Schema.nullable(Schema.string),
      id: Schema.nullable(Schema.string),
      avatar: Schema.nullable(Schema.string),
      company: Schema.nullable(Schema.string),
      blog: Schema.nullable(Schema.string),
      followers: Schema.nullable(Schema.number),
      following: Schema.nullable(Schema.number),
    }),
    linkedin: Schema.struct({
      handle: Schema.nullable(Schema.string),
    }),
    googleplus: Schema.struct({
      handle: Schema.nullable(Schema.string),
    }),
    gravatar: Schema.struct({
      handle: Schema.nullable(Schema.string),
      urls: Schema.array(Schema.string)
    }),
    fuzzy: Schema.boolean,
    emailProvider: Schema.boolean,
    indexedAt: Schema.dateFromString(Schema.string),
    phone: Schema.nullable(Schema.string),
    inactiveAt: Schema.nullable(Schema.dateFromString(Schema.string))
  })
  
  export type Person = Schema.To<typeof personSchema>

  type PersonParser = (rawJson:any) => Either<ParseError, Person>
  export const personParser: PersonParser = Schema.parseEither(personSchema)