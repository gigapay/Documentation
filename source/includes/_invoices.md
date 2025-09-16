# Invoices

The invoice API provides a standardized interface for accessing all invoice types (payrun, prepayment,
subscription, credit).

## The Invoice Object

> An example invoice object:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "issued_at": "2019-06-23T10:28:21.847474Z",
  "paid_at": "2019-06-24T10:28:21.847474Z",
  "due_date": "2024-02-15",
  "currency": "EUR",
  "total": "1250.00",
  "amount_due": "0.00",
  "amount_paid": "1250.00",
  "invoice_number": "986911160380",
  "customer_reference": "PO-2024-001",
  "billing_type": "prepayment",
  "pdf_url": null
}
```

| Attribute            | Description                                                                           |
|----------------------|---------------------------------------------------------------------------------------|
| `id`                 | Unique identifier for the invoice (UUID4).                                           |
| `created_at`         | Time at which the invoice was created. ISO 8601 string.                               |
| `issued_at`          | Time at which proforma was converted to invoice. Null for proformas.                  |
| `paid_at`            | Time at which the invoice was paid. ISO 8601 string.                                  |
| `due_date`           | Due date for payment. ISO 8601 date string.                                           |
| `currency`           | ISO-4217 currency code.                                                               |
| `total`              | Total invoice amount as decimal string.                                               |
| `amount_due`         | Amount still due (0 if paid, total minus prepayment usage).                           |
| `amount_paid`        | Amount paid (full total if paid_at is set).                                           |
| `invoice_number`     | OCR/reference number for the invoice.                                                 |
| `customer_reference` | Customer reference (invoice_marking).                                                 |
| `billing_type`       | Type of invoice: `prepayment`, `payrun`, `subscription`, `credit`.                    |
| `pdf_url`            | URL to download invoice PDF (currently returns `null` - feature not yet implemented). |

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
    "Integration-ID": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

This endpoint retrieves all invoices across all invoice types.

> The above command returns JSON structured like this:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
      "created_at": "2019-06-22T10:28:21.847474Z",
      "issued_at": "2019-06-23T10:28:21.847474Z", 
      "paid_at": null,
      "due_date": "2024-02-15",
      "currency": "EUR",
      "total": "1250.00",
      "amount_due": "1250.00",
      "amount_paid": "0.00",
      "invoice_number": "986911160380",
      "customer_reference": "PO-2024-001",
      "billing_type": "payrun",
      "pdf_url": "https://api.gigapay.se/invoice/a0c72032-8e02-4d5d-be09-274dc67dbe2d/?token=some-token&language=en"
    }
  ]
}
```

### HTTP Request

`GET https://api.gigapay.se/v2/invoices/`

### Query Parameters

| Parameter      | Default | Description                                                              |
|----------------|---------|--------------------------------------------------------------------------|
| `page`         | 1       | Which page to return.                                                    |
| `page_size`    | 25      | The number of invoices per page.                                         |
| `billing_type` |         | Filter by type: `prepayment`, `payrun`, `subscription`, `credit`.        |
| `status`       |         | Filter by status: `proforma`, `invoice`, `paid`.                         |
| `ordering`     |         | Sort by: `created_at`, `paid_at`, `due_date` (prefix with `-` for desc). |

## Retrieve an Invoice

```python
import requests

response = requests.get(
  'https://api.gigapay.se/v2/invoices/a0c72032-8e02-4d5d-be09-274dc67dbe2d/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/invoices/a0c72032-8e02-4d5d-be09-274dc67dbe2d/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/a0c72032-8e02-4d5d-be09-274dc67dbe2d/", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-ID": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

This endpoint retrieves a specific invoice.

> The above command returns JSON structured like this:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "issued_at": "2019-06-23T10:28:21.847474Z",
  "paid_at": null,
  "due_date": "2024-02-15",
  "currency": "EUR",
  "total": "1250.00",
  "amount_due": "1250.00",
  "amount_paid": "0.00",
  "invoice_number": "986911160380",
  "customer_reference": "PO-2024-001",
  "billing_type": "payrun",
  "pdf_url": "https://api.gigapay.se/invoice/a0c72032-8e02-4d5d-be09-274dc67dbe2d/?token=some-token&language=en"
}
```

### HTTP Request

`GET https://api.gigapay.se/v2/invoices/:id/`

### URL Parameters

| Parameter | Description                           |
|-----------|---------------------------------------|
| `id`      | The ID of the invoice to retrieve     |

## Issue Invoice

```python
import requests

response = requests.post(
  'https://api.gigapay.se/v2/invoices/a9d59fad-4e74-4471-a081-1d8a8a107ab5/issue/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  },
  json={
    "due_date": "2024-02-15"
  }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' \
     -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' \
     -H 'Content-Type: application/json' \
     -d '{"due_date":"2024-02-15"}' \
     https://api.gigapay.se/v2/invoices/a0c72032-8e02-4d5d-be09-274dc67dbe2d/issue/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices/a0c72032-8e02-4d5d-be09-274dc67dbe2d/issue/", {
  method: "POST",
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-ID": "79606358-97af-4196-b64c-5f719433d56b",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "due_date": "2024-02-15"
  })
})
```

This action issues any invoice type (including prepayment proformas) as a payable invoice. The operation returns a conflict error if the invoice is already issued. Requires the integration to have `invoice_enabled=True` permission.

### HTTP Request

`POST https://api.gigapay.se/v2/invoices/:id/issue/`

### Parameters

| Parameter  | Required | Description                                                                                                            |
|------------|----------|------------------------------------------------------------------------------------------------------------------------|
| `due_date` | False    | Due date (ISO date format). Uses integration's payment terms or 14-day fallback if omitted. Must be today or future date, maximum 365 days in future. |

### Response

> The above command returns JSON structured like this:

```json
{
  "id": "a0c72032-8e02-4d5d-be09-274dc67dbe2d",
  "created_at": "2019-06-22T10:28:21.847474Z",
  "issued_at": "2024-02-15T10:28:21.847474Z",
  "paid_at": null,
  "due_date": "2024-02-15",
  "currency": "EUR",
  "total": "1250.00",
  "amount_due": "1250.00",
  "amount_paid": "0.00",
  "invoice_number": "986911160380",
  "customer_reference": "PO-2024-001",
  "billing_type": "payrun",
  "pdf_url": "https://api.gigapay.se/invoice/a0c72032-8e02-4d5d-be09-274dc67dbe2d/?token=hej&language=en"
}
```

Returns the updated invoice object with `issued_at` timestamp and `due_date` set.

### Errors

| Status | Error                                      | Description                                           |
|--------|--------------------------------------------|-------------------------------------------------------|
| 403    | Integration does not have permission       | Integration has `invoice_enabled=False`              |
| 409    | Invoice already issued                     | Invoice was previously issued (idempotent operation) |
| 400    | Validation error                          | Invalid `due_date` (past date or >365 days future)   |

