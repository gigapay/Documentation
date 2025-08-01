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
| `id`                 | Unique identifier for the invoice (BaseInvoice.internal_id).                          |
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
  'https://api.gigapay.se/v2/invoices-new/',
  headers={
    'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
  }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/invoices-new/
```

```javascript
fetch("https://api.gigapay.se/v2/invoices-new/", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

This endpoint retrieves all invoices across all invoice types.

### HTTP Request

`GET https://api.gigapay.se/v2/invoices-new/`

### Query Parameters

| Parameter      | Default | Description                                                              |
|----------------|---------|--------------------------------------------------------------------------|
| `page`         | 1       | Which page to return.                                                    |
| `page_size`    | 25      | The number of invoices per page.                                         |
| `billing_type` |         | Filter by type: `prepayment`, `payrun`, `subscription`, `credit`.        |
| `status`       |         | Filter by status: `proforma`, `invoice`, `paid`.                         |
| `ordering`     |         | Sort by: `created_at`, `paid_at`, `due_date` (prefix with `-` for desc). |

## Issue Invoice

```python
import requests

response = requests.post(
  'https://api.gigapay.se/v2/invoices-new/a9d59fad-4e74-4471-a081-1d8a8a107ab5/issue_invoice/',
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
     https://api.gigapay.se/v2/invoices-new/a0c72032-8e02-4d5d-be09-274dc67dbe2d/issue_invoice/
```

This action issues any invoice type (including prepayment proformas) as a payable invoice. The operation is idempotent -
if already issued, returns existing invoiced_at and due_date.

### HTTP Request

`POST https://api.gigapay.se/v2/invoices-new/:id/issue_invoice/`

### Parameters

| Parameter  | Required | Description                                                         |
|------------|----------|---------------------------------------------------------------------|
| `due_date` | False    | Due date (uses agreed payment terms or 14-day fallback if omitted). |

