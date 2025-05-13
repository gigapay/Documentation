# Invoices

An Invoice groups Payouts together. It is a managed object, you can not create them directly. When a Payout is created 
it is added to the Invoice that is currently open. If there is no open Invoice, a new will be created.

You can keep invoices open for a certain time period by enabling batching of payouts. Contact [support@gigapay.se](mailto:support@gigapay.se) if you are interested in this.

### The Invoice object

> An example Invoice object:

```json
{
    "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "2859272",
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

| Attribute    | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `app`        | Link to pay invoice in app.                                          |
| `created_at` | Time at which the Invoice was created. Displayed as ISO 8601 string. |
| `currency`   | ISO-4217 currency code.                                              |
| `id`         | A unique identifier for the object.                                  |
| `metadata`   | JSON-encoded metadata.                                               |
| `ocr_number` | Bank reference.                                                      |
| `open`       | Whether the Invoice is the currently open one.                       |
| `paid_at`    | Time at which the Invoice was paid. Displayed as ISO 8601 string.    |
| `pdf`        | Link to download a pdf version of the Invoice.                       |
| `price`      | Decimal formatted string of the price.                               |





## List All Invoices

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/invoices/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/invoices/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/", {
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
    "previous": "https://api.gigapay.se/v2/invoices/?page=1",
    "results": [
        {
            "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
            "created_at": "2019-05-22T10:32:36.118753Z",
            "currency": "SEK",
            "id": "2859272",
            "metadata": {},
            "ocr_number": "986911160380",
            "open": false,
            "paid_at": "2019-05-25T9:02:16.8462735Z",
            "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
            "price": "1340.48"
        }, {
            "app": "https://app.gigapay.se/i/2859273/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
            "created_at": "2019-06-22T10:28:21.847474Z",
            "currency": "SEK",
            "id": "2859273",
            "metadata": {},
            "ocr_number": "986911160349",
            "open": false,
            "paid_at": "2019-06-25T9:12:57.742648Z",
            "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
            "price": "1340.48"
        }
}
```

This endpoint retrieves all Invoices.

### HTTP Request

`GET https://api.gigapay.se/v2/invoices/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Invoices per page.
`created_at` | | Timestamp filter.
`paid_at` | | Timestamp filter.





## Retrieve an Invoice

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/invoices/2859272/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/invoices/2859272/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/2859272/", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

> The above command returns JSON structured like this:

```json
{
    "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "2859272",
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

This endpoint retrieves an Invoice.

### HTTP Request

`GET https://api.gigapay.se/v2/invoices/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.






## Update an Invoice

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/invoices/2859272/',
    json={
      'id': '846271',
      'metadata': {'original_id': '2859272'}
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": "846271", "metadata": {"original_id": "2859272"}}' https://api.gigapay.se/v2/invoices/2859272/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/2859272/", {
    method: "PATCH",
    body: JSON.stringify({'id': '846271', 'metadata': {'original_id': '2859272'}}),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "846271",
    "metadata": {
        "original_id": "2859272"
    },
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

This endpoint updates an Invoice.

### HTTP Request

`PATCH https://api.gigapay.se/v2/invoices/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`id` | String | False | Previous value | Unique per [Integration](#integrations).
`metadata` | Object | False | Previous value | 


## Finalize an Invoice

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/invoices/846271/close/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/invoices/846271/close/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/846271/close/", {
    method: "POST",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


In a general setup, invoices are initially created in an open state (pro-forma) and are not immediately finalized. This allows users to review and edit their invoices before submission.

Once the invoice is ready, it can be finalized using this endpoint. Finalization has two important effects:
1. The payouts become visible to the employees
2. The invoice is sent to the email address configured in the integration settings

### HTTP Request

`POST https://api.gigapay.se/v2/invoices/:id/close/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.



## Delete an Invoice

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/invoices/846271/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/invoices/846271/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/846271/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


This endpoint deletes an Invoice. Note that you can not delete a paid Invoice or an Invoice on credit.

### HTTP Request

`DELETE https://api.gigapay.se/v2/invoices/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

