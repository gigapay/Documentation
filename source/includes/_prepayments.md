# Prepayments

Prepayments allow clients to pre-fund anticipated payments, enabling InstantPay.

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
| `id`                | Unique identifier for the prepayment (Prepayment.external_id).       |
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

## Create a Prepayment

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

