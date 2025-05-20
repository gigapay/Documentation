# Payment Terms

This endpoint allows you to retrieve the payment terms associated with your integration. The response includes information about security deposits for each currency. For integrations with a security deposit at Gigapay, the endpoint displays the total deposit amount (`credit_limit`) and how much of that deposit has been utilized (`credit_used`), broken down by currency.

### The Payment Terms object

> An example Payment Terms object:

```json
{
  [
    {
      "credit_terms": [
        {
          "credit_limit": "70.00",
          "credit_used": 0.00,
          "currency": "SEK"
        },
        {
          "credit_limit": "70.00",
          "credit_used": 0.00,
          "currency": "NOK"
        },
        {
          "credit_limit": "70.00",
          "credit_used": 0.00,
          "currency": "EUR"
        }
      ]
    }
  ]
}
```

| Attribute    | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `credit_terms` | A list of credit term objects.                                        |
| `credit_limit` | The maximum credit amount available in the specified currency.        |
| `credit_used`  | The amount of credit currently being used in the specified currency.  |
| `currency`     | The currency code for the credit terms (e.g., SEK, NOK, EUR).         |

## List Payment Terms

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payment_terms/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/payment_terms/
```

```javascript
fetch("https://api.gigapay.se/v2/payment_terms/", {
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> The above command returns JSON structured like this:

```json
[
  {
    "credit_terms": [
      {
        "credit_limit": "70.00",
        "credit_used": 0.00,
        "currency": "SEK"
      },
      {
        "credit_limit": "70.00",
        "credit_used": 0.00,
        "currency": "NOK"
      },
      {
        "credit_limit": "70.00",
        "credit_used": 10.00,
        "currency": "EUR"
      }
    ]
  }
]
```

This endpoint retrieves Payment Terms for an integration.

### HTTP Request

`GET https://api.gigapay.se/v2/payment_terms/`

### Headers

| Parameter        | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |