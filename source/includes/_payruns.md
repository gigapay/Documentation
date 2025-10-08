# Payruns

A Payrun groups Payouts together. It is a managed object, you can not create them directly. When a Payout is created 
it is added to the Payrun that is currently open. If there is no open Payrun, a new will be created.

You can keep payruns open for a certain time period by enabling batching of payouts. Contact [support@gigapay.se](mailto:support@gigapay.se) if you are interested in this.

### The Payrun object

> An example Payrun object:

```json
{
    "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "2859272",
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
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
| `invoice`    | Unique identifier for the Invoice object. This is an [expandable object.](#expanding-objects) |
| `latest_status` | `open` - The payrun is created and new payouts can be added<br>`invoiced` - An invoice has been created for the payrun<br>`paid` - The payrun has been paid |
| `metadata`   | JSON-encoded metadata.                                               |
| `ocr_number` | Bank reference.                                                      |
| `open`       | Whether the Payrun is the currently open one.                       |
| `paid_at`    | Time at which the Payrun was paid. Displayed as ISO 8601 string.    |
| `pdf`        | Link to download a pdf version of the Payrun.                       |
| `price`      | Decimal formatted string of the price.                               |





## List All Payruns

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payruns/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payruns/
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/", {
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
    "previous": "https://api.gigapay.se/v2/payruns/?page=1",
    "results": [
        {
            "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
            "created_at": "2019-05-22T10:32:36.118753Z",
            "currency": "SEK",
            "id": "2859272",
            "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
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
            "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
            "metadata": {},
            "ocr_number": "986911160349",
            "open": false,
            "paid_at": "2019-06-25T9:12:57.742648Z",
            "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
            "price": "1340.48"
        }
}
```

This endpoint retrieves all Payruns.

### HTTP Request

`GET https://api.gigapay.se/v2/payruns/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Payruns per page.
`created_at` | | Timestamp filter.
`paid_at` | | Timestamp filter.
`open` | | Boolean filter to get only open payruns (`true`) or closed payruns (`false`). Omit to get all payruns.





## Retrieve a Payrun

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payruns/2859272/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payruns/2859272/
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/2859272/", {
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
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

> To retrieve a Payrun with the invoice expanded:

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payruns/2859272/?expand=invoice',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payruns/2859272/?expand=invoice
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/2859272/?expand=invoice", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

> When the invoice is expanded, the response includes the full invoice object:

```json
{
    "app": "https://app.gigapay.se/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "2859272",
    "invoice": {
        "id": "bab4b830-47d6-4a24-a460-3289897f6e8e",
        "amount_due": "1745.40",
        "amount_paid": "0.00",
        "billing_type": "payrun",
        "created_at": "2019-05-22T10:32:36.118753Z",
        "currency": "SEK",
        "customer_reference": null,
        "due_date": null,
        "invoice_number": "986911160380",
        "issued_at": null,
        "paid_at": null,
        "pdf_url": "https://api.gigapay.se/invoice/bab4b830-47d6-4a24-a460-3289897f6e8e/?token=hej&language=en",
        "total": "1745.40"
    },
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.se/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

This endpoint retrieves a Payrun.

### HTTP Request

`GET https://api.gigapay.se/v2/payruns/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`expand` | | Expand related objects. Use `invoice` to expand the invoice object.



## Update a Payrun

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/payruns/2859272/',
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
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": "846271", "metadata": {"original_id": "2859272"}}' https://api.gigapay.se/v2/payruns/2859272/
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/2859272/", {
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
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
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

This endpoint updates a Payrun.

### HTTP Request

`PATCH https://api.gigapay.se/v2/payruns/:id/`

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


## Finalize a Payrun

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payruns/846271/close/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payruns/846271/close/
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/846271/close/", {
    method: "POST",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


Payruns are initially created in an open state (pro-forma) and are not immediately finalized. This allows users to review and edit their payruns before submission.

Once the payrun is ready, it can be finalized using this endpoint. Finalization has two important effects:
1. The payouts become visible to the employees
2. The payrun is sent to the email address configured in the integration settings

### HTTP Request

`POST https://api.gigapay.se/v2/payruns/:id/close/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.



## Delete a Payrun

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/payruns/846271/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payruns/846271/
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/846271/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


This endpoint deletes a Payrun. Note that you can not delete a paid Payrun or a Payrun on credit.

### HTTP Request

`DELETE https://api.gigapay.se/v2/payruns/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

