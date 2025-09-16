# Prepayments

Prepayments allow clients to pre-fund anticipated payments, enabling InstantPay. Once paid, prepayments are automatically used to cover payruns in a first-in-first-out (FIFO) manner. The deduction will be shown in the monthly payrun settlement.

## The Prepayment Object

> An example prepayment object:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "description": "Q1 2024 Influencer Campaign Budget",
  "net_amount": "10000.00",
  "currency": "EUR",
  "available_balance": "9000.00",
  "invoice_marking": "PO-2024-001",
  "status": "PAID",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "invoiced_at": "2019-06-23T10:28:21.847474Z",
  "paid_at": "2019-06-24T10:28:21.847474Z",
  "metadata": {},
  "invoice": "a9d59fad-4e74-4471-a081-1d8a8a107ab5"
}
```

| Attribute           | Description                                                          |
|---------------------|----------------------------------------------------------------------|
| `id`                | Unique identifier for the prepayment.                                |
| `description`       | Description of the prepayment purpose.                               |
| `net_amount`        | Total prepayment amount as decimal string.                           |
| `currency`          | ISO-4217 currency code.                                              |
| `available_balance` | Remaining balance after usage (0 if not paid).                       |
| `invoice_marking`   | Customer reference/PO number.                                        |
| `status`            | Status: `DRAFT`, `INVOICED`, `PAID`, `PARTIALLY_USED`, `FULLY_USED`. |
| `created_at`        | Time at which prepayment was created. ISO 8601 string.               |
| `invoiced_at`       | Time at which proforma was converted to invoice.                     |
| `paid_at`           | Time at which prepayment was paid.                                   |
| `metadata`          | JSON metadata object for storing arbitrary data.                     |
| `invoice`           | Invoice reference (expandable).                                      |

### Expandable Invoice Reference

The `invoice` field can be expanded to show full invoice details by using the `expand` query parameter:

```shell
# Collapsed (default) - returns invoice ID only
curl -X GET https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/

# Expanded - returns full invoice object
curl -X GET https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/?expand=invoice
```

## List Prepayments

```javascript
const response = await fetch('https://api.gigapay.se/v2/prepayments/', {
  method: 'GET',
  headers: {
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
});
```

```python
import requests

response = requests.get(
  'https://api.gigapay.se/v2/prepayments/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' \
     -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' \
     https://api.gigapay.se/v2/prepayments/
```

> The above command returns JSON structured like this:

```json
{
  "count": 4,
  "next": null,
  "previous": "https://api.gigapay.se/v2/prepayments/?page=1&page_size=2",
  "results": [
    {
      "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
      "description": "Q1 2024 Influencer Campaign Budget",
      "net_amount": "10000.00",
      "currency": "EUR",
      "available_balance": "9000.00",
      "invoice_marking": "PO-2024-001",
      "status": "PAID",
      "created_at": "2019-06-22T10:28:21.847474Z",
      "invoiced_at": "2019-06-23T10:28:21.847474Z",
      "paid_at": "2019-06-24T10:28:21.847474Z",
      "invoice": "a9d59fad-4e74-4471-a081-1d8a8a107ab5",
      "metadata": {}
    },
    {
      "id": "b1d73143-9f13-5e6e-cf1a-385ed68ecf3e",
      "description": "Q2 2024 Marketing Budget",
      "net_amount": "5000.00",
      "currency": "SEK",
      "available_balance": "0.00",
      "invoice_marking": "PO-2024-002",
      "status": "DRAFT",
      "created_at": "2019-07-01T08:15:30.123456Z",
      "invoiced_at": null,
      "paid_at": null,
      "invoice": "c8e74152-0a24-5f7f-d092-296fe79fdf6b",
      "metadata": {
        "department": "marketing",
        "campaign": "summer_2024"
      }
    }
  ]
}
```

### HTTP Request

`GET https://api.gigapay.se/v2/prepayments/`

## Create a Prepayment

```javascript
const response = await fetch('https://api.gigapay.se/v2/prepayments/', {
  method: 'POST',
  headers: {
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "description": "Q1 2024 Influencer Campaign Budget",
    "net_amount": "10000.00",
    "currency": "EUR",
    "invoice_marking": "PO-2024-001",
    "metadata": {}
  })
});
```

```python
import requests

response = requests.post(
  'https://api.gigapay.se/v2/prepayments/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  },
  json={
    "description": "Q1 2024 Influencer Campaign Budget",
    "net_amount": "10000.00",
    "currency": "EUR",
    "invoice_marking": "PO-2024-001",
    "metadata": {}
  }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' \
     -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' \
     -H 'Content-Type: application/json' \
     -d '{"description":"Q1 2024 Influencer Campaign Budget","net_amount":"10000.00","currency":"EUR","invoice_marking":"PO-2024-001","metadata":{}}' \
     https://api.gigapay.se/v2/prepayments/
```

> The above command returns JSON structured like this:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "description": "Q1 2024 Influencer Campaign Budget",
  "net_amount": "10000.00",
  "currency": "EUR",
  "available_balance": "0.00",
  "invoice_marking": "PO-2024-001",
  "status": "DRAFT",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "invoiced_at": null,
  "paid_at": null,
  "invoice": "a9d59fad-4e74-4471-a081-1d8a8a107ab5",
  "metadata": {}
}
```

### HTTP Request

`POST https://api.gigapay.se/v2/prepayments/`

### Parameters

| Parameter         | Required | Description                              |
|-------------------|----------|------------------------------------------|
| `description`     | True     | Description of the prepayment purpose.   |
| `net_amount`      | True     | Prepayment amount (positive decimal).    |
| `currency`        | True     | ISO-4217 currency code (3 letters).      |
| `invoice_marking` | False    | Customer reference/PO number.            |
| `metadata`        | False    | JSON metadata object for arbitrary data. |

## Retrieve a Prepayment

```javascript
const response = await fetch('https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/', {
  method: 'GET',
  headers: {
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
});
```

```python
import requests

response = requests.get(
  'https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' \
     -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' \
     https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/
```

> The above command returns JSON structured like this:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "description": "Q1 2024 Influencer Campaign Budget",
  "net_amount": "10000.00",
  "currency": "EUR",
  "available_balance": "9000.00",
  "invoice_marking": "PO-2024-001",
  "status": "PAID",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "invoiced_at": "2019-06-23T10:28:21.847474Z",
  "paid_at": "2019-06-24T10:28:21.847474Z",
  "invoice": "a9d59fad-4e74-4471-a081-1d8a8a107ab5",
  "metadata": {}
}
```

### HTTP Request

`GET https://api.gigapay.se/v2/prepayments/:id/`

## Update a Prepayment

```javascript
const response = await fetch('https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "description": "Updated Q1 2024 Influencer Campaign Budget",
    "invoice_marking": "PO-2024-001-UPDATED", 
    "metadata": {"campaign_type": "influencer"}
  })
});
```

```python
import requests

response = requests.patch(
  'https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  },
  json={
    "description": "Updated Q1 2024 Influencer Campaign Budget",
    "invoice_marking": "PO-2024-001-UPDATED", 
    "metadata": {"campaign_type": "influencer"}
  }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' \
     -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' \
     -H 'Content-Type: application/json' \
     -d '{"description":"Updated Q1 2024 Influencer Campaign Budget","invoice_marking":"PO-2024-001-UPDATED","metadata":{"campaign_type":"influencer"}}' \
     https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/
```

**Note**: Prepayments can only be updated while in `DRAFT` status. Once invoiced or paid, they become read-only.

> The above command returns JSON structured like this:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "description": "Updated Q1 2024 Influencer Campaign Budget",
  "net_amount": "10000.00",
  "currency": "EUR",
  "available_balance": "0.00",
  "invoice_marking": "PO-2024-001-UPDATED",
  "status": "DRAFT",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "invoiced_at": null,
  "paid_at": null,
  "invoice": "a9d59fad-4e74-4471-a081-1d8a8a107ab5",
  "metadata": {
    "campaign_type": "influencer"
  }
}
```

### HTTP Request

`PATCH https://api.gigapay.se/v2/prepayments/:id/`

### Parameters

| Parameter         | Required | Description                              |
|-------------------|----------|------------------------------------------|
| `description`     | False    | Description of the prepayment purpose.   |
| `net_amount`      | False    | Prepayment amount (positive decimal).    |
| `currency`        | False    | ISO-4217 currency code (3 letters).      |
| `invoice_marking` | False    | Customer reference/PO number.            |
| `metadata`        | False    | JSON metadata object for arbitrary data. |

## Delete a Prepayment

```javascript
const response = await fetch('https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
});
```

```python
import requests

response = requests.delete(
  'https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' \
     -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' \
     https://api.gigapay.se/v2/prepayments/a0c72032-8e02-4d5d-be09-274dc67dbe2d/
```

**Note**: Prepayments can only be deleted while in `DRAFT` status. Once invoiced or paid, deletion is not permitted.

### HTTP Request

`DELETE https://api.gigapay.se/v2/prepayments/:id/`


