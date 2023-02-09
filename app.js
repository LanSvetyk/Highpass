"use strict";

var burger = document.querySelector(".burger");
var menu = document.querySelector(".header__nav");
var headerBurger = document.querySelector('.header__burger');
var menulinks = menu.querySelectorAll(".nav__link");
var btnClose = document.querySelector('.header__btn-close');
burger.addEventListener("click", function () {
  headerBurger.style.display = "none";
  burger.style.display = "none";
  menu.classList.toggle("header__nav-active");
  document.body.classList.toggle("stop-scroll");
  btnClose.style.display = "block";
});
btnClose.addEventListener("click", function () {
  headerBurger.style.display = "block";
  burger.style.display = "block";
  menu.classList.toggle("header__nav-active");
  document.body.classList.toggle("stop-scroll");
  btnClose.style.display = "none";
});
menulinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger-active");
    menu.classList.remove("header__nav-active");
    document.body.classList.remove("stop-scroll");
  });
});
"use strict";

function _typeof2(obj) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof2(obj); }
function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
  return _typeof2(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof2(e);
};
!function () {
  for (var e = ["DocumentType", "Element", "CharacterData"], t = function t() {
      null != this.parentNode && this.parentNode.removeChild(this);
    }, i = 0; i < e.length; i++) {
    var r = e[i];
    window[r] && !window[r].prototype.remove && (window[r].prototype.remove = t);
  }
}(), function (e) {
  function t() {}
  function i(e, t) {
    return function () {
      e.apply(t, arguments);
    };
  }
  function r(e) {
    if ("object" !== _typeof(this)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], u(e, this);
  }
  function n(e, t) {
    for (; 3 === e._state;) {
      e = e._value;
    }
    return 0 === e._state ? void e._deferreds.push(t) : (e._handled = !0, void r._immediateFn(function () {
      var i = 1 === e._state ? t.onFulfilled : t.onRejected;
      if (null === i) return void (1 === e._state ? o : s)(t.promise, e._value);
      var r;
      try {
        r = i(e._value);
      } catch (n) {
        return void s(t.promise, n);
      }
      o(t.promise, r);
    }));
  }
  function o(e, t) {
    try {
      if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
      if (t && ("object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) || "function" == typeof t)) {
        var n = t.then;
        if (t instanceof r) return e._state = 3, e._value = t, void a(e);
        if ("function" == typeof n) return void u(i(n, t), e);
      }
      e._state = 1, e._value = t, a(e);
    } catch (o) {
      s(e, o);
    }
  }
  function s(e, t) {
    e._state = 2, e._value = t, a(e);
  }
  function a(e) {
    2 === e._state && 0 === e._deferreds.length && r._immediateFn(function () {
      e._handled || r._unhandledRejectionFn(e._value);
    });
    for (var t = 0, i = e._deferreds.length; t < i; t++) {
      n(e, e._deferreds[t]);
    }
    e._deferreds = null;
  }
  function l(e, t, i) {
    this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = i;
  }
  function u(e, t) {
    var i = !1;
    try {
      e(function (e) {
        i || (i = !0, o(t, e));
      }, function (e) {
        i || (i = !0, s(t, e));
      });
    } catch (r) {
      if (i) return;
      i = !0, s(t, r);
    }
  }
  var d = setTimeout;
  r.prototype["catch"] = function (e) {
    return this.then(null, e);
  }, r.prototype.then = function (e, i) {
    var r = new this.constructor(t);
    return n(this, new l(e, i, r)), r;
  }, r.all = function (e) {
    var t = Array.prototype.slice.call(e);
    return new r(function (e, i) {
      function r(o, s) {
        try {
          if (s && ("object" === ("undefined" == typeof s ? "undefined" : _typeof(s)) || "function" == typeof s)) {
            var a = s.then;
            if ("function" == typeof a) return void a.call(s, function (e) {
              r(o, e);
            }, i);
          }
          t[o] = s, 0 === --n && e(t);
        } catch (l) {
          i(l);
        }
      }
      if (0 === t.length) return e([]);
      for (var n = t.length, o = 0; o < t.length; o++) {
        r(o, t[o]);
      }
    });
  }, r.resolve = function (e) {
    return e && "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && e.constructor === r ? e : new r(function (t) {
      t(e);
    });
  }, r.reject = function (e) {
    return new r(function (t, i) {
      i(e);
    });
  }, r.race = function (e) {
    return new r(function (t, i) {
      for (var r = 0, n = e.length; r < n; r++) {
        e[r].then(t, i);
      }
    });
  }, r._immediateFn = "function" == typeof setImmediate && function (e) {
    setImmediate(e);
  } || function (e) {
    d(e, 0);
  }, r._unhandledRejectionFn = function (e) {
    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
  }, r._setImmediateFn = function (e) {
    r._immediateFn = e;
  }, r._setUnhandledRejectionFn = function (e) {
    r._unhandledRejectionFn = e;
  }, "undefined" != typeof module && module.exports ? module.exports = r : e.Promise || (e.Promise = r);
}(window), function (e) {
  e.Promise || (e.Promise = Promise);
  var t = "required",
    i = "email",
    r = "minLength",
    n = "maxLength",
    o = "password",
    s = "zip",
    a = "phone",
    l = "remote",
    u = "strength",
    d = "function",
    c = function c(e, t) {
      if ("string" == typeof e) return e;
      var i = "post" === t.toLowerCase() ? "" : "?";
      return Array.isArray(e) ? i + e.map(function (e) {
        return e.name + "=" + e.value;
      }).join("&") : i + Object.keys(e).map(function (t) {
        return t + "=" + e[t];
      }).join("&");
    },
    h = function h(e) {
      var t = e.url,
        i = e.method,
        r = e.data,
        n = e.debug,
        o = e.callback,
        s = e.error;
      if (n) return void o("test");
      var a = e.async !== !1,
        l = new XMLHttpRequest(),
        u = c(r, "get"),
        d = null;
      "post" === i.toLowerCase() && (d = c(r, "post"), u = ""), l.open(i, t + u, a), l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), l.onreadystatechange = function () {
        4 === this.readyState && (200 === this.status ? o(this.responseText) : s && s(this.responseText));
      }, l.send(d);
    },
    f = function f(e, t) {
      this.options = t || {}, this.rules = this.options.rules || {}, this.messages = this.options.messages || void 0, this.colorWrong = this.options.colorWrong || "#B81111", this.result = {}, this.elements = [], this.tooltip = this.options.tooltip || {}, this.tooltipFadeOutTime = this.tooltip.fadeOutTime || 5e3, this.tooltipFadeOutClass = this.tooltip.fadeOutClass || "just-validate-tooltip-hide", this.tooltipSelectorWrap = document.querySelectorAll(this.tooltip.selectorWrap).length ? document.querySelectorAll(this.tooltip.selectorWrap) : document.querySelectorAll(".just-validate-tooltip-container"), this.bindHandlerKeyup = this.handlerKeyup.bind(this), this.submitHandler = this.options.submitHandler || void 0, this.invalidFormCallback = this.options.invalidFormCallback || void 0, this.promisesRemote = [], this.isValidationSuccess = !1, this.focusWrongField = this.options.focusWrongField || !1, this.REGEXP = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        zip: /^\d{5}(-\d{4})?$/,
        phone: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
        password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
        strengthPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/
      }, this.DEFAULT_REMOTE_ERROR = "Error", this.state = {
        tooltipsTimer: null
      }, this.setForm(document.querySelector(e));
    };
  f.prototype = {
    defaultRules: {
      email: {
        required: !0,
        email: !0
      },
      name: {
        required: !0,
        minLength: 3,
        maxLength: 15
      },
      text: {
        required: !0,
        maxLength: 300,
        minLength: 5
      },
      password: {
        required: !0,
        password: !0,
        minLength: 4,
        maxLength: 8
      },
      zip: {
        required: !0,
        zip: !0
      },
      phone: {
        phone: !0
      }
    },
    defaultMessages: {
      required: "The field is required",
      email: "Please, type a valid email",
      maxLength: "The field must contain a maximum of :value characters",
      minLength: "The field must contain a minimum of :value characters",
      password: "Password is not valid",
      remote: "Email already exists",
      strength: "Password must contents at least one uppercase letter, one lowercase letter and one number",
      "function": "Function returned false"
    },
    handlerKeyup: function handlerKeyup(e) {
      var t = e.target,
        i = {
          name: t.getAttribute("data-validate-field"),
          value: t.value
        };
      delete this.result[i.name], this.validateItem({
        name: i.name,
        value: i.value,
        group: [],
        isKeyupChange: !0
      }), this.renderErrors();
    },
    setterEventListener: function setterEventListener(e, t, i, r) {
      switch ("keyup" === t && (i = this.bindHandlerKeyup), r) {
        case "add":
          e.addEventListener(t, i);
          break;
        case "remove":
          e.removeEventListener(t, i);
      }
    },
    getElementsRealValue: function getElementsRealValue() {
      for (var e = this.$form.querySelectorAll("*"), t = void 0, i = {}, r = 0, n = e.length; r < n; ++r) {
        if (t = e[r].getAttribute("name")) {
          if ("checkbox" === e[r].type) {
            i[t] = e[r].checked;
            continue;
          }
          i[t] = e[r].value;
        }
      }
      return i;
    },
    validationFailed: function validationFailed() {
      this.invalidFormCallback && this.invalidFormCallback(this.result);
      var e = document.querySelector(".js-validate-error-field");
      this.focusWrongField && e && e.focus && e.focus();
    },
    validationSuccess: function validationSuccess() {
      if (0 === Object.keys(this.result).length) {
        if (this.isValidationSuccess = !1, this.submitHandler) {
          var e = this.getElementsRealValue();
          return void this.submitHandler(this.$form, e, h);
        }
        this.$form.submit();
      }
    },
    setForm: function setForm(e) {
      var t = this;
      this.$form = e, this.$form.setAttribute("novalidate", "novalidate"), this.$form.addEventListener("submit", function (e) {
        return e.preventDefault(), t.result = [], t.getElements(), t.promisesRemote.length ? void Promise.all(t.promisesRemote).then(function () {
          t.promisesRemote = [], t.isValidationSuccess ? t.validationSuccess() : t.validationFailed();
        }) : void (t.isValidationSuccess ? t.validationSuccess() : t.validationFailed());
      });
    },
    isEmail: function isEmail(e) {
      return this.REGEXP.email.test(e);
    },
    isZip: function isZip(e) {
      return this.REGEXP.zip.test(e);
    },
    isPhone: function isPhone(e) {
      return this.REGEXP.phone.test(e);
    },
    isPassword: function isPassword(e) {
      return this.REGEXP.password.test(e);
    },
    isEmpty: function isEmpty(e) {
      var t = e;
      return e.trim && (t = e.trim()), !t;
    },
    checkLengthMax: function checkLengthMax(e, t) {
      return e.length <= t;
    },
    checkLengthMin: function checkLengthMin(e, t) {
      return e.length >= t;
    },
    checkStrengthPass: function checkStrengthPass(e) {
      return this.REGEXP.strengthPass.test(e);
    },
    getElements: function getElements() {
      var e = this,
        t = this.$form.querySelectorAll("[data-validate-field]");
      this.elements = [];
      for (var i = function i(_i, r) {
          var n = t[_i],
            o = n.getAttribute("data-validate-field"),
            s = n.value,
            a = !1,
            l = [];
          if ("checkbox" === n.type && (s = n.checked || "", n.addEventListener("change", function (t) {
            var i = t.target,
              r = {
                name: i.getAttribute("data-validate-field"),
                value: i.checked
              };
            delete e.result[r.name], e.validateItem({
              name: r.name,
              value: r.value,
              group: []
            }), e.renderErrors();
          })), "radio" === n.type) {
            var u = e.elements.filter(function (e) {
              if (e.name === o) return e;
            })[0];
            u ? (u.group.push(n.checked), a = !0) : l.push(n.checked), n.addEventListener("change", function (t) {
              var i = t.target,
                r = {
                  name: i.getAttribute("data-validate-field"),
                  value: i.checked
                };
              delete e.result[r.name], e.validateItem({
                name: r.name,
                value: r.value,
                group: []
              }), e.renderErrors();
            });
          }
          e.setterEventListener(n, "keyup", e.handlerKeyup, "add"), a || e.elements.push({
            name: o,
            value: s,
            group: l
          });
        }, r = 0, n = t.length; r < n; ++r) {
        i(r, n);
      }
      this.validateElements();
    },
    validateRequired: function validateRequired(e) {
      return !this.isEmpty(e);
    },
    validateEmail: function validateEmail(e) {
      return this.isEmail(e);
    },
    validatePhone: function validatePhone(e) {
      return this.isPhone(e);
    },
    validateMinLength: function validateMinLength(e, t) {
      return this.checkLengthMin(e, t);
    },
    validateMaxLength: function validateMaxLength(e, t) {
      return this.checkLengthMax(e, t);
    },
    validateStrengthPass: function validateStrengthPass(e) {
      return this.checkStrengthPass(e);
    },
    validatePassword: function validatePassword(e) {
      return this.isPassword(e);
    },
    validateZip: function validateZip(e) {
      return this.isZip(e);
    },
    validateRemote: function validateRemote(e) {
      var t = e.value,
        i = e.name,
        r = e.url,
        n = e.successAnswer,
        o = e.sendParam,
        s = e.method;
      return new Promise(function (e) {
        h({
          url: r,
          method: s,
          data: _defineProperty({}, o, t),
          async: !0,
          callback: function callback(t) {
            t.toLowerCase() === n.toLowerCase() && e("ok"), e({
              type: "incorrect",
              name: i
            });
          },
          error: function error() {
            e({
              type: "error",
              name: i
            });
          }
        });
      });
    },
    generateMessage: function generateMessage(e, t, i) {
      var r = this.messages || this.defaultMessages,
        n = r[t] && r[t][e] || this.messages && "string" == typeof this.messages[t] && r[t] || this.defaultMessages[e] || this.DEFAULT_REMOTE_ERROR;
      i && (n = n.replace(":value", i.toString())), this.result[t] = {
        message: n
      };
    },
    validateElements: function validateElements() {
      var e = this;
      return this.lockForm(), this.elements.forEach(function (t) {
        e.validateItem({
          name: t.name,
          value: t.value,
          group: t.group
        });
      }), this.promisesRemote.length ? void Promise.all(this.promisesRemote).then(function (t) {
        t.forEach(function (t) {
          return "ok" === t ? void e.renderErrors() : ("error" === t.type && alert("Server error occured. Please try later."), e.generateMessage(l, t.name), void e.renderErrors());
        });
      }) : void this.renderErrors();
    },
    validateItem: function validateItem(e) {
      var c = this,
        h = e.name,
        f = e.group,
        m = e.value,
        v = e.isKeyupChange,
        p = this.rules[h] || this.defaultRules[h] || !1;
      if (p) for (var g in p) {
        var y = p[g];
        if (g !== t && g !== d && "" == m) return;
        switch (g) {
          case d:
            if ("function" != typeof y) break;
            if (y(h, m)) break;
            return void this.generateMessage(d, h, y);
          case t:
            if (!y) break;
            if (f.length) {
              var b = !1;
              if (f.forEach(function (e) {
                c.validateRequired(e) && (b = !0);
              }), b) break;
            } else if (this.validateRequired(m)) break;
            return void this.generateMessage(t, h);
          case i:
            if (!y) break;
            if (this.validateEmail(m)) break;
            return void this.generateMessage(i, h);
          case r:
            if (!y) break;
            if (this.validateMinLength(m, y)) break;
            return void this.generateMessage(r, h, y);
          case n:
            if (!y) break;
            if (this.validateMaxLength(m, y)) break;
            return void this.generateMessage(n, h, y);
          case a:
            if (!y) break;
            if (this.validatePhone(m)) break;
            return void this.generateMessage(a, h);
          case o:
            if (!y) break;
            if (this.validatePassword(m)) break;
            return void this.generateMessage(o, h);
          case u:
            if (!y || "object" !== ("undefined" == typeof y ? "undefined" : _typeof(y))) break;
            if (y["default"] && this.validateStrengthPass(m)) break;
            if (y.custom) {
              var E = void 0;
              try {
                E = new RegExp(y.custom);
              } catch (w) {
                E = this.REGEXP.strengthPass, console.error("Custom regexp for strength rule is not valid. Default regexp was used.");
              }
              if (E.test(m)) break;
            }
            return void this.generateMessage(u, h);
          case s:
            if (!y) break;
            if (this.validateZip(m)) break;
            return void this.generateMessage(s, h);
          case l:
            if (v) break;
            if (!y) break;
            var k = y.url,
              _ = y.successAnswer,
              P = y.method,
              R = y.sendParam,
              S = this.$form.querySelector('input[data-validate-field="' + h + '"]');
            return this.setterEventListener(S, "keyup", this.handlerKeyup, "remove"), void this.promisesRemote.push(this.validateRemote({
              name: h,
              value: m,
              url: k,
              method: P,
              sendParam: R,
              successAnswer: _
            }));
        }
      }
    },
    clearErrors: function clearErrors() {
      for (var e = document.querySelectorAll(".js-validate-error-label"), t = 0, i = e.length; t < i; ++t) {
        e[t].remove();
      }
      e = document.querySelectorAll(".js-validate-error-field");
      for (var r = 0, n = e.length; r < n; ++r) {
        e[r].classList.remove("js-validate-error-field"), e[r].style.border = "", e[r].style.color = "";
      }
    },
    renderErrors: function renderErrors() {
      var e = this;
      if (this.clearErrors(), this.unlockForm(), this.isValidationSuccess = !1, 0 === Object.keys(this.result).length) return void (this.isValidationSuccess = !0);
      for (var t in this.result) {
        var i = this.result[t].message,
          r = this.$form.querySelectorAll('[data-validate-field="' + t + '"]'),
          n = r[r.length - 1],
          o = document.createElement("div");
        if (o.innerHTML = i, o.className = "js-validate-error-label", o.setAttribute("style", "color: " + this.colorWrong), n.style.border = "1px solid " + this.colorWrong, n.style.color = "" + this.colorWrong, n.classList.add("js-validate-error-field"), "checkbox" === n.type || "radio" === n.type) {
          var s = document.querySelector('label[for="' + n.getAttribute("id") + '"]');
          "label" === n.parentNode.tagName.toLowerCase() ? n.parentNode.parentNode.insertBefore(o, null) : s ? s.parentNode.insertBefore(o, s.nextSibling) : n.parentNode.insertBefore(o, n.nextSibling);
        } else n.parentNode.insertBefore(o, n.nextSibling);
      }
      this.tooltipSelectorWrap.length && (this.state.tooltipsTimer = setTimeout(function () {
        e.hideTooltips();
      }, this.tooltipFadeOutTime));
    },
    hideTooltips: function hideTooltips() {
      var e = this,
        t = document.querySelectorAll(".js-validate-error-label");
      t.forEach(function (t) {
        t.classList.add(e.tooltipFadeOutClass);
      }), this.state.tooltipsTimer = null;
    },
    lockForm: function lockForm() {
      for (var e = this.$form.querySelectorAll("input, textarea, button, select"), t = 0, i = e.length; t < i; ++t) {
        e[t].setAttribute("disabled", "disabled"), e[t].style.pointerEvents = "none", e[t].style.webitFilter = "grayscale(100%)", e[t].style.filter = "grayscale(100%)";
      }
    },
    unlockForm: function unlockForm() {
      for (var e = this.$form.querySelectorAll("input, textarea, button, select"), t = 0, i = e.length; t < i; ++t) {
        e[t].removeAttribute("disabled"), e[t].style.pointerEvents = "", e[t].style.webitFilter = "", e[t].style.filter = "";
      }
    }
  }, e.JustValidate = f;
}(window);
"use strict";

var mapYandex = function mapYandex() {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76953456898229, 37.63998549999998],
      zoom: "16"
    });
    var myPlacemark = new ymaps.Placemark([55.76953456898229, 37.63998549999998], null, {
      iconLayout: "default#image",
      iconImageHref: "./images/mark.svg",
      iconImageSize: [14, 14],
      iconImageOffset: [-14, -14]
    });
    myMap.geoObjects.add(myPlacemark);

    // Подпишемся на событие клика
    myMap.geoObjects.events.add("click", function (e) {
      var btnClose = document.querySelector(".address__btn-close");
      var address = document.querySelector(".address");
      address.classList.add('address__active');
    });
  }
};
mapYandex();
"use strict";

(function () {
  var searchLink = document.querySelector(".header__searchlink");
  var formSearch = document.querySelector(".form-search");
  var formBtnClosed = document.querySelector(".form-search__btnclosed");
  var btnClose = document.querySelector(".address__btn-close");
  var address = document.querySelector(".address");
  searchLink.addEventListener("click", function () {
    formSearch.classList.add("form-search--active");
  });
  formBtnClosed.addEventListener("click", function () {
    formSearch.classList.remove("form-search--active");
  });
  btnClose.addEventListener("click", function () {
    address.classList.remove("address__active");
  });
  var jsForm = document.querySelector(".js-form");
  new JustValidate(".js-form", {
    rules: {
      name: {
        required: true,
        maxLength: 30,
        minLength: 2
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Вы не ввели имя",
        maxLength: "Максимальное количество символов - 30",
        minLength: "Минимальное количество символов - 2"
      },
      email: {
        required: "Вы не ввели e-mail",
        email: "Неверно введенный е-mail"
      }
    }
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1cmdlci5qcyIsImp1c3QtdmFsaWRhdGUubWluLmpzIiwibWFwLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6WyJidXJnZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtZW51IiwiaGVhZGVyQnVyZ2VyIiwibWVudWxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImJ0bkNsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0eWxlIiwiZGlzcGxheSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImJvZHkiLCJmb3JFYWNoIiwiZWwiLCJyZW1vdmUiLCJfZGVmaW5lUHJvcGVydHkiLCJlIiwidCIsImkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJsZW5ndGgiLCJyIiwid2luZG93IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJUeXBlRXJyb3IiLCJfc3RhdGUiLCJfaGFuZGxlZCIsIl92YWx1ZSIsIl9kZWZlcnJlZHMiLCJ1IiwibiIsInB1c2giLCJfaW1tZWRpYXRlRm4iLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJvIiwicyIsInByb21pc2UiLCJ0aGVuIiwiYSIsIl91bmhhbmRsZWRSZWplY3Rpb25GbiIsImwiLCJkIiwic2V0VGltZW91dCIsImFsbCIsIkFycmF5Iiwic2xpY2UiLCJjYWxsIiwicmVzb2x2ZSIsInJlamVjdCIsInJhY2UiLCJzZXRJbW1lZGlhdGUiLCJjb25zb2xlIiwid2FybiIsIl9zZXRJbW1lZGlhdGVGbiIsIl9zZXRVbmhhbmRsZWRSZWplY3Rpb25GbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJQcm9taXNlIiwiYyIsInRvTG93ZXJDYXNlIiwiaXNBcnJheSIsIm1hcCIsIm5hbWUiLCJqb2luIiwia2V5cyIsImgiLCJ1cmwiLCJtZXRob2QiLCJkYXRhIiwiZGVidWciLCJjYWxsYmFjayIsImVycm9yIiwiYXN5bmMiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInNlbmQiLCJmIiwib3B0aW9ucyIsInJ1bGVzIiwibWVzc2FnZXMiLCJjb2xvcldyb25nIiwicmVzdWx0IiwiZWxlbWVudHMiLCJ0b29sdGlwIiwidG9vbHRpcEZhZGVPdXRUaW1lIiwiZmFkZU91dFRpbWUiLCJ0b29sdGlwRmFkZU91dENsYXNzIiwiZmFkZU91dENsYXNzIiwidG9vbHRpcFNlbGVjdG9yV3JhcCIsInNlbGVjdG9yV3JhcCIsImJpbmRIYW5kbGVyS2V5dXAiLCJoYW5kbGVyS2V5dXAiLCJiaW5kIiwic3VibWl0SGFuZGxlciIsImludmFsaWRGb3JtQ2FsbGJhY2siLCJwcm9taXNlc1JlbW90ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJmb2N1c1dyb25nRmllbGQiLCJSRUdFWFAiLCJlbWFpbCIsInppcCIsInBob25lIiwicGFzc3dvcmQiLCJzdHJlbmd0aFBhc3MiLCJERUZBVUxUX1JFTU9URV9FUlJPUiIsInN0YXRlIiwidG9vbHRpcHNUaW1lciIsInNldEZvcm0iLCJkZWZhdWx0UnVsZXMiLCJyZXF1aXJlZCIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsInRleHQiLCJkZWZhdWx0TWVzc2FnZXMiLCJyZW1vdGUiLCJzdHJlbmd0aCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInZhbGlkYXRlSXRlbSIsImdyb3VwIiwiaXNLZXl1cENoYW5nZSIsInJlbmRlckVycm9ycyIsInNldHRlckV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0RWxlbWVudHNSZWFsVmFsdWUiLCIkZm9ybSIsInR5cGUiLCJjaGVja2VkIiwidmFsaWRhdGlvbkZhaWxlZCIsImZvY3VzIiwidmFsaWRhdGlvblN1Y2Nlc3MiLCJzdWJtaXQiLCJzZXRBdHRyaWJ1dGUiLCJwcmV2ZW50RGVmYXVsdCIsImdldEVsZW1lbnRzIiwiaXNFbWFpbCIsInRlc3QiLCJpc1ppcCIsImlzUGhvbmUiLCJpc1Bhc3N3b3JkIiwiaXNFbXB0eSIsInRyaW0iLCJjaGVja0xlbmd0aE1heCIsImNoZWNrTGVuZ3RoTWluIiwiY2hlY2tTdHJlbmd0aFBhc3MiLCJmaWx0ZXIiLCJ2YWxpZGF0ZUVsZW1lbnRzIiwidmFsaWRhdGVSZXF1aXJlZCIsInZhbGlkYXRlRW1haWwiLCJ2YWxpZGF0ZVBob25lIiwidmFsaWRhdGVNaW5MZW5ndGgiLCJ2YWxpZGF0ZU1heExlbmd0aCIsInZhbGlkYXRlU3RyZW5ndGhQYXNzIiwidmFsaWRhdGVQYXNzd29yZCIsInZhbGlkYXRlWmlwIiwidmFsaWRhdGVSZW1vdGUiLCJzdWNjZXNzQW5zd2VyIiwic2VuZFBhcmFtIiwiZ2VuZXJhdGVNZXNzYWdlIiwicmVwbGFjZSIsInRvU3RyaW5nIiwibWVzc2FnZSIsImxvY2tGb3JtIiwiYWxlcnQiLCJtIiwidiIsInAiLCJnIiwieSIsImIiLCJjdXN0b20iLCJFIiwiUmVnRXhwIiwidyIsImsiLCJfIiwiUCIsIlIiLCJTIiwiY2xlYXJFcnJvcnMiLCJib3JkZXIiLCJjb2xvciIsInVubG9ja0Zvcm0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiY2xhc3NOYW1lIiwiYWRkIiwidGFnTmFtZSIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiaGlkZVRvb2x0aXBzIiwicG9pbnRlckV2ZW50cyIsIndlYml0RmlsdGVyIiwicmVtb3ZlQXR0cmlidXRlIiwiSnVzdFZhbGlkYXRlIiwibWFwWWFuZGV4IiwieW1hcHMiLCJyZWFkeSIsImluaXQiLCJteU1hcCIsIk1hcCIsImNlbnRlciIsInpvb20iLCJteVBsYWNlbWFyayIsIlBsYWNlbWFyayIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsImdlb09iamVjdHMiLCJldmVudHMiLCJhZGRyZXNzIiwic2VhcmNoTGluayIsImZvcm1TZWFyY2giLCJmb3JtQnRuQ2xvc2VkIiwianNGb3JtIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsU0FBUyxDQUFDO0FBQ2hELElBQU1DLElBQUksR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0FBQ25ELElBQU1FLFlBQVksR0FBR0gsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7QUFDOUQsSUFBTUcsU0FBUyxHQUFHRixJQUFJLENBQUNHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztBQUNyRCxJQUFNQyxRQUFRLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0FBRTdERixNQUFNLENBQUNRLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO0VBQzNDSixZQUFZLENBQUNLLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07RUFDbkNWLE1BQU0sQ0FBQ1MsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtFQUM3QlAsSUFBSSxDQUFDUSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztFQUMzQ1gsUUFBUSxDQUFDWSxJQUFJLENBQUNGLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLGFBQWEsQ0FBQztFQUM3Q0wsUUFBUSxDQUFDRSxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0FBQ2xDLENBQUMsQ0FBQztBQUNGSCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO0VBQzdDSixZQUFZLENBQUNLLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87RUFDcENWLE1BQU0sQ0FBQ1MsS0FBSyxDQUFDQyxPQUFPLEdBQUcsT0FBTztFQUM5QlAsSUFBSSxDQUFDUSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztFQUMzQ1gsUUFBUSxDQUFDWSxJQUFJLENB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Q0xVLFFBQVEsRUFBRSxJQUFJO1FBQ2RWLEtBQUssRUFBRTtNQUNUO0lBQ0YsQ0FBQztJQUNEcEIsUUFBUSxFQUFFO01BQ1J0QixJQUFJLEVBQUU7UUFDSm9ELFFBQVEsRUFBRSxpQkFBaUI7UUFDM0JFLFNBQVMsRUFBRSx1Q0FBdUM7UUFDbERELFNBQVMsRUFBRTtNQUNiLENBQUM7TUFDRFgsS0FBSyxFQUFFO1FBQ0xVLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUJWLEtBQUssRUFBRTtNQUNUO0lBQ0Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLEdBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XG5jb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX25hdlwiKTtcbmNvbnN0IGhlYWRlckJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1cmdlcicpO1xuY29uc3QgbWVudWxpbmtzID0gbWVudS5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdl9fbGlua1wiKTtcbmNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnRuLWNsb3NlJyk7XG5cbmJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBoZWFkZXJCdXJnZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBidXJnZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBtZW51LmNsYXNzTGlzdC50b2dnbGUoXCJoZWFkZXJfX25hdi1hY3RpdmVcIik7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcInN0b3Atc2Nyb2xsXCIpO1xuICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSk7XG5idG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBoZWFkZXJCdXJnZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgYnVyZ2VyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShcImhlYWRlcl9fbmF2LWFjdGl2ZVwiKTtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwic3RvcC1zY3JvbGxcIik7XG4gIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuXG5tZW51bGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBidXJnZXIuY2xhc3NMaXN0LnJlbW92ZShcImJ1cmdlci1hY3RpdmVcIik7XG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZGVyX19uYXYtYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcInN0b3Atc2Nyb2xsXCIpO1xuICB9KTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCB0LCBpKSB7XG4gIHJldHVybiB0IGluIGUgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgdCwge1xuICAgIHZhbHVlOiBpLFxuICAgIGVudW1lcmFibGU6ICEwLFxuICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgd3JpdGFibGU6ICEwXG4gIH0pIDogZVt0XSA9IGksIGVcbn1cbnZhciBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKGUpIHtcbiAgcmV0dXJuIHR5cGVvZiBlXG59IDogZnVuY3Rpb24gKGUpIHtcbiAgcmV0dXJuIGUgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgZS5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIGUgIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIGVcbn07XG4hIGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgZSA9IFtcIkRvY3VtZW50VHlwZVwiLCBcIkVsZW1lbnRcIiwgXCJDaGFyYWN0ZXJEYXRhXCJdLCB0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbnVsbCAhPSB0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgfSwgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHIgPSBlW2ldO1xuICAgIHdpbmRvd1tyXSAmJiAhd2luZG93W3JdLnByb3RvdHlwZS5yZW1vdmUgJiYgKHdpbmRvd1tyXS5wcm90b3R5cGUucmVtb3ZlID0gdClcbiAgfVxufSgpLFxuZnVuY3Rpb24gKGUpIHtcbiAgZnVuY3Rpb24gdCgpIHt9XG5cbiAgZnVuY3Rpb24gaShlLCB0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGUuYXBwbHkodCwgYXJndW1lbnRzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHIoZSkge1xuICAgIGlmIChcIm9iamVjdFwiICE9PSBfdHlwZW9mKHRoaXMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3XCIpO1xuICAgIGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub3QgYSBmdW5jdGlvblwiKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDAsIHRoaXMuX2hhbmRsZWQgPSAhMSwgdGhpcy5fdmFsdWUgPSB2b2lkIDAsIHRoaXMuX2RlZmVycmVkcyA9IFtdLCB1KGUsIHRoaXMpXG4gIH1cblxuICBmdW5jdGlvbiBuKGUsIHQpIHtcbiAgICBmb3IgKDsgMyA9PT0gZS5fc3RhdGU7KSBlID0gZS5fdmFsdWU7XG4gICAgcmV0dXJuIDAgPT09IGUuX3N0YXRlID8gdm9pZCBlLl9kZWZlcnJlZHMucHVzaCh0KSA6IChlLl9oYW5kbGVkID0gITAsIHZvaWQgci5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGkgPSAxID09PSBlLl9zdGF0ZSA/IHQub25GdWxmaWxsZWQgOiB0Lm9uUmVqZWN0ZWQ7XG4gICAgICBpZiAobnVsbCA9PT0gaSkgcmV0dXJuIHZvaWQoMSA9PT0gZS5fc3RhdGUgPyBvIDogcykodC5wcm9taXNlLCBlLl92YWx1ZSk7XG4gICAgICB2YXIgcjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHIgPSBpKGUuX3ZhbHVlKVxuICAgICAgfSBjYXRjaCAobikge1xuICAgICAgICByZXR1cm4gdm9pZCBzKHQucHJvbWlzZSwgbilcbiAgICAgIH1cbiAgICAgIG8odC5wcm9taXNlLCByKVxuICAgIH0pKVxuICB9XG5cbiAgZnVuY3Rpb24gbyhlLCB0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0ID09PSBlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi5cIik7XG4gICAgICBpZiAodCAmJiAoXCJvYmplY3RcIiA9PT0gKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIHQgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih0KSkgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiB0KSkge1xuICAgICAgICB2YXIgbiA9IHQudGhlbjtcbiAgICAgICAgaWYgKHQgaW5zdGFuY2VvZiByKSByZXR1cm4gZS5fc3RhdGUgPSAzLCBlLl92YWx1ZSA9IHQsIHZvaWQgYShlKTtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgbikgcmV0dXJuIHZvaWQgdShpKG4sIHQpLCBlKVxuICAgICAgfVxuICAgICAgZS5fc3RhdGUgPSAxLCBlLl92YWx1ZSA9IHQsIGEoZSlcbiAgICB9IGNhdGNoIChvKSB7XG4gICAgICBzKGUsIG8pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcyhlLCB0KSB7XG4gICAgZS5fc3RhdGUgPSAyLCBlLl92YWx1ZSA9IHQsIGEoZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGEoZSkge1xuICAgIDIgPT09IGUuX3N0YXRlICYmIDAgPT09IGUuX2RlZmVycmVkcy5sZW5ndGggJiYgci5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuICAgICAgZS5faGFuZGxlZCB8fCByLl91bmhhbmRsZWRSZWplY3Rpb25GbihlLl92YWx1ZSlcbiAgICB9KTtcbiAgICBmb3IgKHZhciB0ID0gMCwgaSA9IGUuX2RlZmVycmVkcy5sZW5ndGg7IHQgPCBpOyB0KyspIG4oZSwgZS5fZGVmZXJyZWRzW3RdKTtcbiAgICBlLl9kZWZlcnJlZHMgPSBudWxsXG4gIH1cblxuICBmdW5jdGlvbiBsKGUsIHQsIGkpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBlID8gZSA6IG51bGwsIHRoaXMub25SZWplY3RlZCA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdCA/IHQgOiBudWxsLCB0aGlzLnByb21pc2UgPSBpXG4gIH1cblxuICBmdW5jdGlvbiB1KGUsIHQpIHtcbiAgICB2YXIgaSA9ICExO1xuICAgIHRyeSB7XG4gICAgICBlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGkgfHwgKGkgPSAhMCwgbyh0LCBlKSlcbiAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGkgfHwgKGkgPSAhMCwgcyh0LCBlKSlcbiAgICAgIH0pXG4gICAgfSBjYXRjaCAocikge1xuICAgICAgaWYgKGkpIHJldHVybjtcbiAgICAgIGkgPSAhMCwgcyh0LCByKVxuICAgIH1cbiAgfVxuICB2YXIgZCA9IHNldFRpbWVvdXQ7XG4gIHIucHJvdG90eXBlW1wiY2F0Y2hcIl0gPSBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgZSlcbiAgfSwgci5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgdmFyIHIgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0KTtcbiAgICByZXR1cm4gbih0aGlzLCBuZXcgbChlLCBpLCByKSksIHJcbiAgfSwgci5hbGwgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciB0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSk7XG4gICAgcmV0dXJuIG5ldyByKGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICBmdW5jdGlvbiByKG8sIHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAocyAmJiAoXCJvYmplY3RcIiA9PT0gKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIHMgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihzKSkgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBzKSkge1xuICAgICAgICAgICAgdmFyIGEgPSBzLnRoZW47XG4gICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBhKSByZXR1cm4gdm9pZCBhLmNhbGwocywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgcihvLCBlKVxuICAgICAgICAgICAgfSwgaSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdFtvXSA9IHMsIDAgPT09IC0tbiAmJiBlKHQpXG4gICAgICAgIH0gY2F0Y2ggKGwpIHtcbiAgICAgICAgICBpKGwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgwID09PSB0Lmxlbmd0aCkgcmV0dXJuIGUoW10pO1xuICAgICAgZm9yICh2YXIgbiA9IHQubGVuZ3RoLCBvID0gMDsgbyA8IHQubGVuZ3RoOyBvKyspIHIobywgdFtvXSlcbiAgICB9KVxuICB9LCByLnJlc29sdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlICYmIFwib2JqZWN0XCIgPT09IChcInVuZGVmaW5lZFwiID09IHR5cGVvZiBlID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZSkpICYmIGUuY29uc3RydWN0b3IgPT09IHIgPyBlIDogbmV3IHIoZnVuY3Rpb24gKHQpIHtcbiAgICAgIHQoZSlcbiAgICB9KVxuICB9LCByLnJlamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIG5ldyByKGZ1bmN0aW9uICh0LCBpKSB7XG4gICAgICBpKGUpXG4gICAgfSlcbiAgfSwgci5yYWNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICByZXR1cm4gbmV3IHIoZnVuY3Rpb24gKHQsIGkpIHtcbiAgICAgIGZvciAodmFyIHIgPSAwLCBuID0gZS5sZW5ndGg7IHIgPCBuOyByKyspIGVbcl0udGhlbih0LCBpKVxuICAgIH0pXG4gIH0sIHIuX2ltbWVkaWF0ZUZuID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBzZXRJbW1lZGlhdGUgJiYgZnVuY3Rpb24gKGUpIHtcbiAgICBzZXRJbW1lZGlhdGUoZSlcbiAgfSB8fCBmdW5jdGlvbiAoZSkge1xuICAgIGQoZSwgMClcbiAgfSwgci5fdW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiAoZSkge1xuICAgIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZSAmJiBjb25zb2xlLndhcm4oXCJQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246XCIsIGUpXG4gIH0sIHIuX3NldEltbWVkaWF0ZUZuID0gZnVuY3Rpb24gKGUpIHtcbiAgICByLl9pbW1lZGlhdGVGbiA9IGVcbiAgfSwgci5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiAoZSkge1xuICAgIHIuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZVxuICB9LCBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPyBtb2R1bGUuZXhwb3J0cyA9IHIgOiBlLlByb21pc2UgfHwgKGUuUHJvbWlzZSA9IHIpXG59KHdpbmRvdyksXG5mdW5jdGlvbiAoZSkge1xuICBlLlByb21pc2UgfHwgKGUuUHJvbWlzZSA9IFByb21pc2UpO1xuICB2YXIgdCA9IFwicmVxdWlyZWRcIixcbiAgICBpID0gXCJlbWFpbFwiLFxuICAgIHIgPSBcIm1pbkxlbmd0aFwiLFxuICAgIG4gPSBcIm1heExlbmd0aFwiLFxuICAgIG8gPSBcInBhc3N3b3JkXCIsXG4gICAgcyA9IFwiemlwXCIsXG4gICAgYSA9IFwicGhvbmVcIixcbiAgICBsID0gXCJyZW1vdGVcIixcbiAgICB1ID0gXCJzdHJlbmd0aFwiLFxuICAgIGQgPSBcImZ1bmN0aW9uXCIsXG4gICAgYyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgZSkgcmV0dXJuIGU7XG4gICAgICB2YXIgaSA9IFwicG9zdFwiID09PSB0LnRvTG93ZXJDYXNlKCkgPyBcIlwiIDogXCI/XCI7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShlKSA/IGkgKyBlLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZS5uYW1lICsgXCI9XCIgKyBlLnZhbHVlXG4gICAgICB9KS5qb2luKFwiJlwiKSA6IGkgKyBPYmplY3Qua2V5cyhlKS5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKyBcIj1cIiArIGVbdF1cbiAgICAgIH0pLmpvaW4oXCImXCIpXG4gICAgfSxcbiAgICBoID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciB0ID0gZS51cmwsXG4gICAgICAgIGkgPSBlLm1ldGhvZCxcbiAgICAgICAgciA9IGUuZGF0YSxcbiAgICAgICAgbiA9IGUuZGVidWcsXG4gICAgICAgIG8gPSBlLmNhbGxiYWNrLFxuICAgICAgICBzID0gZS5lcnJvcjtcbiAgICAgIGlmIChuKSByZXR1cm4gdm9pZCBvKFwidGVzdFwiKTtcbiAgICAgIHZhciBhID0gZS5hc3luYyAhPT0gITEsXG4gICAgICAgIGwgPSBuZXcgWE1MSHR0cFJlcXVlc3QsXG4gICAgICAgIHUgPSBjKHIsIFwiZ2V0XCIpLFxuICAgICAgICBkID0gbnVsbDtcbiAgICAgIFwicG9zdFwiID09PSBpLnRvTG93ZXJDYXNlKCkgJiYgKGQgPSBjKHIsIFwicG9zdFwiKSwgdSA9IFwiXCIpLCBsLm9wZW4oaSwgdCArIHUsIGEpLCBsLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiksIGwub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICA0ID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgKDIwMCA9PT0gdGhpcy5zdGF0dXMgPyBvKHRoaXMucmVzcG9uc2VUZXh0KSA6IHMgJiYgcyh0aGlzLnJlc3BvbnNlVGV4dCkpXG4gICAgICB9LCBsLnNlbmQoZClcbiAgICB9LFxuICAgIGYgPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgdGhpcy5vcHRpb25zID0gdCB8fCB7fSwgdGhpcy5ydWxlcyA9IHRoaXMub3B0aW9ucy5ydWxlcyB8fCB7fSwgdGhpcy5tZXNzYWdlcyA9IHRoaXMub3B0aW9ucy5tZXNzYWdlcyB8fCB2b2lkIDAsIHRoaXMuY29sb3JXcm9uZyA9IHRoaXMub3B0aW9ucy5jb2xvcldyb25nIHx8IFwiI0I4MTExMVwiLCB0aGlzLnJlc3VsdCA9IHt9LCB0aGlzLmVsZW1lbnRzID0gW10sIHRoaXMudG9vbHRpcCA9IHRoaXMub3B0aW9ucy50b29sdGlwIHx8IHt9LCB0aGlzLnRvb2x0aXBGYWRlT3V0VGltZSA9IHRoaXMudG9vbHRpcC5mYWRlT3V0VGltZSB8fCA1ZTMsIHRoaXMudG9vbHRpcEZhZGVPdXRDbGFzcyA9IHRoaXMudG9vbHRpcC5mYWRlT3V0Q2xhc3MgfHwgXCJqdXN0LXZhbGlkYXRlLXRvb2x0aXAtaGlkZVwiLCB0aGlzLnRvb2x0aXBTZWxlY3RvcldyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMudG9vbHRpcC5zZWxlY3RvcldyYXApLmxlbmd0aCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy50b29sdGlwLnNlbGVjdG9yV3JhcCkgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmp1c3QtdmFsaWRhdGUtdG9vbHRpcC1jb250YWluZXJcIiksIHRoaXMuYmluZEhhbmRsZXJLZXl1cCA9IHRoaXMuaGFuZGxlcktleXVwLmJpbmQodGhpcyksIHRoaXMuc3VibWl0SGFuZGxlciA9IHRoaXMub3B0aW9ucy5zdWJtaXRIYW5kbGVyIHx8IHZvaWQgMCwgdGhpcy5pbnZhbGlkRm9ybUNhbGxiYWNrID0gdGhpcy5vcHRpb25zLmludmFsaWRGb3JtQ2FsbGJhY2sgfHwgdm9pZCAwLCB0aGlzLnByb21pc2VzUmVtb3RlID0gW10sIHRoaXMuaXNWYWxpZGF0aW9uU3VjY2VzcyA9ICExLCB0aGlzLmZvY3VzV3JvbmdGaWVsZCA9IHRoaXMub3B0aW9ucy5mb2N1c1dyb25nRmllbGQgfHwgITEsIHRoaXMuUkVHRVhQID0ge1xuICAgICAgICBlbWFpbDogL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8sXG4gICAgICAgIHppcDogL15cXGR7NX0oLVxcZHs0fSk/JC8sXG4gICAgICAgIHBob25lOiAvXihbMC05XSggfC0pPyk/KFxcKD9bMC05XXszfVxcKT98WzAtOV17M30pKCB8LSk/KFswLTldezN9KCB8LSk/WzAtOV17NH18W2EtekEtWjAtOV17N30pJC8sXG4gICAgICAgIHBhc3N3b3JkOiAvW15cXHdcXGRdKigoWzAtOV0rLipbQS1aYS16XSsuKil8W0EtWmEtel0rLiooWzAtOV0rLiopKS8sXG4gICAgICAgIHN0cmVuZ3RoUGFzczogL14oPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipcXGQpW2EtekEtWlxcZF0vXG4gICAgICB9LCB0aGlzLkRFRkFVTFRfUkVNT1RFX0VSUk9SID0gXCJFcnJvclwiLCB0aGlzLnN0YXRlID0ge1xuICAgICAgICB0b29sdGlwc1RpbWVyOiBudWxsXG4gICAgICB9LCB0aGlzLnNldEZvcm0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlKSlcbiAgICB9O1xuICBmLnByb3RvdHlwZSA9IHtcbiAgICBkZWZhdWx0UnVsZXM6IHtcbiAgICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiAhMCxcbiAgICAgICAgZW1haWw6ICEwXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICByZXF1aXJlZDogITAsXG4gICAgICAgIG1pbkxlbmd0aDogMyxcbiAgICAgICAgbWF4TGVuZ3RoOiAxNVxuICAgICAgfSxcbiAgICAgIHRleHQ6IHtcbiAgICAgICAgcmVxdWlyZWQ6ICEwLFxuICAgICAgICBtYXhMZW5ndGg6IDMwMCxcbiAgICAgICAgbWluTGVuZ3RoOiA1XG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgcmVxdWlyZWQ6ICEwLFxuICAgICAgICBwYXNzd29yZDogITAsXG4gICAgICAgIG1pbkxlbmd0aDogNCxcbiAgICAgICAgbWF4TGVuZ3RoOiA4XG4gICAgICB9LFxuICAgICAgemlwOiB7XG4gICAgICAgIHJlcXVpcmVkOiAhMCxcbiAgICAgICAgemlwOiAhMFxuICAgICAgfSxcbiAgICAgIHBob25lOiB7XG4gICAgICAgIHBob25lOiAhMFxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmYXVsdE1lc3NhZ2VzOiB7XG4gICAgICByZXF1aXJlZDogXCJUaGUgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgICAgIGVtYWlsOiBcIlBsZWFzZSwgdHlwZSBhIHZhbGlkIGVtYWlsXCIsXG4gICAgICBtYXhMZW5ndGg6IFwiVGhlIGZpZWxkIG11c3QgY29udGFpbiBhIG1heGltdW0gb2YgOnZhbHVlIGNoYXJhY3RlcnNcIixcbiAgICAgIG1pbkxlbmd0aDogXCJUaGUgZmllbGQgbXVzdCBjb250YWluIGEgbWluaW11bSBvZiA6dmFsdWUgY2hhcmFjdGVyc1wiLFxuICAgICAgcGFzc3dvcmQ6IFwiUGFzc3dvcmQgaXMgbm90IHZhbGlkXCIsXG4gICAgICByZW1vdGU6IFwiRW1haWwgYWxyZWFkeSBleGlzdHNcIixcbiAgICAgIHN0cmVuZ3RoOiBcIlBhc3N3b3JkIG11c3QgY29udGVudHMgYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSBsZXR0ZXIsIG9uZSBsb3dlcmNhc2UgbGV0dGVyIGFuZCBvbmUgbnVtYmVyXCIsXG4gICAgICBcImZ1bmN0aW9uXCI6IFwiRnVuY3Rpb24gcmV0dXJuZWQgZmFsc2VcIlxuICAgIH0sXG4gICAgaGFuZGxlcktleXVwOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHQgPSBlLnRhcmdldCxcbiAgICAgICAgaSA9IHtcbiAgICAgICAgICBuYW1lOiB0LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsaWRhdGUtZmllbGRcIiksXG4gICAgICAgICAgdmFsdWU6IHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgIGRlbGV0ZSB0aGlzLnJlc3VsdFtpLm5hbWVdLCB0aGlzLnZhbGlkYXRlSXRlbSh7XG4gICAgICAgIG5hbWU6IGkubmFtZSxcbiAgICAgICAgdmFsdWU6IGkudmFsdWUsXG4gICAgICAgIGdyb3VwOiBbXSxcbiAgICAgICAgaXNLZXl1cENoYW5nZTogITBcbiAgICAgIH0pLCB0aGlzLnJlbmRlckVycm9ycygpXG4gICAgfSxcbiAgICBzZXR0ZXJFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAoZSwgdCwgaSwgcikge1xuICAgICAgc3dpdGNoIChcImtleXVwXCIgPT09IHQgJiYgKGkgPSB0aGlzLmJpbmRIYW5kbGVyS2V5dXApLCByKSB7XG4gICAgICAgIGNhc2UgXCJhZGRcIjpcbiAgICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIodCwgaSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcbiAgICAgICAgICBlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCwgaSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEVsZW1lbnRzUmVhbFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBlID0gdGhpcy4kZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSwgdCA9IHZvaWQgMCwgaSA9IHt9LCByID0gMCwgbiA9IGUubGVuZ3RoOyByIDwgbjsgKytyKVxuICAgICAgICBpZiAodCA9IGVbcl0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKSkge1xuICAgICAgICAgIGlmIChcImNoZWNrYm94XCIgPT09IGVbcl0udHlwZSkge1xuICAgICAgICAgICAgaVt0XSA9IGVbcl0uY2hlY2tlZDtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlbdF0gPSBlW3JdLnZhbHVlXG4gICAgICAgIH0gcmV0dXJuIGlcbiAgICB9LFxuICAgIHZhbGlkYXRpb25GYWlsZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaW52YWxpZEZvcm1DYWxsYmFjayAmJiB0aGlzLmludmFsaWRGb3JtQ2FsbGJhY2sodGhpcy5yZXN1bHQpO1xuICAgICAgdmFyIGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXZhbGlkYXRlLWVycm9yLWZpZWxkXCIpO1xuICAgICAgdGhpcy5mb2N1c1dyb25nRmllbGQgJiYgZSAmJiBlLmZvY3VzICYmIGUuZm9jdXMoKVxuICAgIH0sXG4gICAgdmFsaWRhdGlvblN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgwID09PSBPYmplY3Qua2V5cyh0aGlzLnJlc3VsdCkubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRhdGlvblN1Y2Nlc3MgPSAhMSwgdGhpcy5zdWJtaXRIYW5kbGVyKSB7XG4gICAgICAgICAgdmFyIGUgPSB0aGlzLmdldEVsZW1lbnRzUmVhbFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5zdWJtaXRIYW5kbGVyKHRoaXMuJGZvcm0sIGUsIGgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kZm9ybS5zdWJtaXQoKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Rm9ybTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciB0ID0gdGhpcztcbiAgICAgIHRoaXMuJGZvcm0gPSBlLCB0aGlzLiRmb3JtLnNldEF0dHJpYnV0ZShcIm5vdmFsaWRhdGVcIiwgXCJub3ZhbGlkYXRlXCIpLCB0aGlzLiRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKSwgdC5yZXN1bHQgPSBbXSwgdC5nZXRFbGVtZW50cygpLCB0LnByb21pc2VzUmVtb3RlLmxlbmd0aCA/IHZvaWQgUHJvbWlzZS5hbGwodC5wcm9taXNlc1JlbW90ZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdC5wcm9taXNlc1JlbW90ZSA9IFtdLCB0LmlzVmFsaWRhdGlvblN1Y2Nlc3MgPyB0LnZhbGlkYXRpb25TdWNjZXNzKCkgOiB0LnZhbGlkYXRpb25GYWlsZWQoKVxuICAgICAgICB9KSA6IHZvaWQodC5pc1ZhbGlkYXRpb25TdWNjZXNzID8gdC52YWxpZGF0aW9uU3VjY2VzcygpIDogdC52YWxpZGF0aW9uRmFpbGVkKCkpXG4gICAgICB9KVxuICAgIH0sXG4gICAgaXNFbWFpbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFR0VYUC5lbWFpbC50ZXN0KGUpXG4gICAgfSxcbiAgICBpc1ppcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFR0VYUC56aXAudGVzdChlKVxuICAgIH0sXG4gICAgaXNQaG9uZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFR0VYUC5waG9uZS50ZXN0KGUpXG4gICAgfSxcbiAgICBpc1Bhc3N3b3JkOiBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuUkVHRVhQLnBhc3N3b3JkLnRlc3QoZSlcbiAgICB9LFxuICAgIGlzRW1wdHk6IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgdCA9IGU7XG4gICAgICByZXR1cm4gZS50cmltICYmICh0ID0gZS50cmltKCkpLCAhdFxuICAgIH0sXG4gICAgY2hlY2tMZW5ndGhNYXg6IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICByZXR1cm4gZS5sZW5ndGggPD0gdFxuICAgIH0sXG4gICAgY2hlY2tMZW5ndGhNaW46IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICByZXR1cm4gZS5sZW5ndGggPj0gdFxuICAgIH0sXG4gICAgY2hlY2tTdHJlbmd0aFBhc3M6IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gdGhpcy5SRUdFWFAuc3RyZW5ndGhQYXNzLnRlc3QoZSlcbiAgICB9LFxuICAgIGdldEVsZW1lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZSA9IHRoaXMsXG4gICAgICAgIHQgPSB0aGlzLiRmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS12YWxpZGF0ZS1maWVsZF1cIik7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gZnVuY3Rpb24gKGksIHIpIHtcbiAgICAgICAgICB2YXIgbiA9IHRbaV0sXG4gICAgICAgICAgICBvID0gbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRlLWZpZWxkXCIpLFxuICAgICAgICAgICAgcyA9IG4udmFsdWUsXG4gICAgICAgICAgICBhID0gITEsXG4gICAgICAgICAgICBsID0gW107XG4gICAgICAgICAgaWYgKFwiY2hlY2tib3hcIiA9PT0gbi50eXBlICYmIChzID0gbi5jaGVja2VkIHx8IFwiXCIsIG4uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICB2YXIgaSA9IHQudGFyZ2V0LFxuICAgICAgICAgICAgICAgIHIgPSB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBpLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsaWRhdGUtZmllbGRcIiksXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogaS5jaGVja2VkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZGVsZXRlIGUucmVzdWx0W3IubmFtZV0sIGUudmFsaWRhdGVJdGVtKHtcbiAgICAgICAgICAgICAgICBuYW1lOiByLm5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHIudmFsdWUsXG4gICAgICAgICAgICAgICAgZ3JvdXA6IFtdXG4gICAgICAgICAgICAgIH0pLCBlLnJlbmRlckVycm9ycygpXG4gICAgICAgICAgICB9KSksIFwicmFkaW9cIiA9PT0gbi50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdSA9IGUuZWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIGlmIChlLm5hbWUgPT09IG8pIHJldHVybiBlXG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgIHUgPyAodS5ncm91cC5wdXNoKG4uY2hlY2tlZCksIGEgPSAhMCkgOiBsLnB1c2gobi5jaGVja2VkKSwgbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgIHZhciBpID0gdC50YXJnZXQsXG4gICAgICAgICAgICAgICAgciA9IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGkuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWxpZGF0ZS1maWVsZFwiKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBpLmNoZWNrZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBkZWxldGUgZS5yZXN1bHRbci5uYW1lXSwgZS52YWxpZGF0ZUl0ZW0oe1xuICAgICAgICAgICAgICAgIG5hbWU6IHIubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogci52YWx1ZSxcbiAgICAgICAgICAgICAgICBncm91cDogW11cbiAgICAgICAgICAgICAgfSksIGUucmVuZGVyRXJyb3JzKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGUuc2V0dGVyRXZlbnRMaXN0ZW5lcihuLCBcImtleXVwXCIsIGUuaGFuZGxlcktleXVwLCBcImFkZFwiKSwgYSB8fCBlLmVsZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogbyxcbiAgICAgICAgICAgIHZhbHVlOiBzLFxuICAgICAgICAgICAgZ3JvdXA6IGxcbiAgICAgICAgICB9KVxuICAgICAgICB9LCByID0gMCwgbiA9IHQubGVuZ3RoOyByIDwgbjsgKytyKSBpKHIsIG4pO1xuICAgICAgdGhpcy52YWxpZGF0ZUVsZW1lbnRzKClcbiAgICB9LFxuICAgIHZhbGlkYXRlUmVxdWlyZWQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaXNFbXB0eShlKVxuICAgIH0sXG4gICAgdmFsaWRhdGVFbWFpbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzRW1haWwoZSlcbiAgICB9LFxuICAgIHZhbGlkYXRlUGhvbmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1Bob25lKGUpXG4gICAgfSxcbiAgICB2YWxpZGF0ZU1pbkxlbmd0aDogZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrTGVuZ3RoTWluKGUsIHQpXG4gICAgfSxcbiAgICB2YWxpZGF0ZU1heExlbmd0aDogZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrTGVuZ3RoTWF4KGUsIHQpXG4gICAgfSxcbiAgICB2YWxpZGF0ZVN0cmVuZ3RoUGFzczogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrU3RyZW5ndGhQYXNzKGUpXG4gICAgfSxcbiAgICB2YWxpZGF0ZVBhc3N3b3JkOiBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNQYXNzd29yZChlKVxuICAgIH0sXG4gICAgdmFsaWRhdGVaaXA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1ppcChlKVxuICAgIH0sXG4gICAgdmFsaWRhdGVSZW1vdGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgdCA9IGUudmFsdWUsXG4gICAgICAgIGkgPSBlLm5hbWUsXG4gICAgICAgIHIgPSBlLnVybCxcbiAgICAgICAgbiA9IGUuc3VjY2Vzc0Fuc3dlcixcbiAgICAgICAgbyA9IGUuc2VuZFBhcmFtLFxuICAgICAgICBzID0gZS5tZXRob2Q7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaCh7XG4gICAgICAgICAgdXJsOiByLFxuICAgICAgICAgIG1ldGhvZDogcyxcbiAgICAgICAgICBkYXRhOiBfZGVmaW5lUHJvcGVydHkoe30sIG8sIHQpLFxuICAgICAgICAgIGFzeW5jOiAhMCxcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHQudG9Mb3dlckNhc2UoKSA9PT0gbi50b0xvd2VyQ2FzZSgpICYmIGUoXCJva1wiKSwgZSh7XG4gICAgICAgICAgICAgIHR5cGU6IFwiaW5jb3JyZWN0XCIsXG4gICAgICAgICAgICAgIG5hbWU6IGlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZSh7XG4gICAgICAgICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgbmFtZTogaVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuZXJhdGVNZXNzYWdlOiBmdW5jdGlvbiAoZSwgdCwgaSkge1xuICAgICAgdmFyIHIgPSB0aGlzLm1lc3NhZ2VzIHx8IHRoaXMuZGVmYXVsdE1lc3NhZ2VzLFxuICAgICAgICBuID0gclt0XSAmJiByW3RdW2VdIHx8IHRoaXMubWVzc2FnZXMgJiYgXCJzdHJpbmdcIiA9PSB0eXBlb2YgdGhpcy5tZXNzYWdlc1t0XSAmJiByW3RdIHx8IHRoaXMuZGVmYXVsdE1lc3NhZ2VzW2VdIHx8IHRoaXMuREVGQVVMVF9SRU1PVEVfRVJST1I7XG4gICAgICBpICYmIChuID0gbi5yZXBsYWNlKFwiOnZhbHVlXCIsIGkudG9TdHJpbmcoKSkpLCB0aGlzLnJlc3VsdFt0XSA9IHtcbiAgICAgICAgbWVzc2FnZTogblxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsaWRhdGVFbGVtZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGUgPSB0aGlzO1xuICAgICAgcmV0dXJuIHRoaXMubG9ja0Zvcm0oKSwgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGUudmFsaWRhdGVJdGVtKHtcbiAgICAgICAgICBuYW1lOiB0Lm5hbWUsXG4gICAgICAgICAgdmFsdWU6IHQudmFsdWUsXG4gICAgICAgICAgZ3JvdXA6IHQuZ3JvdXBcbiAgICAgICAgfSlcbiAgICAgIH0pLCB0aGlzLnByb21pc2VzUmVtb3RlLmxlbmd0aCA/IHZvaWQgUHJvbWlzZS5hbGwodGhpcy5wcm9taXNlc1JlbW90ZSkudGhlbihmdW5jdGlvbiAodCkge1xuICAgICAgICB0LmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gXCJva1wiID09PSB0ID8gdm9pZCBlLnJlbmRlckVycm9ycygpIDogKFwiZXJyb3JcIiA9PT0gdC50eXBlICYmIGFsZXJ0KFwiU2VydmVyIGVycm9yIG9jY3VyZWQuIFBsZWFzZSB0cnkgbGF0ZXIuXCIpLCBlLmdlbmVyYXRlTWVzc2FnZShsLCB0Lm5hbWUpLCB2b2lkIGUucmVuZGVyRXJyb3JzKCkpXG4gICAgICAgIH0pXG4gICAgICB9KSA6IHZvaWQgdGhpcy5yZW5kZXJFcnJvcnMoKVxuICAgIH0sXG4gICAgdmFsaWRhdGVJdGVtOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGMgPSB0aGlzLFxuICAgICAgICBoID0gZS5uYW1lLFxuICAgICAgICBmID0gZS5ncm91cCxcbiAgICAgICAgbSA9IGUudmFsdWUsXG4gICAgICAgIHYgPSBlLmlzS2V5dXBDaGFuZ2UsXG4gICAgICAgIHAgPSB0aGlzLnJ1bGVzW2hdIHx8IHRoaXMuZGVmYXVsdFJ1bGVzW2hdIHx8ICExO1xuICAgICAgaWYgKHApXG4gICAgICAgIGZvciAodmFyIGcgaW4gcCkge1xuICAgICAgICAgIHZhciB5ID0gcFtnXTtcbiAgICAgICAgICBpZiAoZyAhPT0gdCAmJiBnICE9PSBkICYmIFwiXCIgPT0gbSkgcmV0dXJuO1xuICAgICAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICAgICAgY2FzZSBkOlxuICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiB5KSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKHkoaCwgbSkpIGJyZWFrO1xuICAgICAgICAgICAgICByZXR1cm4gdm9pZCB0aGlzLmdlbmVyYXRlTWVzc2FnZShkLCBoLCB5KTtcbiAgICAgICAgICAgIGNhc2UgdDpcbiAgICAgICAgICAgICAgaWYgKCF5KSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKGYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSAhMTtcbiAgICAgICAgICAgICAgICBpZiAoZi5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGMudmFsaWRhdGVSZXF1aXJlZChlKSAmJiAoYiA9ICEwKVxuICAgICAgICAgICAgICAgICAgfSksIGIpIGJyZWFrXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWxpZGF0ZVJlcXVpcmVkKG0pKSBicmVhaztcbiAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5nZW5lcmF0ZU1lc3NhZ2UodCwgaCk7XG4gICAgICAgICAgICBjYXNlIGk6XG4gICAgICAgICAgICAgIGlmICgheSkgYnJlYWs7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRW1haWwobSkpIGJyZWFrO1xuICAgICAgICAgICAgICByZXR1cm4gdm9pZCB0aGlzLmdlbmVyYXRlTWVzc2FnZShpLCBoKTtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgaWYgKCF5KSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVNaW5MZW5ndGgobSwgeSkpIGJyZWFrO1xuICAgICAgICAgICAgICByZXR1cm4gdm9pZCB0aGlzLmdlbmVyYXRlTWVzc2FnZShyLCBoLCB5KTtcbiAgICAgICAgICAgIGNhc2UgbjpcbiAgICAgICAgICAgICAgaWYgKCF5KSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVNYXhMZW5ndGgobSwgeSkpIGJyZWFrO1xuICAgICAgICAgICAgICByZXR1cm4gdm9pZCB0aGlzLmdlbmVyYXRlTWVzc2FnZShuLCBoLCB5KTtcbiAgICAgICAgICAgIGNhc2UgYTpcbiAgICAgICAgICAgICAgaWYgKCF5KSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVQaG9uZShtKSkgYnJlYWs7XG4gICAgICAgICAgICAgIHJldHVybiB2b2lkIHRoaXMuZ2VuZXJhdGVNZXNzYWdlKGEsIGgpO1xuICAgICAgICAgICAgY2FzZSBvOlxuICAgICAgICAgICAgICBpZiAoIXkpIGJyZWFrO1xuICAgICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVBhc3N3b3JkKG0pKSBicmVhaztcbiAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5nZW5lcmF0ZU1lc3NhZ2UobywgaCk7XG4gICAgICAgICAgICBjYXNlIHU6XG4gICAgICAgICAgICAgIGlmICgheSB8fCBcIm9iamVjdFwiICE9PSAoXCJ1bmRlZmluZWRcIiA9PSB0eXBlb2YgeSA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHkpKSkgYnJlYWs7XG4gICAgICAgICAgICAgIGlmICh5W1wiZGVmYXVsdFwiXSAmJiB0aGlzLnZhbGlkYXRlU3RyZW5ndGhQYXNzKG0pKSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKHkuY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgdmFyIEUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIEUgPSBuZXcgUmVnRXhwKHkuY3VzdG9tKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHcpIHtcbiAgICAgICAgICAgICAgICAgIEUgPSB0aGlzLlJFR0VYUC5zdHJlbmd0aFBhc3MsIGNvbnNvbGUuZXJyb3IoXCJDdXN0b20gcmVnZXhwIGZvciBzdHJlbmd0aCBydWxlIGlzIG5vdCB2YWxpZC4gRGVmYXVsdCByZWdleHAgd2FzIHVzZWQuXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChFLnRlc3QobSkpIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5nZW5lcmF0ZU1lc3NhZ2UodSwgaCk7XG4gICAgICAgICAgICBjYXNlIHM6XG4gICAgICAgICAgICAgIGlmICgheSkgYnJlYWs7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlWmlwKG0pKSBicmVhaztcbiAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5nZW5lcmF0ZU1lc3NhZ2UocywgaCk7XG4gICAgICAgICAgICBjYXNlIGw6XG4gICAgICAgICAgICAgIGlmICh2KSBicmVhaztcbiAgICAgICAgICAgICAgaWYgKCF5KSBicmVhaztcbiAgICAgICAgICAgICAgdmFyIGsgPSB5LnVybCxcbiAgICAgICAgICAgICAgICBfID0geS5zdWNjZXNzQW5zd2VyLFxuICAgICAgICAgICAgICAgIFAgPSB5Lm1ldGhvZCxcbiAgICAgICAgICAgICAgICBSID0geS5zZW5kUGFyYW0sXG4gICAgICAgICAgICAgICAgUyA9IHRoaXMuJGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbZGF0YS12YWxpZGF0ZS1maWVsZD1cIicgKyBoICsgJ1wiXScpO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0ZXJFdmVudExpc3RlbmVyKFMsIFwia2V5dXBcIiwgdGhpcy5oYW5kbGVyS2V5dXAsIFwicmVtb3ZlXCIpLCB2b2lkIHRoaXMucHJvbWlzZXNSZW1vdGUucHVzaCh0aGlzLnZhbGlkYXRlUmVtb3RlKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBoLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtLFxuICAgICAgICAgICAgICAgIHVybDogayxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFAsXG4gICAgICAgICAgICAgICAgc2VuZFBhcmFtOiBSLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NBbnN3ZXI6IF9cbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjbGVhckVycm9yczogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtdmFsaWRhdGUtZXJyb3ItbGFiZWxcIiksIHQgPSAwLCBpID0gZS5sZW5ndGg7IHQgPCBpOyArK3QpIGVbdF0ucmVtb3ZlKCk7XG4gICAgICBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy12YWxpZGF0ZS1lcnJvci1maWVsZFwiKTtcbiAgICAgIGZvciAodmFyIHIgPSAwLCBuID0gZS5sZW5ndGg7IHIgPCBuOyArK3IpIGVbcl0uY2xhc3NMaXN0LnJlbW92ZShcImpzLXZhbGlkYXRlLWVycm9yLWZpZWxkXCIpLCBlW3JdLnN0eWxlLmJvcmRlciA9IFwiXCIsIGVbcl0uc3R5bGUuY29sb3IgPSBcIlwiXG4gICAgfSxcbiAgICByZW5kZXJFcnJvcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlID0gdGhpcztcbiAgICAgIGlmICh0aGlzLmNsZWFyRXJyb3JzKCksIHRoaXMudW5sb2NrRm9ybSgpLCB0aGlzLmlzVmFsaWRhdGlvblN1Y2Nlc3MgPSAhMSwgMCA9PT0gT2JqZWN0LmtleXModGhpcy5yZXN1bHQpLmxlbmd0aCkgcmV0dXJuIHZvaWQodGhpcy5pc1ZhbGlkYXRpb25TdWNjZXNzID0gITApO1xuICAgICAgZm9yICh2YXIgdCBpbiB0aGlzLnJlc3VsdCkge1xuICAgICAgICB2YXIgaSA9IHRoaXMucmVzdWx0W3RdLm1lc3NhZ2UsXG4gICAgICAgICAgciA9IHRoaXMuJGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmFsaWRhdGUtZmllbGQ9XCInICsgdCArICdcIl0nKSxcbiAgICAgICAgICBuID0gcltyLmxlbmd0aCAtIDFdLFxuICAgICAgICAgIG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpZiAoby5pbm5lckhUTUwgPSBpLCBvLmNsYXNzTmFtZSA9IFwianMtdmFsaWRhdGUtZXJyb3ItbGFiZWxcIiwgby5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImNvbG9yOiBcIiArIHRoaXMuY29sb3JXcm9uZyksIG4uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgXCIgKyB0aGlzLmNvbG9yV3JvbmcsIG4uc3R5bGUuY29sb3IgPSBcIlwiICsgdGhpcy5jb2xvcldyb25nLCBuLmNsYXNzTGlzdC5hZGQoXCJqcy12YWxpZGF0ZS1lcnJvci1maWVsZFwiKSwgXCJjaGVja2JveFwiID09PSBuLnR5cGUgfHwgXCJyYWRpb1wiID09PSBuLnR5cGUpIHtcbiAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cIicgKyBuLmdldEF0dHJpYnV0ZShcImlkXCIpICsgJ1wiXScpO1xuICAgICAgICAgIFwibGFiZWxcIiA9PT0gbi5wYXJlbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA/IG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvLCBudWxsKSA6IHMgPyBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG8sIHMubmV4dFNpYmxpbmcpIDogbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvLCBuLm5leHRTaWJsaW5nKVxuICAgICAgICB9IGVsc2Ugbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvLCBuLm5leHRTaWJsaW5nKVxuICAgICAgfVxuICAgICAgdGhpcy50b29sdGlwU2VsZWN0b3JXcmFwLmxlbmd0aCAmJiAodGhpcy5zdGF0ZS50b29sdGlwc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGUuaGlkZVRvb2x0aXBzKClcbiAgICAgIH0sIHRoaXMudG9vbHRpcEZhZGVPdXRUaW1lKSlcbiAgICB9LFxuICAgIGhpZGVUb29sdGlwczogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGUgPSB0aGlzLFxuICAgICAgICB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy12YWxpZGF0ZS1lcnJvci1sYWJlbFwiKTtcbiAgICAgIHQuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICB0LmNsYXNzTGlzdC5hZGQoZS50b29sdGlwRmFkZU91dENsYXNzKVxuICAgICAgfSksIHRoaXMuc3RhdGUudG9vbHRpcHNUaW1lciA9IG51bGxcbiAgICB9LFxuICAgIGxvY2tGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBlID0gdGhpcy4kZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHRleHRhcmVhLCBidXR0b24sIHNlbGVjdFwiKSwgdCA9IDAsIGkgPSBlLmxlbmd0aDsgdCA8IGk7ICsrdCkgZVt0XS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpLCBlW3RdLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIiwgZVt0XS5zdHlsZS53ZWJpdEZpbHRlciA9IFwiZ3JheXNjYWxlKDEwMCUpXCIsIGVbdF0uc3R5bGUuZmlsdGVyID0gXCJncmF5c2NhbGUoMTAwJSlcIlxuICAgIH0sXG4gICAgdW5sb2NrRm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgZSA9IHRoaXMuJGZvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCB0ZXh0YXJlYSwgYnV0dG9uLCBzZWxlY3RcIiksIHQgPSAwLCBpID0gZS5sZW5ndGg7IHQgPCBpOyArK3QpIGVbdF0ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIiksIGVbdF0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiXCIsIGVbdF0uc3R5bGUud2ViaXRGaWx0ZXIgPSBcIlwiLCBlW3RdLnN0eWxlLmZpbHRlciA9IFwiXCJcbiAgICB9XG4gIH0sIGUuSnVzdFZhbGlkYXRlID0gZlxufSh3aW5kb3cpO1xuIiwiY29uc3QgbWFwWWFuZGV4ID0gKCkgPT4ge1xuICB5bWFwcy5yZWFkeShpbml0KTtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xuICAgICAgY2VudGVyOiBbNTUuNzY5NTM0NTY4OTgyMjksIDM3LjYzOTk4NTQ5OTk5OTk4XSxcbiAgICAgIHpvb206IGAxNmAsXG4gICAgfSk7XG4gICAgdmFyIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhcbiAgICAgIFs1NS43Njk1MzQ1Njg5ODIyOSwgMzcuNjM5OTg1NDk5OTk5OThdLFxuICAgICAgbnVsbCxcbiAgICAgIHtcbiAgICAgICAgaWNvbkxheW91dDogXCJkZWZhdWx0I2ltYWdlXCIsXG4gICAgICAgIGljb25JbWFnZUhyZWY6IFwiLi9pbWFnZXMvbWFyay5zdmdcIixcbiAgICAgICAgaWNvbkltYWdlU2l6ZTogWzE0LCAxNF0sXG4gICAgICAgIGljb25JbWFnZU9mZnNldDogWy0xNCwgLTE0XSxcbiAgICAgIH1cbiAgICApO1xuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrKTtcblxuICAgIC8vINCf0L7QtNC/0LjRiNC10LzRgdGPINC90LAg0YHQvtCx0YvRgtC40LUg0LrQu9C40LrQsFxuICAgIG15TWFwLmdlb09iamVjdHMuZXZlbnRzLmFkZChcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkcmVzc19fYnRuLWNsb3NlXCIpO1xuICAgICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkcmVzc1wiKTtcbiAgICAgIGFkZHJlc3MuY2xhc3NMaXN0LmFkZCgnYWRkcmVzc19fYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cbn07XG5tYXBZYW5kZXgoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlYXJjaExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fc2VhcmNobGlua1wiKTtcbiAgY29uc3QgZm9ybVNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1zZWFyY2hcIik7XG4gIGNvbnN0IGZvcm1CdG5DbG9zZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2VhcmNoX19idG5jbG9zZWRcIik7XG4gIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRyZXNzX19idG4tY2xvc2VcIik7XG4gIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZHJlc3NcIik7XG4gIHNlYXJjaExpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBmb3JtU2VhcmNoLmNsYXNzTGlzdC5hZGQoXCJmb3JtLXNlYXJjaC0tYWN0aXZlXCIpO1xuICB9KTtcblxuICBmb3JtQnRuQ2xvc2VkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZm9ybVNlYXJjaC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybS1zZWFyY2gtLWFjdGl2ZVwiKTtcbiAgfSk7XG4gIGJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWRkcmVzcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkcmVzc19fYWN0aXZlXCIpO1xuICB9KTtcbiAgY29uc3QganNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1mb3JtXCIpO1xuICBuZXcgSnVzdFZhbGlkYXRlKFwiLmpzLWZvcm1cIiwge1xuICAgIHJ1bGVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtYXhMZW5ndGg6IDMwLFxuICAgICAgICBtaW5MZW5ndGg6IDIsXG4gICAgICB9LFxuICAgICAgZW1haWw6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1lc3NhZ2VzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHJlcXVpcmVkOiBcItCS0Ysg0L3QtSDQstCy0LXQu9C4INC40LzRj1wiLFxuICAgICAgICBtYXhMZW5ndGg6IFwi0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INGB0LjQvNCy0L7Qu9C+0LIgLSAzMFwiLFxuICAgICAgICBtaW5MZW5ndGg6IFwi0JzQuNC90LjQvNCw0LvRjNC90L7QtSDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdC40LzQstC+0LvQvtCyIC0gMlwiLFxuICAgICAgfSxcbiAgICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiBcItCS0Ysg0L3QtSDQstCy0LXQu9C4IGUtbWFpbFwiLFxuICAgICAgICBlbWFpbDogXCLQndC10LLQtdGA0L3QviDQstCy0LXQtNC10L3QvdGL0Lkg0LUtbWFpbFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn0pKCk7XG4iXX0=
