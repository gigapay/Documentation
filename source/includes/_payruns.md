# Payruns

A Payrun groups Payouts together. Payruns are typically managed automatically - when a Payout is created, it is added to the currently active Payrun, or a new Payrun is created if none exists.

You can also create Payruns explicitly to organize payouts by campaigns or other criteria. This allows you to maintain multiple open payruns per currency simultaneously, each representing a different campaign, project, or business unit.

<aside class="warning">
Explicit payrun management is not enabled by default. Until it is enabled for your integration, creating a Payrun returns <code>403 Forbidden</code> and sending a <code>payrun</code> when creating a Payout returns <code>400 Bad Request</code>. Contact <a href="mailto:support@gigapay.com">support@gigapay.com</a> to have it enabled. You can check the current setting with the <code>payrun_management</code> attribute on the <a href="#integrations">Integration</a> object.
</aside>

You can keep payruns open for a certain time period by enabling batching of payouts. Contact [support@gigapay.com](mailto:support@gigapay.com) if you are interested in this.

### The Payrun object

> An example Payrun object:

```json
{
    "app": "https://app.gigapay.com/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "description": "",
    "expected_close_at": "2019-05-25T09:02:16.846273Z",
    "id": "2859272",
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
    "latest_status": "paid",
    "manually_managed": false,
    "metadata": {},
    "name": null,
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "payout_count": 3,
    "pdf": "https://api.gigapay.com/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

| Attribute    | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `app`        | Link to pay invoice in app.                                          |
| `created_at` | Time at which the Invoice was created. Displayed as ISO 8601 string. |
| `currency`   | ISO-4217 currency code.                                              |
| `description` | Optional free-text description. Empty string when not set.          |
| `expected_close_at` | Time at which the Payrun is expected to close, or the time it closed at once it has. Displayed as ISO 8601 string. `null` when no close is scheduled. See [Payrun lifecycle](#payrun-lifecycle). |
| `id`         | A unique identifier for the object.                                  |
| `invoice`    | Unique identifier for the Invoice object. This is an [expandable object.](#expanding-objects) |
| `invoice_marking` | Optional text field for identifying the payrun (e.g., PO number or campaign name). Max 256 characters. |
| `latest_status` | `open` - The payrun is created and new payouts can be added<br>`invoiced` - An invoice has been created for the payrun<br>`paid` - The payrun has been paid |
| `manually_managed` | `true` when the Payrun was created explicitly, `false` when it was created automatically. Determines how the Payrun is closed, and whether Payouts are added to it automatically. See [Payrun lifecycle](#payrun-lifecycle). |
| `metadata`   | JSON-encoded metadata.                                               |
| `name`       | Optional human-readable name, for example the campaign it represents. `null` when not set. |
| `ocr_number` | Bank reference.                                                      |
| `open`       | Whether the Payrun still accepts new Payouts.                        |
| `paid_at`    | Time at which the Payrun was paid. Displayed as ISO 8601 string.    |
| `payout_count` | Number of Payouts in the Payrun.                                   |
| `pdf`        | Link to download a pdf version of the Payrun. `null` before an invoice exists. |
| `price`      | Decimal formatted string of the price.                               |

## Payrun lifecycle

How a Payrun closes depends on whether it was created automatically or explicitly.

**Automatically created Payruns** (`manually_managed: false`) are the default. Every Payout created without a `payrun` is added to the currently open one for its currency, and it closes on the batching schedule agreed for your organization.

**Explicitly created Payruns** (`manually_managed: true`) behave differently in three ways:

* Payouts are only added to them when they name the Payrun, so a campaign never collects unrelated Payouts.
* They are not closed by the batching schedule, so a campaign is not split across several invoices when a batching period ends.
* They close when you [finalize](#finalize-a-payrun) them, or automatically once no Payout has been added for a period of inactivity, 30 days by default.
* They close at the latest 90 days after they were created, however recently a Payout was added. A Payrun that is still open holds Payouts that have not been invoiced yet, so its lifetime is bounded.

Contact [support@gigapay.com](mailto:support@gigapay.com) if you need different periods for your organization.

`expected_close_at` tells you when a Payrun is currently expected to close. For an explicitly created Payrun it is recalculated from the most recent Payout, so it moves forward each time you add one, up to the point where the 90-day limit applies. Read it if you run campaigns long enough for that limit to matter: once a Payrun closes, further Payouts naming it are rejected, and you need to create a new one.

An explicitly created Payrun that never received a Payout is removed rather than invoiced when it reaches the end of that inactivity period. You can also [delete](#delete-a-payrun) an empty one yourself.

<aside class="notice">
Closing a Payrun is what creates its invoice. Keep a campaign open only as long as you are still adding Payouts to it.
</aside>





## Create a Payrun

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/payruns/',
    json={
        'currency': 'SEK',
        'name': 'Summer Campaign 2025',
        'invoice_marking': 'PO-4471',
        'metadata': {'campaign_id': 'summer-2025'}
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"currency": "SEK", "name": "Summer Campaign 2025", "invoice_marking": "PO-4471", "metadata": {"campaign_id": "summer-2025"}}' https://api.gigapay.se/v2/payruns/
```

```javascript
fetch("https://api.gigapay.se/v2/payruns/", {
    method: "POST",
    body: JSON.stringify({
        'currency': 'SEK',
        'name': 'Summer Campaign 2025',
        'invoice_marking': 'PO-4471',
        'metadata': {'campaign_id': 'summer-2025'}
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
    "app": null,
    "created_at": "2025-11-05T10:32:36.118753Z",
    "currency": "SEK",
    "description": "",
    "expected_close_at": "2025-12-05T10:32:36.118753Z",
    "id": "d9d0ba5f-5f5b-4a5e-9e4e-2f2c1d5f4f0a",
    "invoice": null,
    "invoice_marking": "PO-4471",
    "latest_status": "open",
    "manually_managed": true,
    "metadata": {
        "campaign_id": "summer-2025"
    },
    "name": "Summer Campaign 2025",
    "ocr_number": null,
    "open": true,
    "paid_at": null,
    "payout_count": 0,
    "pdf": null,
    "price": "0.00"
}
```

This endpoint creates a new Payrun explicitly. This is useful for organizing payouts by campaigns, projects, or other business criteria.

Once created, you can add payouts to this specific payrun by including the payrun's `id` when creating payouts.

### HTTP Request

`POST https://api.gigapay.se/v2/payruns/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`id` | String | False | Generated | Unique per [Integration](#integrations). Use it to set your own identifier, for example your campaign id. The value `open` is reserved.
`currency` | String | False | Organization's default currency | ISO-4217 currency code. Must be one of the currencies enabled for your organization.
`name` | String | False | | Human-readable name for the Payrun, for example the campaign it represents. Max 255 characters.
`description` | String | False | | Free-text description.
`invoice_marking` | String | False | | Optional text for identifying the payrun (e.g., PO number). Max 256 characters.
`metadata` | Object | False | {} | JSON-encoded metadata.

A Payrun created this way is returned with `manually_managed` set to `true`. Payouts are only added to it when they name it, and it is not closed by your batching schedule. See [Payrun lifecycle](#payrun-lifecycle).

<aside class="notice">
You can maintain multiple open payruns per currency simultaneously. This allows you to organize payouts by different campaigns or projects.
</aside>





## List All Payruns

```python
import requests

response = requests.get(
    'https://api.gigapay.com/v2/payruns/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/payruns/
```

```javascript
fetch("https://api.gigapay.com/v2/payruns/", {
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
    "previous": "https://api.gigapay.com/v2/payruns/?page=1",
    "results": [
        {
            "app": "https://app.gigapay.com/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
            "created_at": "2019-05-22T10:32:36.118753Z",
            "currency": "SEK",
            "id": "2859272",
            "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
            "latest_status": "paid",
            "metadata": {},
            "ocr_number": "986911160380",
            "open": false,
            "paid_at": "2019-05-25T9:02:16.8462735Z",
            "pdf": "https://api.gigapay.com/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
            "price": "1340.48"
        }, {
            "app": "https://app.gigapay.com/i/2859273/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
            "created_at": "2019-06-22T10:28:21.847474Z",
            "currency": "SEK",
            "id": "2859273",
            "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
            "latest_status": "paid",
            "metadata": {},
            "ocr_number": "986911160349",
            "open": false,
            "paid_at": "2019-06-25T9:12:57.742648Z",
            "pdf": "https://api.gigapay.com/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
            "price": "1340.48"
        }
}
```

This endpoint retrieves all Payruns.

### HTTP Request

`GET https://api.gigapay.com/v2/payruns/`

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
`currency` | | Filter by ISO-4217 currency code.
`manually_managed` | | Boolean filter to get only the payruns you created (`true`) or only the automatic ones (`false`). Omit to get both. Combine with `open=true` to list your active campaigns.





## Retrieve a Payrun

```python
import requests

response = requests.get(
    'https://api.gigapay.com/v2/payruns/2859272/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/payruns/2859272/
```

```javascript
fetch("https://api.gigapay.com/v2/payruns/2859272/", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

> The above command returns JSON structured like this:

```json
{
    "app": "https://app.gigapay.com/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "2859272",
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
    "latest_status": "paid",
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.com/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

> To retrieve a Payrun with the invoice expanded:

```python
import requests

response = requests.get(
    'https://api.gigapay.com/v2/payruns/2859272/?expand=invoice',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/payruns/2859272/?expand=invoice
```

```javascript
fetch("https://api.gigapay.com/v2/payruns/2859272/?expand=invoice", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
  }
})
```

> When the invoice is expanded, the response includes the full invoice object:

```json
{
    "app": "https://app.gigapay.com/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
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
        "pdf_url": "https://api.gigapay.com/invoice/bab4b830-47d6-4a24-a460-3289897f6e8e/?token=hej&language=en",
        "total": "1745.40"
    },
    "latest_status": "paid",
    "metadata": {},
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.com/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

This endpoint retrieves a Payrun.

### HTTP Request

`GET https://api.gigapay.com/v2/payruns/:id/`

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
    'https://api.gigapay.com/v2/payruns/2859272/',
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
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": "846271", "metadata": {"original_id": "2859272"}}' https://api.gigapay.com/v2/payruns/2859272/
```

```javascript
fetch("https://api.gigapay.com/v2/payruns/2859272/", {
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
    "app": "https://app.gigapay.com/i/2859272/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy9jMTMzYzIwMi0xMDUwLTQ5NTktODMwNi05NWQ3Y2IzZjNiMjgvIg",
    "created_at": "2019-05-22T10:32:36.118753Z",
    "currency": "SEK",
    "id": "846271",
    "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
    "latest_status": "paid",
    "metadata": {
        "original_id": "2859272"
    },
    "ocr_number": "986911160380",
    "open": false,
    "paid_at": "2019-05-25T9:02:16.8462735Z",
    "pdf": "https://api.gigapay.com/invoice/cad7d4d7-cdc7-4f70-8246-c061e041e9e/?token=Ii9pbnZvaWNpbmcvb3Blbl9pbnZvaWNlcy8zYjcyNTYyOS05MTE4LTQ5YTctYTFiYS0yMTU4NTZhMzYwOTgvIg&language=en",
    "price": "1340.48"
}
```

This endpoint updates a Payrun.

### HTTP Request

`PATCH https://api.gigapay.com/v2/payruns/:id/`

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
`name` | String | False | Previous value | Human-readable name for the Payrun. Max 255 characters.
`description` | String | False | Previous value | Free-text description.
`invoice_marking` | String | False | Previous value | Optional text for identifying the payrun. Max 256 characters.
`metadata` | Object | False | Previous value |

`currency` can not be changed after the Payrun has been created.

<aside class="warning">
Closed payruns cannot be edited. You can only update open payruns.
</aside> 


## Finalize a Payrun

```python
import requests

response = requests.post(
    'https://api.gigapay.com/v2/payruns/846271/close/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/payruns/846271/close/
```

```javascript
fetch("https://api.gigapay.com/v2/payruns/846271/close/", {
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

`POST https://api.gigapay.com/v2/payruns/:id/close/`

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
    'https://api.gigapay.com/v2/payruns/846271/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.com/v2/payruns/846271/
```

```javascript
fetch("https://api.gigapay.com/v2/payruns/846271/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


This endpoint deletes a Payrun. Note that you can not delete a paid Payrun or a Payrun on credit.

An explicitly created Payrun can always be deleted while it is still empty, even on credit. Use this to undo a Payrun you created for Payouts that were never created.

### HTTP Request

`DELETE https://api.gigapay.com/v2/payruns/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.

