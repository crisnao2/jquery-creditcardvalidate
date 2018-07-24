(function() {
/*
  jQuery Credit Card Validator 0.1 derived by https://github.com/PawelDecowski/jquery-creditcardvalidator
  Card Bin extracted by https://gist.github.com/erikhenrique/5931368
  
  Copyright 2018 Cristiano Soares
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software
  is furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  IN THE SOFTWARE.
   */

  $ = jQuery;

  $.fn.creditCardValidate = function(callback, options) {
      var card_types, card_type, card, j, i, len, len_range;
      var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      card_types = [
      {
          name: 'visa',
          range: [4],
          valid_length: [13, 14, 15, 16, 17, 18, 19],
          valid_length_cvv: [3]
      }, {
          name: 'uatp',
          range: [1],
          valid_length: [15],
          valid_length_cvv: [3]
      }, {
          name: 'amex',
          range: [34,37],
          valid_length: [15],
          valid_length_cvv: [4]
      }, {
          name: 'diners',
          range: [36,30],
          valid_length: [14],
          valid_length_cvv: [3]
      }, {
          name: 'jcb',
          range: [35],
          valid_length: [16],
          valid_length_cvv: [3]
      }, {
          name: 'hipercard',
          range: [38, 60],
          valid_length: [19],
          valid_length_cvv: [3]
      }, {
          name: 'mastercard',
          range: [51,52,53,54,55,22],
          valid_length: [16],
          valid_length_cvv: [3]
      }, {
          name: 'maestro',
          range: [50, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
          valid_length: [12, 13, 14, 15, 16, 17, 18, 19],
          valid_length_cvv: [3]
      }, {
          name: 'laser',
          range: [6304, 6706, 6709, 6771],
          valid_length: [16, 17, 18, 19],
          valid_length_cvv: [3]
      }, {
          name: 'visa_electron',
          range: [4026, 417500, 4508, 4844, 4913, 4917],
          valid_length: [16],
          valid_length_cvv: [3]
      }, {
          name: 'discover',
          range: [6011, 622, 644, 65],
          valid_length: [16],
          valid_length_cvv: [4]
      }, {
          name: 'dankort',
          range: [5019],
          valid_length: [16],
          valid_length_cvv: [3]
      }, {
          name: 'elo',
          range: [636368,636369,438935,504175,451416,636297,5067,4576,4011,506699],
          valid_length: [16],
          valid_length_cvv: [3]
      }
      ];

      if (typeof callback !== 'function') {
          throw Error("callback Expected one functoin");
      }

      var is_valid_luhn = function(number) {
          var digit, k, len1, n, ref1, sum;
          sum = 0;
          ref1 = number.split('').reverse();
          for (n = k = 0, len1 = ref1.length; k < len1; n = ++k) {
              digit = ref1[n];
              digit = +digit;
              if (n % 2) {
              digit *= 2;
              if (digit < 10) {
                  sum += digit;
              } else {
                  sum += digit - 9;
              }
              } else {
              sum += digit;
              }
          }

          return sum % 10 === 0;
      };

      var is_valid_length = function(number, card_type) {
          return indexOf.call(card_type.valid_length, number.length) >= 0;
      };

      var validate = (function(_this) {
          return function() {
              var number = normalize($(_this).val());
              var length_valid = false;
              var luhn_valid = false;

              for (j = 0, len = card_types.length; j < len; j++) {
                  var card = card_types[j];
                  for (i = 0, len_range = card.range.length; i < len_range; i++) {
                      var start = card.range[i];
                      if (number.indexOf(start) == 0) {
                          card_type = card;
                      }
                  }
              }

              if (card_type != null) {
                  luhn_valid = is_valid_luhn(number);
                  length_valid = is_valid_length(number, card_type);
              }

              return {
                  card_type: card_type,
                  valid: luhn_valid && length_valid,
                  luhn_valid: luhn_valid,
                  length_valid: length_valid
              };
          };
      })(this);

      normalize = function(number) {
          return number.replace(/[^\d]/g, '');
      };

      this.on('input.ccv', (function(_this) {
          return function() {
              return callback.call(_this, validate());
          };
      })(this));
  };
}).call(this);