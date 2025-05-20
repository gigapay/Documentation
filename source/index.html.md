---
title: API Documentation | Gigapay

language_tabs: # must be one of https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers
  - shell
  - python
  - javascript

toc_footers:
  - Questions? Ask us!
  - <a href='mailto:support@gigapay.se'>support@gigapay.se</a>

includes:
  - integrations
  - employees
  - messages
  - payouts
  - pricing
  - invoices
  - payment_terms
  - webhooks

search: true

code_clipboard: true

meta:
  - name: description
    content: Find the all the information you need to implement the Gigapay API here. Simple and fast to integrate.
  - name: og:image
    content: "https://uploads-ssl.webflow.com/63e63a988110ab2d23f167eb/66193bd79ff1a32e6eaa25ce_api_docs_gigapay_2x.webp"
---

# API Reference

The Gigapay API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded requests,
returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

### API server

<div class="serverSelect">
  <div>
    <input type="radio" id="prod" name="server" value="https:///api.gigapay.se/v2/"
           checked>
    <label for="prod">
      <a href="https:///api.gigapay.se/v2/" >https://api.gigapay.se/v2/</a> <span class="serverSelectExplanation">- Production server</span>
    </label>
  </div>
  
  <div>
    <input type="radio" id="demo" name="server" value="https:///api.demo.gigapay.se/v2/">
    <label for="demo">
      <a href="https:///api.demo.gigapay.se/v2/">https://api.demo.gigapay.se/v2/</a> <span class="serverSelectExplanation">- Demo server</span>
    </label>
  </div>
</div>

The demo version serves as a test environment for developers working to integrate with our API. No money flows
through the demo environment.

### Browsable API

Both the live and demo environment render a human-friendly HTML output for each resource, when the HTML format is
requested by a web browser. This allows for easy browsing and interaction with the available resources. We strongly
recommend you test our Browsable API before starting to integrate with our API, as it will give you a far more
intuitive understanding of the API compared to reading this documentation.

# Authentication

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' https://api.gigapay.se/v2/

```

```javascript
fetch("https://api.gigapay.se/v2/", {
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

The Gigapay API uses API keys to identify and authenticate requests. You can request a key by contacting us at
[support@gigapay.se](mailto:support@gigapay.se). Note that you will receive separate keys for the live and demo environment.

Your API keys carry many privileges, so make sure you keep them secure. Do not share your API keys in
publicly accessible areas such as GitHub, client-side code, etc.

Authorization to the API is performed through a token-based HTTP Authentication scheme. To authorize requests,
include your key in the `Authorization` HTTP header. Note that the API key should be prefixed by the string literal
`Token`, with whitespace separating the two strings.

To specify which [Integration](#integrations) you are acting as you need to provide the `Integration-ID` header.

### Tokens

<div class="tokenSelect">
  <label for="auth">Authentication Token:
    <div class="authInput">
      <span>Token: </span>
      <input type="text" id="auth" name="auth" placeholder="cd7a4537a231356d404b553f465b6af2fa035821">
    </div>
  </label>
  
  <label for="integration">Integration ID:
    <div class="integrationInput">
      <input type="text" id="integration" name="integration" placeholder="79606358-97af-4196-b64c-5f719433d56b">
    </div>
  </label>

  <p class="TokenExplanation">Replacing the above tokens with your own will add them to the provided code examples, making them executable.
</p>
</div>

### Unauthenticated Requests

API requests without valid authentication will fail with the HTTP response code `401`. If you are getting unexpected
`401` responses, ensure that your URL is correct. API calls made over plain HTTP will be redirected with the response
code `301`, and API calls with incorrect placed `/` will be redirected with the response code `307` to the correct URL,
and most HTTP clients will automatically follow the redirects while stripping out the authorization headers, resulting
in the `401` response. Disable automated redirects or be mindful of this.

### IP-whitelisting

The Gigapay API Supports IP-whitelisting. When requesting API-keys, let us know if you want to only allow access from certain IP addresses.
If IP-whitelisting is enabled, API requests made from a non-whitelisted IP will be rejected with HTTP
response code `403`.

### Language

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b',
        'Accept-Language': 'sv',
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -H "Accept-Language: en" https://api.gigapay.se/v2/

```

```javascript
fetch("https://api.gigapay.se/v2/", {
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
    "Accept-Language": "sv",
  },
});
```

The default language of the API is English. This document is written assuming you have the language set to English.
To change language set the `Accept-Language` header to your preferred language.

# Events

> An example Employee object with event timestamps:

```json
{
  "id": "25d2af38-59b9-4f73-9452-51787fed5c84",
  "name": "Karl Karlsson",
  "cellphone_number": null,
  "email": "karl.karlsson@gmail.com",
  "metadata": {},
  "created_at": "2019-05-20T15:33:08.974624Z",
  "notified_at": "2019-05-20T15:33:12.581720Z",
  "claimed_at": "2019-05-21T09:13:32.575721Z",
  "verified_at": "2019-05-21T09:13:48.625263Z",
  "invitation_code": null
}
```

The Gigapay API is driven by actions taken by the parties involved in each Payout; the Client making the Payout,
Gigapay facilitating it, and the Employee receiving it. The flowchart below illustrates each of these actions and
the corresponding events.

[ ![](events.svg) ](images/events.svg)

Note that the Employee and Payout flow typically occur in parallel as the Employee is usually created when, or close in
time to when, their first Payout is created.

All objects are timestamped when an associated event occurs. The field is simply the name of the event suffixed
with `_at`.

## Subscribing to Events

> An example webhook for the `Employee.verified` event:

```http
POST https://jobmatchr.se/webhooks/employees/ HTTP/1.1
Content-Type: application/json
Gigapay-Signature: t=1583327301,v1=ad583e2b2093c8d6fb3b65e04b99fc5988e98c0c312909acad334072da7e99ec
...

{
    "id": "25d2af38-59b9-4f73-9452-51787fed5c84",
    "name": "Karl Karlsson",
    "cellphone_number": null,
    "email": "karl.karlsson@gmail.com",
    "metadata": {
        "user_id": 3
    },
    "created_at": "2019-05-20T15:33:08.974624Z",
    "notified_at": "2019-05-20T15:33:12.581720Z",
    "claimed_at": "2019-05-21T09:13:32.575721Z",
    "verified_at": "2019-05-21T09:13:48.625263Z",
    "invitation_code": null
}
```

The Gigapay API allows you to register [Webhooks](#webhooks) in order to receive real-time updates on events related
to your Gigapay account. They are optional, but the preferred way of monitoring the status of objects. We can send callbacks
on the following events:

- `Employee.created`
- `Employee.notified`
- `Employee.claimed`
- `Employee.verified`
- `Payout.created`
- `Payout.notified`
- `Payout.accepted`
- `Invoice.created`
- `Invoice.paid`

The notifications simply contain the object that triggered the event, as represented in the API.

### Gigapay Signature

> Example code to verify a Gigapay Signature:

```shell
secret_key = '...asId'

# If you're doing this in shell; parse the request manually:
timestamp='...'
signature='...'
body='...'

payload=${timestamp}.${body}

calculated_signature=$(echo -n $payload | openssl dgst -sha256 -hmac $secret_key)

if [ $signature == $calculated_signature ]; then
    ...
fi
```

```python
import hmac

secret_key = '...asId'

t, v1 = request.headers['Gigapay-Signature'].split(',')
timestamp = t.split('=')[1]
signature = v1.split('=')[1]

payload = timestamp + '.' + request.body

hmac.new(secret_key.encode('utf-8'), digestmod='sha256')
hmac.update(payload.encode('utf-8'))
calculated_signature = hmac.hexdigest()

hmac.compare_digest(signature, calculated_signature)
```

```javascript
import hmacSHA512 from "crypto-js/hmac-sha512";

let secret_key = "...asId";

let [t, v1] = request.get("Gigapay-Signature").split(",");
let timestamp = t.split("=")[1];
let signature = v1.split("=")[1];

let payload = timestamp + "." + request.body;

let calculated_signature = hmacSHA512(payload, secret_key);

calculated_signature === signature;
```

The notification is signed using the `secret_key` for the [Webhooks](#webhooks), the signature is included in the
notification as a `Gigapay-Signature` header. This allows you to verify that the events were sent by Gigapay, and not
by a third party.

The signature consists of two parameters;

`t`, the timestamp of when the notification was sent, and;

`v` the signature of the current scheme.

The only valid signature scheme is currently `v1`, which is the HMAC algorithm as described in
[RFC 2104](https://datatracker.ietf.org/doc/html/rfc2104.html) using SHA256 as digestmod.

To verify signatures using the v1 scheme, extract the timestamp from the Gigapay-Signature header, and the JSON-encoded
notification from the request body. Join these strings with a period, `.`, as a separator. Compute an HMAC with the
SHA256 hash function using the Webhook's secret key as the key. Lastly ensure that the signature in the header and the
calculated signature matches.

# Errors

```http
HTTP/1.1 405 Method Not Allowed
Allow: GET, HEAD, OPTIONS
...

{"detail":"Method \"DELETE\" not allowed."}
```

Gigapay uses HTTP response codes to indicate whether an API request was successful. Codes in the `2XX` range indicate
success; codes in the `4XX` range indicate that the request failed, given the information provided; codes in the
`5XX` range indicate an error with Gigapay's servers. Response codes in the `4XX` range generally indicate a client
error and will as such include information in the body of the response describing the cause of the error.

```http
HTTP/1.1 400 Bad Request
...

{"description": ["This field may not be blank."]}
```

Validation errors returned on otherwise valid requests are structured differently. They will respond with the
status code `400`and include the field names as the keys in the response. If the validation error was not specific
to a particular field then the `non_field_errors` key will be used.

# Expanding objects

> Request to retrieve a Payout object with the related Employee object expanded:

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/9472/?expand=employee',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' 'https://api.gigapay.se/v2/payouts/9472/?expand=employee'
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/9472/?expand=employee", {
  method: "GET",
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> Returns a response formatted as such:

```json
{
  "id": "9472",
  "amount": "760.92",
  "cost": "1020.00",
  "currency": "SEK",
  "description": "Instagram samarbete 2021-11-13.",
  "employee": {
    "id": "1847",
    "name": "Albin Lindskog",
    "email": "albin@mail.com",
    "cellphone_number": "+46700000001",
    "country": "SWE",
    "metadata": {},
    "created_at": "2019-05-22T10:32:36.118753Z",
    "notified_at": null,
    "claimed_at": null,
    "verified_at": null,
    "invitation_code": "ABCD1234"
  },
  "invoice": "c1554d88-b74f-4d6a-bfa6-049c14905dc7",
  "invoiced_amount": "1000.00",
  "metadata": {
    "campaign_id": 12394
  },
  "start_at": null,
  "end_at": null,
  "created_at": "2019-05-23T10:32:38.118753Z",
  "notified_at": null,
  "accepted_at": null
}
```

Many objects contain the identifier of a related object in their response properties. For example, a
[Payout](#payouts) has an associated [Employee](#employees) identifier. Those objects can be
expanded inline with the `expand` request parameter. Objects that can be expanded are noted in this documentation.
You can use the `expand` param on any endpoint which includes expandable fields, including the create endpoints.
You can expand multiple objects at once by repeating the `expand` request parameter.

# Pagination

> Request to retrieve two Employee objects per page, and the second page:

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/employees/?page_size=2&page=2',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' 'https://api.gigapay.se/v2/employees/?page_size=2&page=2'
```

```javascript
fetch("https://api.gigapay.se/v2/employees/?page_size=2&page=2", {
  method: "GET",
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> Returns a response formatted as such:

```json
{
  "count": 17,
  "next": "https://api.gigapay.se/v2/employees/?page=3",
  "previous": "https://api.gigapay.se/v2/employees/?page=1",
  "results": [
    {
      "id": "1f1d1263-0e79-4787-b573-6df81b44bfc2",
      "name": "Albin Lindskog",
      "cellphone_number": "+46703000000",
      "email": null,
      "metadata": {
        "user_id": 2
      },
      "created_at": "2019-05-20T15:33:08.974624Z",
      "notified_at": "2019-05-20T15:33:12.581720Z",
      "claimed_at": "2019-05-21T09:13:32.575721Z",
      "verified_at": "2019-05-21T09:13:48.625263Z",
      "invitation_code": null
    },
    {
      "id": "25d2af38-59b9-4f73-9452-51787fed5c84",
      "name": "Karl Karlsson",
      "cellphone_number": null,
      "email": "karl.karlsson@gmail.com",
      "metadata": {
        "user_id": 3
      },
      "created_at": "2019-05-20T15:33:08.974624Z",
      "notified_at": "2019-05-20T15:33:12.581720Z",
      "claimed_at": null,
      "verified_at": null,
      "invitation_code": "ABCD1234"
    }
  ]
}
```

The Gigapay API uses pagination on all of its list-endpoints. These endpoints all share a common structure, optionally
accepting `page` and a `page_size` request parameter. `page` specifies which page to return and `page_size` the number
of objects per page. The objects returned are contained within the `result` field of the response.

# Filtering

> Request to retrieve all non-accepted Payouts belonging to a specific Employee:

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/?employee=12&accepted_at_null=True',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' 'https://api.gigapay.se/v2/payouts/?employee=12&accepted_at_null=True'
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/?employee=12&accepted_at_null=True", {
  method: "GET",
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> Returns a response formatted as such:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "0177270d-f94b-4ab9-88ba-ac1fa2f791aa",
      "amount": "100.00",
      "cost": "137.99",
      "currency": "SEK",
      "description": "Lön genom Gigapay",
      "employee": "12",
      "invoice": "bab4b830-47d6-4a24-a460-3289897f6e8e",
      "metadata": {},
      "start_at": null,
      "end_at": null,
      "created_at": "2019-05-22T10:32:38.118753Z",
      "notified_at": "2019-05-22T10:38:19.874623Z",
      "accepted_at": null
    }
  ]
}
```

> Request to retrieve all employees with string "skoog" in name, email or phone number:

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/employees/?search=skoog',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' 'https://api.gigapay.se/v2/employees/?search=skoog'
```

```javascript
fetch("https://api.gigapay.se/v2/employees/?search=skoog", {
  method: "GET",
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> Returns a response formatted as such:

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "59cc997d-b4bc-4b2d-ac2d-0101ea9ba241",
      "name": "Joakim Karlsson",
      "cellphone_number": "+46703100002",
      "email": "skoog@gigapay.co",
      "country": "SWE",
      "metadata": {},
      "created_at": "2022-04-11T13:05:27.565954Z",
      "notified_at": "2022-04-11T13:05:27.565954Z",
      "claimed_at": "2022-04-11T13:05:27.565954Z",
      "verified_at": "2022-04-11T14:05:27.565954Z",
      "invitation_code": null
    },
    {
      "id": "481c3138-5710-4086-9237-a082e87d624f",
      "name": "Joakim Skoog",
      "cellphone_number": "+46703100001",
      "email": "joakims@gigapay.co",
      "country": "SWE",
      "metadata": {},
      "created_at": "2022-04-11T13:05:27.543935Z",
      "notified_at": "2022-04-11T13:05:27.543935Z",
      "claimed_at": "2022-04-11T13:05:27.543935Z",
      "verified_at": "2022-04-11T14:05:27.543935Z",
      "invitation_code": null
    }
  ]
}
```

> Request to retrieve all payouts to employees with string "skoog" in name, email or phone number or with string "skoog" in the description of the payout:

```python
import requests

response = requests.get(
    'https://api.gigapay.se/v2/payouts/?search=skoog',
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X GET -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' 'https://api.gigapay.se/v2/payouts/?search=skoog'
```

```javascript
fetch("https://api.gigapay.se/v2/payouts/?search=skoog", {
    method: "GET",
    headers: {
        "Authorization": "Token cd7a4537a231356d404b553f465b6af2fa035821",
        "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b"
    }
}
```

> Returns a response formatted as such:

```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "bfdac591-4bc5-45d3-9e93-27a885c8b130",
      "cost": "1396.32",
      "invoiced_amount": "1368.95",
      "amount": "1000.00",
      "currency": "SEK",
      "description": "Test",
      "metadata": {},
      "start_at": null,
      "end_at": null,
      "created_at": "2022-04-14T08:31:11.773275Z",
      "notified_at": null,
      "accepted_at": null,
      "employee": {
        "id": "411246da-0b59-41c6-8b87-1e5abb73af30",
        "name": "Kalle Karlsson",
        "cellphone_number": "+46703100003",
        "email": "skoog@gigapay.co",
        "country": "SWE",
        "metadata": {},
        "created_at": "2022-04-14T08:31:11.741713Z",
        "notified_at": "2022-04-14T08:31:11.741713Z",
        "claimed_at": "2022-04-14T08:31:11.741713Z",
        "verified_at": "2022-04-14T09:31:11.741713Z",
        "invitation_code": null
      },
      "invoice": "f4377884-e4c0-4e65-bbd1-24f52973b933",
      "full_salary_specification": false
    },
    {
      "id": "1bc53e19-3589-4f92-aece-360006cfe196",
      "cost": "1396.32",
      "invoiced_amount": "1368.95",
      "amount": "1000.00",
      "currency": "SEK",
      "description": "Test",
      "metadata": {},
      "start_at": null,
      "end_at": null,
      "created_at": "2022-04-14T08:31:11.763167Z",
      "notified_at": null,
      "accepted_at": null,
      "employee": {
        "id": "411246da-0b59-41c6-8b87-1e5abb73af30",
        "name": "Kalle Karlsson",
        "cellphone_number": "+46703100003",
        "email": "skoog@gigapay.co",
        "country": "SWE",
        "metadata": {},
        "created_at": "2022-04-14T08:31:11.741713Z",
        "notified_at": "2022-04-14T08:31:11.741713Z",
        "claimed_at": "2022-04-14T08:31:11.741713Z",
        "verified_at": "2022-04-14T09:31:11.741713Z",
        "invitation_code": null
      },
      "invoice": "b749b0fd-a82a-4644-a7c8-e89ae891cc23",
      "full_salary_specification": false
    },
    {
      "id": "bf216a95-0560-46c8-b9c7-0d15850aea23",
      "cost": "1396.32",
      "invoiced_amount": "1368.95",
      "amount": "1000.00",
      "currency": "SEK",
      "description": "Test",
      "metadata": {},
      "start_at": null,
      "end_at": null,
      "created_at": "2022-04-14T08:31:11.755175Z",
      "notified_at": null,
      "accepted_at": null,
      "employee": {
        "id": "1fa40cc7-a2c9-43ab-972f-eb322bded992",
        "name": "Joakim Skoog",
        "cellphone_number": "+46703100002",
        "email": "joakim@gigapay.co",
        "country": "SWE",
        "metadata": {},
        "created_at": "2022-04-14T08:31:11.707438Z",
        "notified_at": "2022-04-14T08:31:11.707438Z",
        "claimed_at": "2022-04-14T08:31:11.707438Z",
        "verified_at": "2022-04-14T09:31:11.707438Z",
        "invitation_code": null
      },
      "invoice": "e5647953-4df7-4166-9066-f9dea11b66f3",
      "full_salary_specification": false
    }
  ]
}
```

The Gigapay API supports filtering on all of its list-endpoints. These filters are of two types, either relational
filters or timestamp filters. Which filters are available are described under each endpoint.

Relational filters filter out all objects belonging to a specified object.
They are use the format `{field_name}={object_id}`.

Timestamp filters are used to filter out objects having had a certain event associated with them. They can be used to
filter on whether an event has occurred with the `null` suffix, e.g. `{field_name}_null={Bool}`, or when, by using the
`_before` and `_after` suffix, e.g. `{field_name}_before={ISO 8601 string}`.

# Idempotency

> Registering an Employee with an idempotency key

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/employees/',
    json={
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000000',
        'country': 'SWE',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Idempotency-Key': 'afjkakkknbkasaskkaksdakjdnsakja',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Idempotency-Key': 'afjkakkknbkasaskkaksdakjdnsakja' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"name": "Albin Lindskog", "cellphone_number": "+4670000001", "country": "SWE"}' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
  method: "POST",
  body: JSON.stringify({
    name: "Albin Lindskog",
    cellphone_number: "+4670000000",
    country: "SWE",
  }),
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Content-Type": "application/json",
    "Idempotency-Key": "afjkakkknbkasaskkaksdakjdnsakja",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

The Gigapay API supports idempotency to safely retry requests without accidentally performing the same operation twice.
Gigapay offers two mechanism of idempotency; idempotency keys and object ids.

To perform an idempotent request using an idempotency-key, provide the additional `Idempotency-Key` header to the
request. Idempotency keys works by storing the responses of previous requests. Subsequent requests with the same key
return the same response, without performing the action specified in the request. Keys expire after 24 hours, so a new
response is generated if a key is reused outside that timeframe.

> Registering an Employee with a specific id

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/employees/',
    json={
        'id': 19472,
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000000',
        'country': 'SWE',
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Idempotency-Key': 'afjkakkknbkasaskkaksdakjdnsakja' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"id": 19472, "name": "Albin Lindskog", "cellphone_number": "+4670000001", "country": "SWE"}' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
  method: "POST",
  body: JSON.stringify({
    id: 19472,
    name: "Albin Lindskog",
    cellphone_number: "+4670000000",
    country: "SWE",
  }),
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Content-Type": "application/json",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

To perform an idempotent request using an object id simply specify the id when creating the object. Object ids ensure
idempotency when creating object as no objects can have the same id. Subsequent requests with the same id will return
an error. The uniqueness of an id is guaranteed for the lifetime of the object.

# Metadata

> Registering an Employee with metadata:

```python
import requests

response = requests.post(
    'https://api.gigapay.se/v2/employees/',
    json={
        'name': 'Albin Lindskog',
        'cellphone_number': '+4670000000',
        'country': 'SWE',
        'metadata': {
            'user_id': 1847,
        },
    },
    headers={
        'Authorization': 'Token cd7a4537a231356d404b553f465b6af2fa035821',
        'Integration-ID': '79606358-97af-4196-b64c-5f719433d56b'
    }
)
```

```shell
curl -X POST -H 'Authorization: Token cd7a4537a231356d404b553f465b6af2fa035821' -H 'Content-Type: application/json' -H 'Integration-ID: 79606358-97af-4196-b64c-5f719433d56b' -d '{"name": "Albin Lindskog", "cellphone_number": "+4670000001", "country": "SWE", "metadata": {"user_id": 1847}}' https://api.gigapay.se/v2/employees/
```

```javascript
fetch("https://api.gigapay.se/v2/employees/", {
  method: "POST",
  body: JSON.stringify({
    name: "Albin Lindskog",
    cellphone_number: "+4670000000",
    country: "SWE",
    metadata: {
      user_id: 1847,
    },
  }),
  headers: {
    Authorization: "Token cd7a4537a231356d404b553f465b6af2fa035821",
    "Content-Type": "application/json",
    "Integration-Id": "79606358-97af-4196-b64c-5f719433d56b",
  },
});
```

> Response:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Albin Lindskog",
  "email": null,
  "cellphone_number": "+46703000000",
  "country": "SWE",
  "metadata": {
    "user_id": 1847
  },
  "created_at": "2019-05-22T10:32:36.118753Z",
  "notified_at": null,
  "claimed_at": null,
  "verified_at": null,
  "invitation_code": "ABCD1234"
}
```

All objects in the Gigapay API have a `metadata` attribute. You can use this attribute to attach any
JSON-serializable data to these objects. It is useful for storing additional information about an object. For example,
you could store a unique identifier for an Employee in your system. This data is not used by Gigapay, and will not be
displayed to any users.

The [Payout](#payouts) object also has a `description` field. It should contain a human-readable description of why
this Payout is being made. Unlike `metadata`, `description` is a single string, and the Employee will see it.
