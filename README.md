# [Clearbit Client (Typescript/Javascript)](https://github.com/fr33m0nk/ts-clearbit-client)

- This client library supports the latest `v2` API for Clearbit
- This client uses [Effect](https://www.effect.website/) library. Effect is definitely worth looking into.
- However, it exposes the Promise based functions for usage
- If there is a demand, I will expose Effect based functions in later releases.

## Usage

### [Combined query (Person + Company) API](https://dashboard.clearbit.com/docs#enrichment-api-combined-api)

```typescript
import {combinedQuery, CombinedQueryParams, PersonAndCompany, APIError} from "./index";

const queryParams: CombinedQueryParams = {email: "some@one.com"}

combinedQuery("API_KEY")(queryParams).then((r: PersonAndCompany) => {
  console.log("\n Yay Combined Search\n")
  console.log(r)
  console.log("\n ------- \n")[company.ts](src%2Fschema%2Fcompany.ts)
}).catch((error: APIError) => {
  console.log("\n Nay Combined Search\n")
  console.log(error)
})
```

### [Person query API](https://dashboard.[company.ts](src%2Fschema%2Fcompany.ts)clearbit.com/docs#enrichment-api-person-api)

```typescript
import {personQuery, PersonQueryParams, Person, APIError} from "./index";

const queryParams: PersonQueryParams = {email: "some@one.com"}

personQuery("API_KEY")(queryParams).then((r: Person) => {
  console.log("\n Yay Person Search \n")
  console.log(r)
  console.log("\n ------- \n")
}).catch((error: APIError) => {
  console.log("\n Nay Person Search \n")
  console.log(error)
})
```

### [Company query API](https://dashboard.clearbit.com/docs#enrichment-api-company-api)

```typescript
import {companyQuery, CompanyQueryParams, Company, APIError} from "./index";

const companyQueryParams: CompanyQueryParams = {domain: "google.com"}

companyQuery("API_KEY")(companyQueryParams).then((r: Company) => {
  console.log("\n Yay Company Search \n")
  console.log(r)
  console.log("\n ------- \n")
}).catch((error: APIError) => {
  console.log("\n Nay Company Search \n")
  console.log(error)
})
```