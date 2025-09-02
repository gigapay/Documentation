# Registrations

A registration holds all the necessary legal and contact information for a company. The registration object represents the onboarding state of a company, from creation (onboarding started) to approved (onboarding complete).

Once a registration is submitted (object created), it will be reviewed by the Gigapay team. Upon approval, an `Integration` is automatically created with the same id as the `integration_id` specified in the object.

You can always create and view registrations associated with your account. You can also update and delete registrations as long as the registrations has not been approved yet.


### The Registration object

> An example Registration object:

```json
{
    "id": "1f2c22ed-88e5-457d-b9a8-2ab511d5a8d9",
    "integration_id": "b6e1a18b-621b-465c-9371-9b9344c2b9c8",
    "needs_review": false,
    "tin_number": "18785153",
    "vat_number": "DK18785153",
    "registered_name": "Zerebra AB",
    "friendly_name": "Zerebra AB",
    "address_line_1": "Malmvägen 8",
    "address_line_2": "",
    "state": null,
    "zip_code": "14171",
    "city": "Segeltorp",
    "email": "faktura@zerebra.com",
    "phone_number": "+46703000000",
    "country": "DNK",
}
```


| Attribute | Description |
| --- | --- |
| `id` | A unique identifier for the registration object. |
| `integration_id` | A unique identifier for the integration object that will be created from this registration. If not provided during creation, it will be auto-generated. This ID must be unique for each registration managed by a user. |
| `email` | The contact email address for the company. |
| `phone_number` | The contact phone number for the company. |
| `friendly_name` | The company's display name or brand name. |
| `registered_name` | The legally registered name of the company. |
| `tin_number` | The company's Tax Identification Number. |
| `vat_number` | The company's Value Added Tax number, if applicable. |
| `country` | The 3-letter ISO code for the country where the company is registered. Cannot be 'SWE'. |
| `state` | The state, province, or territory, where applicable (e.g., for US, CA, AU). |
| `address_line_1` | The primary line of the company's address. |
| `address_line_2` | The secondary line of the company's address. |
| `zip_code` | The postal or zip code for the company's address. |
| `city` | The city for the company's address. |
| `needs_review` | A read-only flag indicating if the registration is pending review by Gigapay. |


## List All Registrations

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/registrations/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' https://api.gigapay.se/v2/registrations/
```

```javascript
fetch("https://api.gigapay.se/v2/registrations/", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
  }
})
```

> The above command returns JSON structured like this:

```json
{
    "count": 2,
    "next": null,
    "previous": "https://api.gigapay.se/v2/registrations/?page=1",
    "results": [
        {
            "id": "1f2c22ed-88e5-457d-b9a8-2ab511d5a8d9",
            "integration_id": "b6e1a18b-621b-465c-9371-9b9344c2b9c8",
            "needs_review": false,
            "tin_number": "18785153",
            "vat_number": "DK18785153",
            "registered_name": "Zerebra AB",
            "friendly_name": "Zerebra AB",
            "address_line_1": "Malmvägen 8",
            "address_line_2": "",
            "state": null,
            "zip_code": "14171",
            "city": "Segeltorp",
            "email": "faktura@zerebra.com",
            "phone_number": "+46703000000",
            "country": "DNK",
        },
        {
            "id": "8347fdd5-688d-4267-ae42-864b34a4220b",
            "integration_id": "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
            "needs_review": true,
            "tin_number": "18785161",
            "vat_number": "DK18785161",
            "registered_name": "Zebrebra AB",
            "friendly_name": "Zebrebra AB",
            "address_line_1": "Malmövägen 8",
            "address_line_2": "",
            "state": null,
            "zip_code": "14172",
            "city": "Segeltorps",
            "email": "faktura@zebrebra.com",
            "phone_number": "+46703000001",
            "country": "DNK",
        },
    ]
}
```

This endpoint retrieves all Registrations.

### HTTP Request

`GET https://api.gigapay.se/v2/registrations/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
`page` | 1 | Which page to return.
`page_size` | 25 | The number of Registrations per page.


## Register a Registration

```python
import requests
response = requests.post(
    'https://api.gigapay.se/v2/registrations/',
    json={
        'integration_id': "e50d4871-a3e0-4a41-b99a-6c7d4acd07c6",
        'email': 'contact@example.com',
        'phone_number': '+4570123456',
        'tin_number': '18785161',
        'vat_number': 'DK18785161',
        'registered_name': 'Example Company ApS',
        'friendly_name': 'Example Company',
        'address_line_1': 'Nørrebrogade 20',
        'zip_code': '2200',
        'city': 'Copenhagen',
        'country': 'DNK',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -d '{
    "integration_id": "e50d4871-a3e0-4a41-b99a-6c7d4acd07c6",
    "email": "contact@example.com",
    "phone_number": "+4570123456",
    "tin_number": "18785161",
    "vat_number": "DK18785161",
    "registered_name": "Example Company ApS",
    "friendly_name": "Example Company",
    "address_line_1": "Nørrebrogade 20",
    "zip_code": "2200",
    "city": "Copenhagen",
    "country": "DNK"
}' https://api.gigapay.se/v2/registrations/
```

```javascript
fetch("https://api.gigapay.se/v2/registrations/", {
    method: "POST",
    body: JSON.stringify({
        integration_id: "e50d4871-a3e0-4a41-b99a-6c7d4acd07c6",
        email: 'contact@example.com',
        phone_number: '+4570123456',
        tin_number: '18785161',
        vat_number: 'DK18785161',
        registered_name: 'Example Company ApS',
        friendly_name: 'Example Company',
        address_line_1: 'Nørrebrogade 20',
        zip_code: '2200',
        city: 'Copenhagen',
        country: 'DNK',
    }),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json",
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "e50d4871-a3e0-4a41-b99a-6c7d4acd07c6",
    "integration_id": "e50d4871-a3e0-4a41-b99a-6c7d4acd07c6",
    "needs_review": true,
    "tin_number": "12345658",
    "vat_number": "DK12345658",
    "registered_name": "Example Company ApS",
    "friendly_name": "Example Company",
    "address_line_1": "Nørrebrogade 20",
    "address_line_2": "",
    "state": null,
    "zip_code": "2200",
    "city": "Copenhagen",
    "email": "contact@example.com",
    "phone_number": "+4570123456",
    "country": "DNK"
}
```

This endpoint creates a Registration.

### HTTP Request

`POST https://api.gigapay.se/v2/registrations/`

### Headers

| Parameter | Required | Description |
| --- | --- | --- |
| `Authorization` | True | Your Authorization Token. |

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`integration_id` | String | False | uuid4() | Unique per registration. Also, user cannot have more than one integration with the same `integration_id`.
`email` | String | True | |
`phone_number` | String | True | |
`friendly_name` | String | True | |
`registered_name` | String | True | |
`tin_number` | String | True | | Must be a valid number for the country.
`vat_number` | String | False | | Must be a valid number for the country. Will return an error if required for the supplied country.
`country` | String | True | | Cannot be 'SWE'.
`state` | String | False | | Only required for countries that have states, provinces, or territories (e.g., for US, CA, AU).
`address_line_1` | String | True | |
`address_line_2` | String | False | |
`zip_code` | String | True | |
`city` | String | True | |



## Retrieve a Registration

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/
```

```javascript
fetch("https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/", {
  headers: {
    "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821"
  }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "8347fdd5-688d-4267-ae42-864b34a4220b",
    "integration_id": "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
    "needs_review": true,
    "tin_number": "18785161",
    "vat_number": "DK18785161",
    "registered_name": "Zebrebra AB",
    "friendly_name": "Zebrebra AB",
    "address_line_1": "Malmövägen 8",
    "address_line_2": "",
    "state": null,
    "zip_code": "14172",
    "city": "Segeltorps",
    "email": "faktura@zebrebra.com",
    "phone_number": "+46703000001",
    "country": "DNK"
}
```

This endpoint retrieves a Registration.

### HTTP Request

`GET https://api.gigapay.se/v2/registrations/:id/`

### Headers

| Parameter | Required | Description |
| --- | --- | --- |
| `Authorization` | True | Your Authorization Token. |

### URL Parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `id` | True | Unique identifier for the object. |

## Update a Registration

```python
import requests

response = requests.patch(
    'https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/',
    json={
      'friendly_name': 'Zerebra Inc.',
      'email': 'billing@zerebra.com'
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821'
    }
)
```

```shell
curl -X PATCH -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -d '{"friendly_name": "Zerebra Inc.", "email": "billing@zerebra.com"}' https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/
```

```javascript
fetch("https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/", {
    method: "PATCH",
    body: JSON.stringify({'friendly_name': 'Zerebra Inc.', 'email': 'billing@zerebra.com'}),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json"
    },
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "8347fdd5-688d-4267-ae42-864b34a4220b",
    "integration_id": "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
    "needs_review": true,
    "tin_number": "18785161",
    "vat_number": "DK18785161",
    "registered_name": "Zebrebra AB",
    "friendly_name": "Zerebra Inc.",
    "address_line_1": "Malmövägen 8",
    "address_line_2": "",
    "state": null,
    "zip_code": "14172",
    "city": "Segeltorps",
    "email": "billing@zerebra.com",
    "phone_number": "+46703000001",
    "country": "DNK"
}
```

This endpoint updates a Registration.
A registration can only be updated if the `needs_review` field is set to `true`, meaning the registration has not been approved yet.

### HTTP Request

`PATCH https://api.gigapay.se/v2/registrations/:id/`

### Headers

| Parameter | Required | Description |
| --- | --- | --- |
| `Authorization` | True | Your Authorization Token. |

### URL Parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `id` | True | Unique identifier for the object. |

### Body Parameters

Parameter | Type | Required | Default | Notes
--------- | ---- | -------- | ------- |------------
`integration_id` | String | False | uuid4() | Unique per registration. Also, user cannot have more than one integration with the same `integration_id`.
`email` | String | True | |
`phone_number` | String | True | |
`friendly_name` | String | True | |
`registered_name` | String | True | |
`tin_number` | String | True | | Must be a valid number for the country.
`vat_number` | String | False | | Must be a valid number for the country. Will return an error if required for the supplied country.
`country` | String | True | | Cannot be 'SWE'.
`state` | String | False | | Only required for countries that have states, provinces, or territories (e.g., for US, CA, AU).
`address_line_1` | String | True | |
`address_line_2` | String | False | |
`zip_code` | String | True | |
`city` | String | True | |


## Replace a Registration

```python
import requests
response = requests.put(
    'https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/',
    json={
        'integration_id': "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
        'email': 'billing@example.com',
        'phone_number': '+4570987654',
        'tin_number': '18785161',
        'vat_number': 'DK18785161',
        'registered_name': 'Example Company ApS',
        'friendly_name': 'Example Company',
        'address_line_1': 'Vesterbrogade 40',
        'zip_code': '1620',
        'city': 'Copenhagen',
        'country': 'DNK',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821'
    }
)
```

```shell
curl -X PUT -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -d '{
    "integration_id": "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
    "email": "billing@example.com",
    "phone_number": "+4570987654",
    "tin_number": "18785161",
    "vat_number": "DK18785161",
    "registered_name": "Example Company ApS",
    "friendly_name": "Example Company",
    "address_line_1": "Vesterbrogade 40",
    "zip_code": "1620",
    "city": "Copenhagen",
    "country": "DNK"
}' https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/
```

```javascript
fetch("https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/", {
    method: "PUT",
    body: JSON.stringify({
        integration_id: "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
        email: 'billing@example.com',
        phone_number: '+4570987654',
        tin_number: '18785161',
        vat_number: 'DK18785161',
        registered_name: 'Example Company ApS',
        friendly_name: 'Example Company',
        address_line_1: 'Vesterbrogade 40',
        zip_code: '1620',
        city: 'Copenhagen',
        country: 'DNK',
    }),
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Content-Type": "application/json"
    }
})
```

> The above command returns JSON structured like this:

```json
{
    "id": "8347fdd5-688d-4267-ae42-864b34a4220b",
    "integration_id": "cc7e24d0-5e43-4bd5-806a-27b0df5f419a",
    "needs_review": true,
    "tin_number": "18785161",
    "vat_number": "DK18785161",
    "registered_name": "Example Company ApS",
    "friendly_name": "Example Company",
    "address_line_1": "Vesterbrogade 40",
    "address_line_2": "",
    "state": null,
    "zip_code": "1620",
    "city": "Copenhagen",
    "email": "billing@example.com",
    "phone_number": "+4570987654",
    "country": "DNK"
}
```

This endpoint replaces a Registration completely.
A registration can only be replaced if the `needs_review` field is set to `true`, meaning the registration has not been approved yet.

### HTTP Request

`PUT https://api.gigapay.se/v2/registrations/:id/`

### Headers

| Parameter | Required | Description |
| --- | --- | --- |
| `Authorization` | True | Your Authorization Token. |

### URL Parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `id` | True | Unique identifier for the object. |

### Body Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `integration_id` | String | False | uuid4() | Unique per registration. |
| `email` | String | True | | |
| `phone_number` | String | True | | |
| `friendly_name` | String | True | | |
| `registered_name` | String | True | | |
| `tin_number` | String | True | | Must be a valid number for the country. |
| `vat_number` | String | False | | Must be a valid number for the country. Will return an error if required for the supplied country. |
| `country` | String | True | | Cannot be 'SWE'. |
| `state` | String | False | | Only required for countries that have states, provinces, or territories (e.g., for US, CA, AU). |
| `address_line_1` | String | True | | |
| `address_line_2` | String | False | | |
| `zip_code` | String | True | | |
| `city` | String | True | | |


## Delete a Registration

```python
import requests

response = requests.delete(
    'https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821'
    }
)
```

```shell
curl -X DELETE -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/
```

```javascript
fetch("https://api.gigapay.se/v2/registrations/8347fdd5-688d-4267-ae42-864b34a4220b/", {
    method: "DELETE",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821"
    }
})
```

> The above command returns an empty response.


This endpoint deletes a Registration.
A registration can only be deleted if the `needs_review` field is set to `true`, meaning the registration has not been approved yet.

### HTTP Request

`DELETE https://api.gigapay.se/v2/registrations/:id/`

### Headers

Parameter | Required | Description
--------- | ------- | -----------
`Authorization` | True | Your Authorization Token.


### URL Parameters

Parameter | Required | Description
--------- | ------- | -----------
`id` | True | Unique identifier for the object.
