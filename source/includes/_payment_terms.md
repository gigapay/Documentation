# Payment Term

Payment Term defines the financial conditions under which your Gigapay integration operates, including credit limits, payment schedules, and batching intervals for processing payouts.

### The Payment Term object

> An example Payment Term object:

```json
{
  "batching_duration": 86400,
  "due_days": 14,
  "batching_interval": "weekly",
  "credit_terms": [
    {
      "currency": "SEK",
      "credit_limit": "50000.00",
      "credit_used": "12345.67"
    },
    {
      "currency": "EUR",
      "credit_limit": "25000.00",
      "credit_used": "5432.10"
    }
  ]
}
```

| Attribute            | Description                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------|
| `batching_duration`  | Duration in seconds that a Payrun stays active before being automatically closed.                    |
| `due_days`           | Number of days from invoice issuance until payment is due.                                           |
| `batching_interval`  | Frequency at which payruns are automatically closed. One of: `weekly`, `monthly`, `quarterly`.       |
| `credit_terms`       | Array of credit term objects, one per supported currency.                                            |
| `credit_terms[].currency`      | ISO-4217 currency code for this credit term.                               |
| `credit_terms[].credit_limit`  | Maximum credit amount available in this currency (decimal formatted string).|
| `credit_terms[].credit_used`   | Currently used credit amount in this currency (decimal formatted string).   |

## Retrieve Payment Term

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payment_term/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payment_term/
```

```javascript
fetch("https://api.gigapay.se/v2/payment_term/", {
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
  "batching_duration": 86400,
  "due_days": 14,
  "batching_interval": "weekly",
  "credit_terms": [
    {
      "currency": "SEK",
      "credit_limit": "50000.00",
      "credit_used": "12345.67"
    },
    {
      "currency": "EUR",
      "credit_limit": "25000.00",
      "credit_used": "5432.10"
    }
  ]
}
```

This endpoint retrieves your payment term configuration, including credit limits and current usage across all supported currencies.

### HTTP Request

`GET https://api.gigapay.se/v2/payment_term/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

<aside class="notice">
Payment term is read-only via the API. To modify your payment term, please contact our support team at <a href="mailto:support@gigapay.se">support@gigapay.se</a>.
</aside>

<aside class="notice">
Credit usage is calculated in real-time based on unpaid payruns. The <code>credit_used</code> value reflects the total invoiced amount of all payruns that are on credit and have not yet been paid.
</aside>
