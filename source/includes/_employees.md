# Employees

An Employee is an individual performing tasks within your organization, employed or sub-contracted by Gigapay. To add an Employee to your
organization you can create an Employee object. The Employee will be notified and Gigapay will verify their identity
and working permits.

### The Employee object

> An example Employee object:

```json
{
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "latest_status": "active",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": "2019-05-22T10:32:37.846274Z",
    "claimed_at": "2019-05-23T11:56:41.123721Z",
    "verified_at": "2019-05-23T11:57:03.742345Z",
    "invitation_code": null
}
```

| Attribute          | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `id`               | Unique identifier for the object.                                                 |
| `name`             | The full name of the Employee.                                                    |
| `email`            | Email address of the Employee.                                                    |
| `country`          | Employee's country of residence. ISO-3166 country code.                           |
| `cellphone_number` | The Employees cellphone number, including country code.                           |
| `latest_status`    | `created` - An employee record has been created<br>`not_invited` - Invitation has not been sent<br>`invited` - An invitation has been sent to the employee<br>`onboarding` - The employee has accepted the invitation and is completing the onboarding process<br>`active` - employee has completed onboarding and is ready to receive payouts |
| `metadata`         | JSON-encoded metadata.                                                            |
| `created_at`       | Time at which the Employee was created at. Displayed as ISO 8601 string.          |
| `notified_at`      | Time at which the Employee was notified.  Displayed as ISO 8601 string.           |
| `claimed_at`       | Time at which the Employee consumed the magic link. Displayed as ISO 8601 string. |
| `verified_at`      | Time when the Employee was verified. Displayed as ISO 8601 string.                |
| `invitation_code`  | 8-digit alphanumeric uppercase code available when an employee is invited but not yet claimed. Users can use this code to create a magic link to claim the employee. |




## List All Employees

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/employees/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
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
    "previous": "https://api.gigapay.se/v2/employees/?page=2",
    "results": [
        {
            "id": "1847",
            "name": "Albin Lindskog",
            "email": "albin@gigapay.co",
            "cellphone_number": "+46703000000",
            "country": "SWE",
            "latest_status": "active",
            "metadata": {},
            "created_at": "2019-05-22T10:32:36.118753Z",
            "notified_at": "2019-05-22T10:32:37.846274Z",
            "claimed_at": "2019-05-23T11:56:41.123721Z",
            "verified_at": "2019-05-23T11:57:03.742345Z",
            "invitation_code": null
        }, {
            "id": "1848",
            "name": "Joakim Olovsson",
            "email": "joakim@gigapay.co",
            "cellphone_number": "+46703000001",
            "country": "SWE",
            "latest_status": "invited",
            "metadata": {},
            "created_at": "2019-05-23T14:45:12.545271Z",
            "notified_at": "2019-05-23T14:45:13.374627Z",
            "claimed_at": null,
            "verified_at": null,
            "invitation_code": "A1B2C3D4"
        }
    ]
}
```

This endpoint retrieves all Employees.

### HTTP Request

`GET https://api.gigapay.se/v2/employees/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### Query Parameters

| Parameter                 | Default | Description                                        |
|---------------------------|---------|----------------------------------------------------|
| `page`                    | 1       | Which page to return.                              |
| `page_size`               | 25      | The number of Employees per page.                  |
| `created_at`              |         | Timestamp filter.                                  |
| `notified_at`             |         | Timestamp filter.                                  |
| `claimed_at`              |         | Timestamp filter.                                  |
| `verified_at`             |         | Timestamp filter.                                  |
| `search`                  |         | Filter by part of name, email or cellphone number. |

## Register an Employee

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/employees/',
    json={
        'id': 1847,
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000001',
        'email': 'albin@mail.com',
        'country': 'SWE'
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
    method: "POST",
    body: JSON.stringify({
        name: "Albin Lindskog",
        cellphone_number: "+4670000000",
        email: "albin@mail.com",
        country: "SWE"
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
    "id": "14585989-9a6c-4f05-b251-69e38e85d324",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "latest_status": "created",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": null,
    "claimed_at": null,
    "verified_at": null,
    "invitation_code": "A1B2C3D4"
}
```

This endpoint registers an Employee. The Employee will be notified with the `invitation_code` that can be used to sign up in Gigapay and accept your invitation.

### HTTP Request

`POST https://api.gigapay.se/v2/employees/`

### Headers

| Parameter         | Required | Description               |
|-------------------|----------|---------------------------|
| `Authorization`   | True     | Your Authorization Token. |
| `Integration-ID`  | True     | Integration id.           |
| `Idempotency-key` | False    | Idempotency key.          |

### Body Parameters

| Parameter          | Type   | Required | Default | Notes                                                           |
| ------------------ | ------ | -------- | ------- | --------------------------------------------------------------- |
| `id`               | String | False    | uuid4() | Unique per [Integration](#integrations).                        |
| `name`             | String | True     |         |                                                                 |
| `email`            | String | True     |         |                                                                 |
| `country`          | String | True     |         | ISO-3166 country code where the employee is living and working. |
| `cellphone_number` | String | False    | null    |                                                                 |
| `metadata`         | Object | False    | {}      |                                                                 |

## Retrieve an Employee

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/employees/1847/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/employees/1847/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/", {
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "latest_status": "active",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": "2019-05-22T10:32:37.846274Z",
    "claimed_at": "2019-05-23T11:56:41.123721Z",
    "verified_at": "2019-05-23T11:57:03.742345Z",
    "invitation_code": null
}
```

This endpoint retrieves an employee.

### HTTP Request

`GET https://api.gigapay.se/v2/employees/:id/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
|-----------|----------|-----------------------------------|
| `id`      | True     | Unique identifier for the object. |

## Update an Employee

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/employees/1847/',
    json={
        'id': 8472,
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": 8472}' https://api.gigapay.se/v2/employees/1847/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/", {
    method: "PATCH",
    body: JSON.stringify({id: 8472}),
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
    "id": "8472",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "latest_status": "active",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": "2019-05-22T10:32:37.846274Z",
    "claimed_at": "2019-05-23T11:56:41.123721Z",
    "verified_at": "2019-05-23T11:57:03.742345Z",
    "invitation_code": null
}
```

This endpoint updates an Employee.

### HTTP Request

`PATCH https://api.gigapay.se/v2/employees/:id/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
|-----------|----------|-----------------------------------|
| `id`      | True     | Unique identifier for the object. |

### Body Parameters

| Parameter          | Type   | Required | Default         | Notes                                                           |
|--------------------|--------|----------|-----------------|-----------------------------------------------------------------|
| `id`               | String | False    | Previous value. | Unique per [Integration](#integrations).                        |
| `name`             | String | False    | Previous value. |                                                                 |
| `email`            | String | False    | Previous value. |                                                                 |
| `country`          | String | False    | Previous value. | ISO-3166 country code where the employee is living and working. |
| `cellphone_number` | False  | False    | Previous value. |                                                                 |
| `metadata`         | Object | False    | Previous value. |                                                                 |

## Replace an Employee

```python
import requests

response = requests.put(
    'https://api.gigapay.se/v2/employees/8472/',
    json={
        'id': 1847,
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000001',
        'email': 'albin@mail.com',
        'country': 'SWE'
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": 1847, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "email": "albin@mail.com", "country": "SWE"}' https://api.gigapay.se/v2/employees/8472/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/8472/", {
    method: "PUT",
    body: JSON.stringify({
        id: 1847,
        name: "Albin Lindskog",
        cellphone_number: "+4670000000",
        email: "albin@mail.com",
        country: "SWE"
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
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@gigapay.co",
    "cellphone_number": "+46703000000",
    "country": "SWE",
    "latest_status": "not_invited",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": null,
    "claimed_at": null,
    "verified_at": null,
    "invitation_code": null
}
```

This endpoint replaces an Employee.

### HTTP Request

`PUT https://api.gigapay.se/v2/employees/:id/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
|-----------|----------|-----------------------------------|
| `id`      | True     | Unique identifier for the object. |

### Body Parameters

| Parameter          | Type   | Required | Default | Description                                                     |
| ------------------ | ------ | -------- | ------- | --------------------------------------------------------------- |
| `id`               | String | False    | uuid4() | Unique per [Integration](#integrations).                        |
| `name`             | String | True     |         |                                                                 |
| `email`            | String | True     |         |                                                                 |
| `country`          | String | True     |         | ISO-3166 country code where the employee is living and working. |
| `cellphone_number` | String | False    | null    |                                                                 |
| `metadata`         | Object | False    | {}      |                                                                 |

## Delete a Employee

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/employees/1847/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/employees/1847/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
})
```

> The above command returns an empty response.


This endpoint deletes an Employee. You can not delete an Employee after a Payout has been registered to it.

### HTTP Request

`DELETE https://api.gigapay.se/v2/employees/:id/`

### Headers

| Parameter        | Required | Description               |
|------------------|----------|---------------------------|
| `Authorization`  | True     | Your Authorization Token. |
| `Integration-ID` | True     | Integration id.           |

### URL Parameters

| Parameter | Required | Description                       |
|-----------|----------|-----------------------------------|
| `id`      | True     | Unique identifier for the object. |

## Resend an Invitation

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/employees/1847/resend/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b',
        'Idempotency-key': 'ac4beffd-79b0-4561-b16c-846a9600b168'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -H 'Idempotency-key: ac4beffd-79b0-4561-b16c-846a9600b168' https://api.gigapay.se/v2/employees/1847/resend/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/1847/resend/", {
    method: "PATCH",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
        "Idempotency-key": "ac4beffd-79b0-4561-b16c-846a9600b168"
    }
})
```

> The above command returns an empty response.


This endpoint resends a notification with an invitation code. After resending, you need to wait at least 24 hours before resending again.

### HTTP Request

`PATCH https://api.gigapay.se/v2/employees/:id/resend/`

### Headers

| Parameter         | Required | Description               |
|-------------------|----------|---------------------------|
| `Authorization`   | True     | Your Authorization Token. |
| `Integration-ID`  | True     | Integration id.           |
| `Idempotency-key` | False    | Idempotency key.          |

### URL Parameters

| Parameter | Required | Description                       |
|-----------|----------|-----------------------------------|
| `id`      | True     | Unique identifier for the object. |
