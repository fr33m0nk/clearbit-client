import * as Schema from '@effect/schema/Schema'
import { personSchema } from './person'
import { companySchema } from './company'
import { ParseError } from '@effect/schema/ParseResult'
import { Either } from 'effect/Either'

const combinedSchema = Schema.struct({
    person: Schema.nullable(personSchema),
    company: Schema.nullable(companySchema)
  })
  
  export type PersonAndCompany = Schema.To<typeof combinedSchema>

  type CombinedResponseParser = (rawJson: any) => Either<ParseError, PersonAndCompany>
  export const combinedResponseParser: CombinedResponseParser = Schema.parseEither(combinedSchema)