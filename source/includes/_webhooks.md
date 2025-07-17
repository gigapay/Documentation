# Webhooks

Webhooks allows you to receive real-time status updates any time an event happens on your account. For a complete
description of these notifications, see [Events](#events).

In the case where the receiving server is unavailable, we will retry the webhook notification up to 10 times with an exponential backoff.

### The Webhook object

> An example Webhook object

```json
{
    "id": "38a93e19-886a-4246-9cfe-471214ff6739",
    "url": "https://jobmatchr.se/webhooks/payouts/",
    "events": ["Payout.notified", "Payout.accepted"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

| Attribute    | Description                                        |
| ------------ | -------------------------------------------------- |
| `id`         | Unique identifier for the object.                  |
| `url`        | URL to which the notifications are posted.         |
| `events`     | List of events to subscribe to.                    |
| `secret_key` | Secret key used to sign the Webhook notifications. |
| `metadata`   | JSON-encoded metadata.                             |





## List All Registered Webhooks

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/webhooks/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/webhooks/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/", {
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
    "previous": "https://api.gigapay.se/v2/webhooks/?page=2",
    "results": [
        {
            "id": "38a93e19-886a-4246-9cfe-471214ff6739",
            "url": "https://jobmatchr.se/webhooks/payouts/",
            "events": ["Payout.notified", "Payout.accepted"],
            "secret_key": "c1329a085d65f7757838df5920fdcc9a",
            "metadata": {}
        }, {
            "id": "0630bfcf-ad0a-458a-9794-816b54b542b6",
            "url": "https://jobmatchr.se/webhooks/employees/",
            "events": ["Employee.verified"],
            "secret_key": "1fc0ee40ecf33f83cbd3f930443074ca",
            "metadata": {}
        }
    ]
}
```

This endpoint retrieves all webhooks.

### HTTP Request

`GET https://api.gigapay.se/v2/webhooks/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Webhooks per page.





## Register a Webhook

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/webhooks/',
    json={
        'url': 'https://jobmatchr.se/webhooks/payouts/', 
        'events': ['Payout.created']
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"url": "http://0.0.0.0:8000/", "events": ["Payout.created"]}' https://jobmatchr.se/webhooks/payouts/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/", {
    method: "POST",
    body: JSON.stringify({url: "https://jobmatchr.se/webhooks/payouts/", events: ["Payout.created"]}),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "38a93e19-886a-4246-9cfe-471214ff6739",
    "url": "https://jobmatchr.se/webhooks/payouts/",
    "events": ["Payout.created"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

This endpoint creates a webhook.

### HTTP Request

`POST https://api.gigapay.se/v2/webhooks/`

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
`url` | URL | True |  | 
`events` | String[] | True | | 
`secret_key` | String | False | 32 char random string | 
`metadata` | Object | False | {} |





## Retrieve a Webhook

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/webhooks/481272/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "38a93e19-886a-4246-9cfe-471214ff6739",
    "url": "https://jobmatchr.se/webhooks/payouts/",
    "events": ["Payout.created"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

This endpoint retrieves a webhook.

### HTTP Request

`GET https://api.gigapay.se/v2/webhooks/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.

### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.






## Update a Webhook

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/webhooks/481272/',
    json={
        'events': ['Payout.created', 'Payout.notified']
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"events": ["Payout.created", "Payout.notified"]}' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    method: "PATCH",
    body: JSON.stringify({events: ["Payout.created", "Payout.notified"]}),
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
    "id": "481272",
    "url": "https://jobmatchr.se/webhooks/payouts/",
    "events": ["Payout.created", "Payout.notified"],
    "secret_key": "c1329a085d65f7757838df5920fdcc9a",
    "metadata": {}
}
```

This endpoint updates a webhook.

### HTTP Request

`PATCH https://api.gigapay.se/v2/webhooks/:id/`

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
`url` | URL | False | Previous value |
`events` | String[] | False | Previous value | 
`secret_key` | String | False |Previous value | 
`metadata` | Object | False | Previous value |




## Replace a Webhook

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/webhooks/481272/',
    json={
        'url': 'https://jobmatchr.se/webhooks/payruns/', 
        'events': ['Payrun.created']
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"url": "https://jobmatchr.se/webhooks/payruns/", "events": ["Payrun.created"]}' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    method: "PUT",
    body: JSON.stringify({url: "https://jobmatchr.se/webhooks/payruns/", events: ["Payrun.created"]}),
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
    "id": "481272",
    "url": "https://jobmatchr.se/webhooks/payruns/",
    "events": ["Payrun.created"],
    "secret_key": "vksnrsc6tamq73tc26rzrnzf33a4pgdv",
    "metadata": {}
}
```

```json
{
    "id": "481272",
    "url": "https://jobmatchr.se/webhooks/payruns/",
    "events": ["Payrun.created"],
    "secret_key": "vksnrsc6tamq73tc26rzrnzf33a4pgdv",
    "metadata": {}
}
```

This endpoint replaces a webhook.

### HTTP Request

`PUT https://api.gigapay.se/v2/webhooks/:id/`

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

Parameter | Type | Required | Default | Description
--------- | ---- | -------- | ------- |------------
`id` | String | False | uuid4() | Unique per [Integration](#integrations).
`url` | URL | True |  | 
`events` | String[] | True | | 
`secret_key` | String | False | 32 char random string | 
`metadata` | Object | False | {} | 





## Delete a Webhook

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/webhooks/481272/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/webhooks/481272/
```

```javascript
fetch("https://api.gigapay.se/v2/webhooks/481272/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


This endpoint deletes a webhook.

### HTTP Request

`DELETE https://api.gigapay.se/v2/webhooks/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.
`Integration-ID` | True | Integration id.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
