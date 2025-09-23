# Payouts

To make a payout to an Employee you need to create a Payout object. The Employee is notified of the Payout once the 
corresponding Invoice is paid. The Employee will need to sign and accept the Payout before it is disbursed to their
account.

Either `amount`, `invoiced_amount` or `cost` is used as a basis for the Payout. For their definition and how they are
related see [Pricing](#pricing). Ensure that you are using the same definition when communicating with the recipient to
align everyone's expectation.

### The Payout object

> An example Payout object:

```json
{
    "id": "0177270d-f94b-4ab9-88ba-ac1fa2f791aa",
    "amount": "100.00",
    "cost": "137.99",
    "currency": "SEK",
    "description": "Lön genom Gigapay",
    "employee": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
    "metadata": {},
    "start_at": null,
    "end_at": null,
    "created_at": "2019-05-22T10:32:38.118753Z",
    "notified_at": "2019-05-22T10:38:19.874623Z",
    "accepted_at": null,
    "canceled_at": null
}
```

| Attribute          | Description                                                                                                                                                         |
| --------------------------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                        | Unique identifier for the object.                                                                                                                                   |
| `amount`                    | Decimal formatted string of the gross salary amount.                                                                                                                |
| `invoiced_amount`           | Decimal formatted string of the invoiced amount.                                                                                                                    |
| `cost`                      | Decimal formatted string of the total salary cost.                                                                                                                  |
| `currency`                  | ISO-4217 currency code.                                                                                                                                             |
| `description`               | String describing the work done, displayed to the recipient. Max 255 characters.                                                                                    |
| `full_salary_specification` | Controls whether to present the payroll taxes and Gigapay's fee on the payslip. It is set to false when `amount` is used as a basis for the Payout, true otherwise. |
| `employee`                  | Unique identifier for the Employee object, that is the recipient of the Payout. This is an [expandable object.](#expanding-objects)                                 |
| `invoice`                   | Unique identifier for the Invoice object the Payout object belongs to. This is an [expandable object.](#expanding-objects)                                       |
| `latest_status`             | `created` - The payout has been created. For customers with prepayment, it will be processed automatically.<br>`onboarding_incomplete` - The recipient has not completed their onboarding process in the Gigapay system.<br>`notification_sent` - The recipient has been notified about the payment and can now view it on their dashboard.<br>`available` - The payment is ready to be accepted by the recipient.<br>`complete` - The payment process has been finalized. Gigapay will handle any remaining administrative tasks related to this payment. |
| `metadata`                  | JSON-encoded metadata.                                                                                                                                              |
| `start_at`                  | The time at which the gig will start. Displayed as ISO 8601 string.                                                                                                 |
| `end_at`                    | The time at which the gig will end. Displayed as ISO 8601 string.                                                                                                   |
| `created_at`                | The time at which the Payout was created at. Displayed as ISO 8601 string.                                                                                          |
| `notified_at`               | The time at which the Employee was notified of the Payout. Displayed as ISO 8601 string.                                                                            |
| `accepted_at`               | The time at which the Employee accepted the Payout. Displayed as ISO 8601 string.                                                                                   |
| `canceled_at`               | The time at which the Payout was canceled. Displayed as ISO 8601 string.                                                                                            |



## List All Payouts

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/", {
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
    "previous": "https://api.gigapay.se/v2/payouts/?page=1",
    "results": [
        {
            "id": "0177270d-f94b-4ab9-88ba-ac1fa2f791aa",
            "amount": "100.00",
            "cost": "137.99",
            "currency": "SEK",
            "description": "Lön genom Gigapay",
            "employee": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
            "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
            "metadata": {
                "job_id": 127
            },
            "start_at": null,
            "end_at": null,
            "created_at": "2019-05-22T10:32:38.118753Z",
            "notified_at": "2019-05-22T10:38:19.874623Z",
            "accepted_at": null,
            "canceled_at": null
        }, {
            "id": "8a726186-a4e4-42e0-b56e-20fd17dc67ba",
            "amount": "10.00",
            "cost": "13.79",
            "currency": "SEK",
            "description": "Lön genom Gigapay",
            "employee": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
            "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
            "metadata": {
              "job_id": 128
            },
            "start_at": "2019-05-22T08:00:00.000000Z",
            "end_at": "2019-05-22T17:00:00.000000Z",
            "created_at": "2019-05-23T10:32:38.118753Z",
            "notified_at": "2019-05-23T11:46:29.298742Z",
            "accepted_at": "2019-05-23T12:02:16.472846Z",
            "canceled_at": null
        }
    ]
}
```

This endpoint retrieves all Payouts.

### HTTP Request

`GET https://api.gigapay.se/v2/payouts/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### Query Parameters

| Parameter     | Default | Description                                                                                         |
|---------------|---------|-----------------------------------------------------------------------------------------------------|
| `page`        | 1       | Which page to return.                                                                               |
| `page_size`   | 25      | The number of Employees per page.                                                                   |
| `invoice`     |         | Relational Filter.                                                                                  |
| `employee`    |         | Relational Filter.                                                                                  |
| `start_at`    |         | Timestamp filter.                                                                                   |
| `end_at`      |         | Timestamp filter.                                                                                   |
| `created_at`  |         | Timestamp filter.                                                                                   |
| `notified_at` |         | Timestamp filter.                                                                                   |
| `accepted_at` |         | Timestamp filter.                                                                                   |
| `canceled_at` |         | Timestamp filter.                                                                                   |
| `search`      |         | Find payout by searching for part of payout description or employee: name, cellphone number, email. |

## Register a Payout

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payouts/',
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
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b'  -d '{"id": 9472, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": 1847, "invoiced_amount": "1000.00"}' https://api.gigapay.se/v2/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/", {
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
    "id": "9472",
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "description": "Lön genom Gigapay",
    "employee": "1847",
    "full_salary_specification": true,
    "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
    "invoiced_amount": "1000.00",
    "metadata": {},
    "start_at": null,
    "end_at": null,
    "created_at": "2019-05-23T10:32:38.118753Z",
    "notified_at": null,
    "accepted_at": null,
    "canceled_at": null
}
```

This endpoint registers a payout.

### HTTP Request

`POST https://api.gigapay.se/v2/payouts/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
`amount` | String | False | | Either `amount`, `invoiced_amount` or `cost` is required.
`cost` | String | False | | Either `amount`, `invoiced_amount` or `cost` is required.
`currency` | String | True | | 
`description` | String | True | | 
`employee` | String | True | | 
`invoiced_amount` | String | True | | Either `amount`, `invoiced_amount` or `cost` is required.
`metadata` | Object | False | |
`start_at` | String | False | |
`end_at` | String | False | null |




## Register multiple Payouts

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payouts/',
    json=[
        {
            'id': 9472,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1847,
            'invoiced_amount': '1000.00',
            'metadata': {},            
        }, {
            'id': 9473,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1736,
            'invoiced_amount': '2500.00',
            'metadata': {},            
        },
    ],
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '[{"id": 9472, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": 1847, "invoiced_amount": "1000.00"}, {"id": 9473, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": 1736, "invoiced_amount": "2500.00"}]' https://api.gigapay.se/v2/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/", {
    method: "POST",
    body: JSON.stringify([
        {
            'id': 9472,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1847,
            'invoiced_amount': '1000.00',
            'metadata': {},            
        }, {
            'id': 9473,
            'currency': 'SEK',
            'description': 'Instagram samarbete 2021-11-13.',
            'employee': 1736,
            'invoiced_amount': '2500.00',
            'metadata': {},            
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
        "id": "9472",
        "amount": "760.92",
        "cost": "1020.00",
        "currency": "SEK",
        "description": "Instagram samarbete 2021-11-13.",
        "employee": "1847",
        "full_salary_specification": true,
        "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
        "invoiced_amount": "1000.00",
        "metadata": {},
        "start_at": null,
        "end_at": null,
        "created_at": "2019-05-23T10:32:38.118753Z",
        "notified_at": null,
        "accepted_at": null,
        "canceled_at": null
    }, {
        "id": "9473",
        "amount": "1902.31",
        "cost": "2550.00",
        "currency": "SEK",
        "description": "Instagram samarbete 2021-11-13.",
        "employee": "1736",
        "full_salary_specification": true,
        "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
        "invoiced_amount": "2500.00",
        "metadata": {},
        "start_at": null,
        "end_at": null,
        "created_at": "2019-05-23T10:32:38.118812Z",
        "notified_at": null,
        "accepted_at": null,
        "canceled_at": null
    }
]
```

This endpoint registers multiple Payouts at once. All payouts will be added to the same Invoice object.

### HTTP Request

`POST https://api.gigapay.se/v2/payouts/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

| Type | Required | Default | Notes
| ---- | -------- | ------- |------------
| Payout[] | True | | Elements of array structured as [Payout](#register-a-payout).






## Register a Payout with an inline Employee

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payouts/?expand=employee',
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
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": 9472, "currency": "SEK", "description": "Instagram samarbete 2021-11-13.", "employee": {"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}, "invoiced_amount": "1000.00"}' 'https://api.gigapay.se/v2/payouts/?expand=employee'
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/?expand=employee", {
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
    "id": "9472",
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "description": "Instagram samarbete 2021-11-13.",
    "employee": {
        "id": "1847",
        "name": "Albin Lindskog",
        "email": "albin@mail.com",
        "cellphone_number": "+46700000001",
        "country": "SWE",
        "metadata": {},
        "created_at": "2019-05-22T10:32:36.118753Z",
        "notified_at": null,
        "claimed_at": null,
        "verified_at": null,
        "invitation_code": "ABCD1234"
    },
    "full_salary_specification": true,
    "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
    "invoiced_amount": "1000.00",
    "metadata": {
        "campaign_id": 12394
    },
    "start_at": null,
    "end_at": null,
    "created_at": "2019-05-23T10:32:38.118753Z",
    "notified_at": null,
    "accepted_at": null,
    "canceled_at": null
}
```

This endpoint registers a Payout and an Employee at the same time. If an Employee with matching information is already
registered that object will be reused.

### HTTP Request

`POST https://api.gigapay.se/v2/payouts/?expand=employee`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
`amount` | String | False | | Either `amount`, `invoiced_amount` or `cost` is required.
`cost` | String | False | | Either `amount`, `invoiced_amount` or `cost` is required.
`currency` | String | True | | 
`description` | String | True | | 
`employee` | Object | True | | Structured as an [Employee](#register-an-employee). | 
`invoiced_amount` | String | True | | Either `amount`, `invoiced_amount` or `cost` is required.
`metadata` | Object | False | | 
`start_at` | String | False | | 
`end_at` | String | False | null | 





## Retrieve a Payout

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/9472/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payouts/9472/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/", {
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "9472",
    "amount": "760.92",
    "cost": "1020.00",
    "currency": "SEK",
    "description": "Lön genom Gigapay",
    "employee": "1847",
    "full_salary_specification": true,
    "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
    "invoiced_amount": "1000.00",
    "metadata": {
        "campaign_id": 12394
    },
    "start_at": "2019-05-22T08:00:00.000000Z",
    "end_at": "2019-05-22T17:00:00.000000Z",
    "created_at": "2019-05-23T10:32:38.118753Z",
    "notified_at": "2019-05-23T11:46:29.298742Z",
    "accepted_at": "2019-05-23T12:02:16.472846Z",
    "canceled_at": null
}
```

This endpoint retrieves a payout.

### HTTP Request

`GET https://api.gigapay.se/v2/payouts/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.





## Delete a Payout

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/payouts/9472/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payouts/9472/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


Endpoint for deleting a specific Payout. Note that you can not delete a payout belonging to a paid Invoice or an Invoice
on credit.

### HTTP Request

`DELETE https://api.gigapay.se/v2/payouts/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.




## Resend a Notification

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/payouts/9472/resend/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b',
        'Idempotency-key': 'ac4beffd-79b0-4561-b16c-846a9600b168'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -H 'Idempotency-key: ac4beffd-79b0-4561-b16c-846a9600b168' https://api.gigapay.se/v2/payouts/9472/resend/
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/resend/", {
    method: "PUT",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
        "Idempotency-key": "ac4beffd-79b0-4561-b16c-846a9600b168"
    }
})
```

> The above command returns an empty response.


This endpoint resends a notification. After resending, you need to wait at least 24 hours before resending again.

### HTTP Request

`PATCH https://api.gigapay.se/v2/payouts/:id/resend/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.
`Idempotency-key` | False | Idempotency key.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
