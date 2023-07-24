import { stringify } from '@billjs/query-string'
import { pipe, Effect } from 'effect'
import { fetchApi, isResponseOK, FetchError, parseJson, APIError } from './safe_fetch'
import { personParser, Person } from './schema/person'
import { companyParser, Company } from './schema/company'
import { combinedResponseParser, PersonAndCompany } from './schema/combined'

const combinedQueryURL = "https://person-stream.clearbit.com/v2/combined/find?"
const personQueryURL = "https://person-stream.clearbit.com/v2/people/find?"
const companyQueryURL = "https://company-stream.clearbit.com/v2/companies/find?"

export type CompanyQueryParams = Readonly<{
    domain: string,
    webhook_url?: string,
    company_name?: string,
    linkedin?: string,
    twitter?: string,
    facebook?: string,
    webhook_id?: string,
}>

export type PersonQueryParams = Readonly<{
    email: string,
    webhook_url?: string,
    given_name?: string,
    family_name?: string,
    ip_address?: string,
    location?: string,
    company?: string,
    company_domain?: string,
    linkedin?: string,
    twitter?: string,
    facebook?: string,
    webhook_id?: string,
    subscribe?: boolean,
    suppression?: string,
}>

export type CombinedQueryParams = PersonQueryParams

type QueryParams = PersonQueryParams | CompanyQueryParams | CombinedQueryParams

type ToURLWithQueryString = (url: string, queryParams: QueryParams) => URL
const toURLWithQueryString: ToURLWithQueryString = (url, queryParams) => {
    return new URL(url.concat(stringify(queryParams)))
}

type ToOAuthHeader = (authToken: string) => { readonly Authorization: string}
const toOAuthHeader: ToOAuthHeader = authToken => ({
    Authorization: `Bearer ${authToken}`
})

type FetchClearbitApi = (authToken:string, queryURL: string, queryParams: QueryParams) => Effect.Effect<never, FetchError, Response>
const fetchClearbitApi: FetchClearbitApi = (authToken, queryURL, queryParams) => fetchApi(
    toURLWithQueryString(queryURL, queryParams),{
        headers: toOAuthHeader(authToken)
    }
)

type CombinedApi = (authToken: string) => (queryParams: CombinedQueryParams) => Effect.Effect<never, APIError, PersonAndCompany>
const combinedAPI: CombinedApi = authToken => queryParams => pipe(
    fetchClearbitApi(authToken, combinedQueryURL, queryParams),
    Effect.flatMap(isResponseOK),
    Effect.flatMap(parseJson(combinedResponseParser))
)

type PersonApi = (authToken: string) => (queryParams: PersonQueryParams) => Effect.Effect<never, APIError, Person>
const personApi: PersonApi = authToken => queryParams => pipe(
    fetchClearbitApi(authToken, personQueryURL, queryParams),
    Effect.flatMap(isResponseOK),
    Effect.flatMap(parseJson(personParser))
)

type CompanyApi = (authToken: string) => (queryParams: CompanyQueryParams) => Effect.Effect<never, APIError, Company>
const companyApi: CompanyApi = authToken => queryParams => pipe(
    fetchClearbitApi(authToken, companyQueryURL, queryParams),
    Effect.flatMap(isResponseOK),
    Effect.flatMap(parseJson(companyParser))
)

export type CombinedQuery = (authToken: string) => (queryParams: CombinedQueryParams) => Promise<PersonAndCompany>
export const combinedQuery: CombinedQuery = authToken => queryParams => Effect.runPromise(combinedAPI(authToken)(queryParams))

export type PersonQuery = (authToken: string) => (queryParams: PersonQueryParams) => Promise<Person>
export const personQuery: PersonQuery = authToken => queryParams => Effect.runPromise(personApi(authToken)(queryParams))

export type CompanyQuery = (authToken: string) => (queryParams: CompanyQueryParams) => Promise<Company>
export const companyQuery: CompanyQuery = authToken => queryParams => Effect.runPromise(companyApi(authToken)(queryParams))

