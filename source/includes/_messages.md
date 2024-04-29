# Messages

A Message is a one way communication object between the Integration and its Employee objects.

To issue a message to an employee or multiple employees, you can create a Message object and
include a list of employees that should receive it.

Once the Message object is created, the relevant Employees will see it in the gigapay app in their home view.

### The Message object

> An example Message object:

```json
{
  "id": "3d5356ee-6943-4d10-8060-967d3180b79d",
  "employees": [
    "9c9c19a6-bb64-4c53-8dc1-516033390092",
    "a5384a47-ee2b-4a5e-be29-969fac195be7"
  ],
  "content": "The February payment is delayed",
  "created_at": "2024-03-22T10:32:36.118753Z"
}
```

| Attribute    | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `id`         | Unique identifier for the object.                                       |
| `employees`  | A list of employees that will see the Message content.                  |
| `content`    | The Message content to be displayed to the employees.                   |
| `created_at` | Time at which the Message was created at. Displayed as ISO 8601 string. |

## List All Messages

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/messages/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/messages/
```

```javascript
fetch("https://api.gigapay.se/v2/messages/", {
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> The above command returns JSON structured like this:

```json
{
  "count": 4,
  "next": null,
  "previous": "https://api.gigapay.se/v2/messages/?page=2",
  "results": [
    {
      "id": "2a241017-80af-467a-a3e1-50a6321a2adc",
      "created_at": "2024-03-27T08:34:32.802625Z",
      "employees": [
        "9119e535-ef85-4a0e-a7ba-d46dddd58c3b",
        "fafef424-cf39-4ada-a8a1-8b085738d64a"
      ],
      "content": "January payment is underway"
    },
    {
      "id": "f9a57847-5d28-43dc-a748-365f6d487084",
      "created_at": "2024-03-27T08:35:05.070901Z",
      "employees": [
        "74fb03a0-d890-45fc-972b-8562b8d9acbe",
        "ee6100b2-7d80-4c1d-b251-19e961f7fc9f",
        "ba6162b0-e949-44c4-92ec-f65cc3f64a8c",
        "56a34d0e-068f-4f56-9663-a36095751b9b"
      ],
      "content": "Your application is incomplete"
    }
  ]
}
```

This endpoint retrieves all Messages.

### HTTP Request

`GET https://api.gigapay.se/v2/messages/`

### Headers

| Parameter        | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### Query Parameters

| Parameter   | Default | Description                      |
| ----------- | ------- | -------------------------------- |
| `page`      | 1       | Which page to return.            |
| `page_size` | 25      | The number of Messages per page. |

## Create a Message

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/messages/',
    json={
        'employees': ['74fb03a0-d890-45fc-972b-8562b8d9acbe'],
        'content': 'Payment in progress',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"employees": ["74fb03a0-d890-45fc-972b-8562b8d9acbe"], "content": "Payment in progress"}' https://api.gigapay.se/v2/messages/
```

```javascript
fetch("https://api.gigapay.se/v2/messages/", {
  method: "POST",
  body: JSON.stringify({
    employees: ["74fb03a0-d890-45fc-972b-8562b8d9acbe"],
    content: "Payment in progress",
  }),
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Content-Type": "application/json",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> The above command returns JSON structured like this:

```json
{
  "id": "e9e3c146-83d9-4080-b719-091719d90629",
  "employees": ["74fb03a0-d890-45fc-972b-8562b8d9acbe"],
  "content": "Payment in progress",
  "created_at": "2024-03-22T10:32:36.118753Z"
}
```

This endpoint creates a Message.

### HTTP Request

`POST https://api.gigapay.se/v2/messages/`

### Headers

| Parameter         | Required | Description               |
| ----------------- | -------- | ------------------------- |
| `Authorization`   | True     | Your Authorization Token. |
| `Integration-ID`  | True     | Integration id.           |
| `Idempotency-key` | False    | Idempotency key.          |

### Body Parameters

| Parameter   | Type   | Required | Notes                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `employees` | List   | True     | A list of employee ids                                |
| `content`   | String | True     | The Message content to be displayed to the employees. |

## Retrieve a Message

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/
```

```javascript
fetch(
  "https://api.gigapay.se/v2/message/e9e3c146-83d9-4080-b719-091719d90629/",
  {
    headers: {
      Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
      "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
    },
  },
);
```

> The above command returns JSON structured like this:

```json
{
  "id": "e9e3c146-83d9-4080-b719-091719d90629",
  "employees": ["74fb03a0-d890-45fc-972b-8562b8d9acbe"],
  "content": "Payment in progress",
  "created_at": "2024-03-22T10:32:36.118753Z"
}
```

This endpoint retrieves a Message.

### HTTP Request

`GET https://api.gigapay.se/v2/messages/:id/`

### Headers

| Parameter        | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
| --------- | -------- | --------------------------------- |
| `id`      | True     | Unique identifier for the object. |

## Update a Message

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/',
    json={
        'content': 'Correction: payment is delayed by 1 day',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"content": "Correction: payment is delayed by 1 day"}' https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/
```

```javascript
fetch(
  "https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/",
  {
    method: "PATCH",
    body: JSON.stringify({
      content: "Correction: payment is delayed by 1 day",
    }),
    headers: {
      Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
      "Content-Type": "application/json",
      "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
    },
  },
);
```

> The above command returns JSON structured like this:

```json
{
  "id": "e9e3c146-83d9-4080-b719-091719d90629",
  "employees": ["74fb03a0-d890-45fc-972b-8562b8d9acbe"],
  "content": "Correction: payment is delayed by 1 day",
  "created_at": "2024-03-22T10:32:36.118753Z"
}
```

This endpoint updates a Message.

### HTTP Request

`PATCH https://api.gigapay.se/v2/messages/:id/`

### Headers

| Parameter        | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
| --------- | -------- | --------------------------------- |
| `id`      | True     | Unique identifier for the object. |

### Body Parameters

| Parameter   | Type   | Required | Notes                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `employees` | List   | False    | A list of employee ids                                |
| `content`   | String | False    | The Message content to be displayed to the employees. |

## Replace a Message

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/messages/8472/',
    json={
      'employees': ['74fb03a0-d890-45fc-972b-8562b8d9acbe', '696f4143-1579-4352-9e9c-a0cf09df7b3f'],
      'content': 'Payment 664 and 566 in progress',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"employees": ["74fb03a0-d890-45fc-972b-8562b8d9acbe", "696f4143-1579-4352-9e9c-a0cf09df7b3f"],"content": "Payment 664 and 566 in progress"}' https://api.gigapay.se/v2/messages/8472/
```

```javascript
fetch("https://api.gigapay.se/v2/messages/8472/", {
  method: "PUT",
  body: JSON.stringify({
    employees: [
      "74fb03a0-d890-45fc-972b-8562b8d9acbe",
      "696f4143-1579-4352-9e9c-a0cf09df7b3f",
    ],
    content: "Payment 664 and 566 in progress",
  }),
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Content-Type": "application/json",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> The above command returns JSON structured like this:

```json
{
  "id": "e9e3c146-83d9-4080-b719-091719d90629",
  "employees": [
    "74fb03a0-d890-45fc-972b-8562b8d9acbe",
    "696f4143-1579-4352-9e9c-a0cf09df7b3f"
  ],
  "content": "Payment 664 and 566 in progress",
  "created_at": "2024-03-23T10:32:36.118753Z"
}
```

This endpoint replaces a Message.

### HTTP Request

`PUT https://api.gigapay.se/v2/messages/:id/`

### Headers

| Parameter        | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
| --------- | -------- | --------------------------------- |
| `id`      | True     | Unique identifier for the object. |

### Body Parameters

| Parameter   | Type   | Required | Description                                           |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `employees` | List   | True     | A list of employee ids                                |
| `content`   | String | True     | The Message content to be displayed to the employees. |

## Delete a Message

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/
```

```javascript
fetch(
  "https://api.gigapay.se/v2/messages/e9e3c146-83d9-4080-b719-091719d90629/",
  {
    method: "DELETE",
    headers: {
      Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
      "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
    },
  },
);
```

> The above command returns an empty response.

This endpoint deletes a Message.

### HTTP Request

`DELETE https://api.gigapay.se/v2/messages/:id/`

### Headers

| Parameter        | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
| --------- | -------- | --------------------------------- |
| `id`      | True     | Unique identifier for the object. |
