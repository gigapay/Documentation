//= require ../lib/_jquery

function wrapDynamicContent() {
  dynamicServerNames();
  dynamicAuthenticationToken();
  dynamicIntegrationId();
}

/*
When the page has loaded we wrap all occurrences of the server name with a <span/> then we attach
an event_handler to the serverSelect in index.html.md. This allows us the user to change between
the prod and demo server in the documentation.
 */
function dynamicServerNames() {
  var input = $('input[type=radio]');
  var placeholder = 'https://api.gigapay.com/v2/';
  var value = $('input[type=radio]:checked')[0].value.replace('///', '//');  // remove escaping necessary in .md file

  var span = document.createElement('span');
  span.className = 'hostServer';
  span.innerHTML = value || placeholder;

  $("code").each(function() {
    if (this.innerText.includes(placeholder)) {
      this.innerHTML = this.innerHTML.replaceAll(placeholder, span.outerHTML);
    }
  });

  input.click(function() {
    var choice = this.value.replace('///', '//');
    $(".hostServer").map(function() {
      this.innerText = choice;
    })
  });
}

/*
Then we do the same for the Authentication Token input.
 */
function dynamicAuthenticationToken() {
  var inputs = $('#auth')
  var placeholder =  inputs[0].placeholder
  var value = inputs[0].value

  var span = document.createElement('span');
  span.className = 'authenticationToken';
  span.innerHTML = value || placeholder;

  $("code").each(function() {
    if (this.innerText.includes(placeholder)) {
      this.innerHTML = this.innerHTML.replaceAll(placeholder, span.outerHTML);
    }
  });

  inputs.on('input', function() {
    var value = this.value;
    $(".authenticationToken").map(function() {
      this.innerText = value ? value : placeholder;
    })
  });
}

/*
And the Integration ID input.
 */
function dynamicIntegrationId() {
  var inputs = $('#integration');
  var placeholder =  inputs[0].placeholder
  var value = inputs[0].value

  var span = document.createElement('span');
  span.className = 'integrationToken';
  span.innerHTML = value || placeholder;

  $("code").each(function() {
    if (this.innerText.includes(placeholder)) {
      this.innerHTML = this.innerHTML.replaceAll(placeholder, span.outerHTML);
    }
  });

  inputs.on('input', function() {
    var value = this.value;
    $(".integrationToken").map(function() {
      this.innerText = value ? value : placeholder;
    })
  });
}
