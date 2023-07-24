import * as Schema from '@effect/schema/Schema'
import { ParseError } from '@effect/schema/ParseResult'
import { Either } from 'effect/Either'

export const companySchema = Schema.struct({
    id: Schema.UUID,
    name: Schema.string,
    legalName: Schema.nullable(Schema.string),
    domain: Schema.string,
    domainAliases: Schema.array(Schema.string),
    site: Schema.struct({
      phoneNumbers: Schema.array(Schema.string),
      emailAddresses: Schema.array(Schema.string)
    }),
    category: Schema.struct({
      sector: Schema.string,
      industryGroup: Schema.nullable(Schema.string),
      industry: Schema.nullable(Schema.string),
      subIndustry: Schema.nullable(Schema.string),
      gicsCode: Schema.nullable(Schema.string),
      sicCode: Schema.nullable(Schema.string),
      sic4Codes: Schema.array(Schema.string),
      naicsCode: Schema.nullable(Schema.string),
      naics6Codes: Schema.array(Schema.string),
      naics6Codes2022: Schema.optional(Schema.array(Schema.string)),
    }),
    tags: Schema.array(Schema.string),
    description: Schema.nullable(Schema.string),
    foundedYear: Schema.nullable(Schema.number),
    location: Schema.nullable(Schema.string),
    timeZone: Schema.nullable(Schema.string),
    utcOffset: Schema.nullable(Schema.number),
    geo: Schema.struct({
      streetNumber: Schema.nullable(Schema.string),
      streetName: Schema.nullable(Schema.string),
      subPremise: Schema.nullable(Schema.string),
      streetAddress: Schema.nullable(Schema.string),
      city: Schema.nullable(Schema.string),
      postalCode: Schema.nullable(Schema.string),
      state: Schema.nullable(Schema.string),
      stateCode: Schema.nullable(Schema.string),
      country: Schema.nullable(Schema.string),
      countryCode: Schema.nullable(Schema.string),
      lat: Schema.optional(Schema.number),
      lng: Schema.optional(Schema.number),
    }),
    logo: Schema.nullable(Schema.string),
    facebook: Schema.struct({
      handle: Schema.nullable(Schema.string),
      likes: Schema.nullable(Schema.number),
    }),
    linkedin: Schema.struct({
      handle: Schema.nullable(Schema.string),
    }),
    twitter: Schema.struct({
      handle: Schema.nullable(Schema.string),
      id: Schema.nullable(Schema.string),
      bio: Schema.nullable(Schema.string),
      followers: Schema.nullable(Schema.number),
      following: Schema.nullable(Schema.number),
      location: Schema.nullable(Schema.string),
      site: Schema.nullable(Schema.string),
      avatar: Schema.nullable(Schema.string),
    }),
    crunchbase: Schema.struct({
      handle: Schema.nullable(Schema.string),
    }),
    emailProvider: Schema.boolean,
    type: Schema.nullable(Schema.string),
    ticker: Schema.nullable(Schema.string),
    identifiers: Schema.struct({
      usEIN: Schema.nullable(Schema.string),
    }),
    phone: Schema.nullable(Schema.string),
    metrics: Schema.struct({
      alexaUsRank: Schema.nullable(Schema.number),
      alexaGlobalRank: Schema.nullable(Schema.number),
      trafficRank: Schema.nullable(Schema.number),
      employees: Schema.nullable(Schema.number),
      employeesRange: Schema.nullable(Schema.string),
      marketCap: Schema.nullable(Schema.number),
      raised: Schema.nullable(Schema.number),
      annualRevenue: Schema.nullable(Schema.number),
      estimatedAnnualRevenue: Schema.nullable(Schema.string),
      fiscalYearEnd: Schema.nullable(Schema.number),
    }),
    indexedAt: Schema.dateFromString(Schema.string),
    tech: Schema.array(Schema.string),
    techCategories: Schema.array(Schema.string),
    parent: Schema.struct({
      domain: Schema.nullable(Schema.string),
    }),
    ultimateParent: Schema.struct({
      domain: Schema.nullable(Schema.string),
    })
  })
  
  export type Company = Schema.To<typeof companySchema>

  type CompanyParser = (rawJson: any) => Either<ParseError, Company>
  export const companyParser: CompanyParser = Schema.parseEither(companySchema)