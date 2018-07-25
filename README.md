# jQuery Credit Card Validate

jQuery Credit Card Validate detects and validates credit card numbers. It’ll tell you the detected credit card type and whether the number length and Luhn checksum are valid for the type of card.

## Usage
```javascript
$({{ INPUT }}).validateCreditCard(function(result)
{
    console.log(result['card_type']['name']);
    console.log(result['card_type']['range']);
    console.log(result['card_type']['valid_length']);
    console.log(result['card_type']['valid_length_cvv']);
    console.log(result['valid']);
    console.log(result['luhn_valid']);
    console.log(result['length_valid']);
});
```
# Download

https://raw.githubusercontent.com/crisnao2/jquery-creditcardvalidate/master/jquery.creditCardValidate.js

# CDN

https://cdn.jsdelivr.net/gh/crisnao2/jquery-creditcardvalidate@v0.1/build/jquery.creditCardValidate.js