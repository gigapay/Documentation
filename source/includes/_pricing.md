# Pricing

The Pricing endpoint allows you to calculate the price of payout you would like to make, and to retrieve the price
information about previously made payouts. The endpoint is designed to mirror the Payouts endpoint as closely as
possible, e.g. the same request can be used to retrieve the price information of a Payout you'd like to make and to
actually make it.

<aside class="warning">
<strong>Deprecated fields:</strong> The <code>amount</code>, <code>cost</code>, and <code>full_salary_specification</code> fields are deprecated and should not be used in new integrations. Use <code>invoiced_amount</code> instead. These fields are calculated and returned for backward compatibility only.
</aside>

### The Pricing breakdown

> An example Pricing breakdown for a Payout:

```json
{
  "amount": "1000.00",
  "cost": "1379.91",
  "currency": "SEK",
  "fee": "65.71",
  "health_insurance": null,
  "invoiced_amount": "1314.20",
  "payroll": "314.20",
  "pension": null,
  "tax": "300.00",
  "vat": "344.97"
}
```


| Attribute         | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| ~~amount~~        | **Deprecated.** Decimal formatted string of the gross salary amount. Use `invoiced_amount` instead.                         |
| invoiced_amount   | Decimal formatted string of the invoiced amount.                                                                         |
| ~~cost~~          | **Deprecated.** Decimal formatted string of the total salary cost. Use `invoiced_amount` instead.                           |
| currency          | ISO-4217 currency code.                                                                                              |
| fee               | Decimal formatted string of Gigapay's fee for this Payout.                                                           |
| health_insurance  | Decimal formatted string of the cost of mandated health insurance. Will be none if health insurance is not mandated. |
| payroll           | Decimal formatted string of the payroll taxes.  Will be none if payroll taxes are not mandated.                                                                     |
| pension           | Decimal formatted string of the cost of mandated pension. Will be none if pension is not mandated.                   |
| tax               | Decimal formatted string of the preliminary income taxes the will be reported and paid on behalf of the recipient.   |
| vat               | Decimal formatted string of the VAT for the Payout. 


The `invoiced_amount` is the recommended basis for calculating the Pricing breakdown. This is normally the net amount you agreed with the recipient (employee).

For backward compatibility, you can also provide the deprecated `amount` or `cost` fields, and the other values will be calculated.

**For new integrations:** Use `invoiced_amount` only.

**Legacy field definitions (for existing integrations):**
- ~~`amount`~~: net amount paid out plus obligations paid by the recipient.
- `invoiced_amount`: The invoiced amount (recommended).
- ~~`cost`~~: `invoiced_amount` plus Gigapay's fee.

Which of the attributes that are included and in what step varies between countries. Examples of what the pricing looks
like in each country are provided.


## List Pricing info

```python
import requests

response = requests.get(
    'https://api.gigapay.com/v2/pricing/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/pricing/
```

```javascript
fetch("https://api.gigapay.com/v2/pricing/", {
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "count": 4,
    "next": null,
    "previous": "https://api.gigapay.com/v2/pricing/?page=1",
    "results": [
        {
           "amount": "1000.00",
           "cost": "1379.91",
           "currency": "SEK",
           "fee": "65.71",
           "health_insurance": null,
           "invoiced_amount": "1314.20",
           "payroll": "314.20",
           "pension": null,
           "tax": "300.00",
           "vat": "344.97"
        }, {
           "amount": "3000.00",
           "cost": "4139.73",
           "currency": "SEK",
           "fee": "197.13",
           "health_insurance": null, 
           "invoiced_amount": "3942.60",
           "payroll": "942.60",
           "pension": null,
           "tax": "900.00",
           "vat": "1034.93"
        }
   ]
}
```

List Pricing info for past Payouts.

### HTTP Request

`GET https://api.gigapay.com/v2/pricing/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Employees per page.
`invoice` | | Relational Filter.
`employee` | | Relational Filter.
`start_at` | | Timestamp filter.
`end_at` | | Timestamp filter.
`created_at` | | Timestamp filter.
`notified_at` | | Timestamp filter.
`accepted_at` | | Timestamp filter.





## Calculate Pricing info

```python
import requests

response = requests.post(
    'https://api.gigapay.com/v2/pricing/',
    json={
        'id': 9472,
        'currency': 'SEK',
        'description': 'Instagram samarbete 2021-11-13.',
        'employee': 1847,
        'invoiced_amount': '1000.00',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b'  -d '{"id": 9472, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": 1847, "invoiced_amount": "1000.00"}' https://api.gigapay.com/v2/pricing/
```

```javascript
fetch("https://api.gigapay.com/v2/pricing/", {
    method: "POST",
    body: JSON.stringify({
        id: 9472,
        currency: 'SEK',
        description: 'Instagram samarbete 2021-11-13.',
        employee: 1847,
        invoiced_amount: '1000.00',
    }),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "fee": "20.00",
    "health_insurance": null,
    "invoiced_amount": "1000.00",
    "payroll": "239.18",
    "pension": null,
    "tax": "228.28",
    "vat": "255.00"
}
```

This endpoint allows you to calculate the price of payout you would like to make.

### HTTP Request

`POST https://api.gigapay.com/v2/pricing/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
~~`amount`~~ | String | False | | **Deprecated.** Use `invoiced_amount` instead.
~~`cost`~~ | String | False | | **Deprecated.** Use `invoiced_amount` instead.
`currency` | String | True | |
`description` | String | True | |
`employee` | String | True | |
~~`full_salary_specification`~~ | Bool | False | False | **Deprecated.**
`invoiced_amount` | String | True | | The invoiced amount for this payout.
`metadata` | Object | False | |
`start_at` | String | False | |
`end_at` | String | False | null |




## Calculate bulk pricing info

```python
import requests

response = requests.post(
    'https://api.gigapay.com/v2/payouts/',
    json=[
        {
            'id': 9472,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1847,
            'invoiced_amount': '1000.00',
        }, {
            'id': 9473,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1736,
            'invoiced_amount': '2500.00',
        },
    ],
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '[{"id": 9472, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": 1847, "invoiced_amount": "1000.00"}, {"id": 9473, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": 1736, "invoiced_amount": "2500.00"}]' https://api.gigapay.com/v2/payouts/
```

```javascript
fetch("https://api.gigapay.com/v2/payouts/", {
    method: "POST",
    body: JSON.stringify([
        {
            'id': 9472,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1847,
            'invoiced_amount': '1000.00',
        }, {
            'id': 9473,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1736,
            'invoiced_amount': '2500.00',
        },
    ]),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
[
    {
        "amount": "760.92",
        "cost": "1020.00",
        "currency": "SEK",
        "fee": "20.00",
        "health_insurance": null,
        "invoiced_amount": "1000.00",
        "payroll": "239.18",
        "pension": null,
        "tax": "228.28",
        "vat": "255.00"
    }, {
        "amount": "1902.30",
        "cost": "2550.00",
        "currency": "SEK",
        "fee": "50.00",
        "health_insurance": null,
        "invoiced_amount": "2500.00",
        "payroll": "597.95",
        "pension": null,
        "tax": "570.70",
        "vat": "637.50"
    }
]
```

The same endpoint is used to calculate the pricing info for multiple Payouts at once.

### HTTP Request

`POST https://api.gigapay.com/v2/pricing/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

| Type | Required | Default | Notes
| ---- | -------- | ------- |------------
| Payout[] | True | | Elements of array structured as [Payout](#calculate-pricing-info).






## Calculate Pricing info with an inline Employee

```python
import requests

response = requests.post(
    'https://api.gigapay.com/v2/pricing/?expand=employee',
    json={
        'id': 9472,
        'currency': 'SEK',
        'description': 'Instagram samarbete 2021-11-13.',
        'employee': {
            'id': 1847,
            'name': 'Albin Lindskog',
            'cellphone_number': '+4670000001',
            'email': 'albin@mail.com',
            'country': 'SWE'
        },
        'invoiced_amount': '1000.00',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": 9472, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": {"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}, "invoiced_amount": "1000.00"}' 'https://api.gigapay.com/v2/pricing/?expand=employee'
```

```javascript
fetch("https://api.gigapay.com/v2/pricing/?expand=employee", {
    method: "POST",
    body: JSON.stringify({
        id: 9472,
        currency: 'SEK',
        description: 'Instagram samarbete 2021-11-13.',
        employee: {
            id: 1847,
            name: 'Albin Lindskog',
            cellphone_number: '+4670000001',
            email: 'albin@mail.com',
            country: 'SWE'
        },
        invoiced_amount: '1000.00',
    }),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "fee": "20.00",
    "health_insurance": null,
    "invoiced_amount": "1000.00",
    "payroll": "239.18",
    "pension": null,
    "tax": "228.28",
    "vat": "255.00"
}
```

This endpoint registers a Payout and an Employee at the same time. If an Employee with matching information is already
registered will the object be reused.

### HTTP Request

`POST https://api.gigapay.com/v2/payouts/?expand=employee`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
~~`amount`~~ | String | False | | **Deprecated.** Use `invoiced_amount` instead.
~~`cost`~~ | String | False | | **Deprecated.** Use `invoiced_amount` instead.
`currency` | String | True | |
`description` | String | True | |
`employee` | Object | True | | Structured as an [Employee](#register-an-employee). |
~~`full_salary_specification`~~ | Bool | False | False | **Deprecated.**
`invoiced_amount` | String | True | | The invoiced amount for this payout.
`metadata` | Object | False | | 
`start_at` | String | False | | 
`end_at` | String | False | null | 





## Retrieve Pricing info of Payout

```python
import requests

response = requests.get(
    'https://api.gigapay.com/v2/pricing/9472/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/pricing/9472/
```

```javascript
fetch("https://api.gigapay.com/v2/pricing/9472/", {
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "fee": "20.00",
    "health_insurance": null,
    "invoiced_amount": "1000.00",
    "payroll": "239.18",
    "pension": null,
    "tax": "228.28",
    "vat": "255.00"
}
```

This endpoint retrieves a payout.

### HTTP Request

`GET https://api.gigapay.com/v2/pricing/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the Payout object.
