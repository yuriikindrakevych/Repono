/* @ds-bundle: {"format":3,"namespace":"ReponoDesignSystem_7d8df0","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"LicenseCard","sourcePath":"components/registry/LicenseCard.jsx"},{"name":"Terminal","sourcePath":"components/registry/Terminal.jsx"},{"name":"VersionTable","sourcePath":"components/registry/VersionTable.jsx"},{"name":"Badge","sourcePath":"components/status/Badge.jsx"},{"name":"Heartbeat","sourcePath":"components/status/Heartbeat.jsx"},{"name":"Tag","sourcePath":"components/status/Tag.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"525a8040e666","components/buttons/IconButton.jsx":"976672811f9e","components/feedback/Alert.jsx":"6f11394e4ac7","components/feedback/EmptyState.jsx":"bfcc710a013d","components/feedback/Toast.jsx":"84351157d293","components/forms/Checkbox.jsx":"bf9bb413a717","components/forms/Input.jsx":"fdfb528b14f6","components/forms/Select.jsx":"a4b5e69db0ab","components/forms/Switch.jsx":"0e7a227eef8b","components/navigation/Tabs.jsx":"709a124c4b7b","components/registry/LicenseCard.jsx":"e834fba26ed8","components/registry/Terminal.jsx":"db0ebdd2974e","components/registry/VersionTable.jsx":"68688fc34b7a","components/status/Badge.jsx":"2278ea097977","components/status/Heartbeat.jsx":"9f810d4700f7","components/status/Tag.jsx":"3203ee16d6b6","components/surfaces/Card.jsx":"fbd35b1715d7","ui_kits/repono/Cabinet.jsx":"a0af28b26fd9","ui_kits/repono/Chrome.jsx":"fa3718bc1b7a","ui_kits/repono/Landing.jsx":"8bcae6799fef","ui_kits/repono/Pricing.jsx":"2da6c0bf77d8","ui_kits/repono/ProductPage.jsx":"1e27481fdb71","ui_kits/repono/data.js":"28d8d31a0540","ui_kits/repono/icons.jsx":"428fbaf1bfa7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ReponoDesignSystem_7d8df0 = window.ReponoDesignSystem_7d8df0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Button — disciplined registry hardware.
   Primary uses the petrol-teal accent (used pointwise). Hover LIGHTENS,
   press DARKENS + nudges 1px, per the brand motion rules. */

let _injected = false;
function useButtonStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-btn{
    --_h: var(--control-h);
    font-family: var(--font-display);
    font-weight: var(--fw-medium);
    font-size: var(--fs-body-sm);
    letter-spacing: var(--ls-tight);
    line-height: 1;
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--space-2);
    height: var(--_h);
    padding: 0 var(--space-4);
    border-radius: var(--radius-sm);
    border: var(--bw-hairline) solid transparent;
    background: transparent; color: var(--text-strong);
    cursor: pointer; white-space: nowrap; user-select: none;
    transition: background var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard);
  }
  .r-btn:focus-visible{ outline: none; box-shadow: var(--ring); }
  .r-btn:active{ transform: translateY(1px); }
  .r-btn[disabled]{ cursor: not-allowed; opacity: .5; transform: none; }

  .r-btn--sm{ --_h: var(--control-h-sm); font-size: var(--fs-caption); padding: 0 var(--space-3); }
  .r-btn--lg{ --_h: var(--control-h-lg); font-size: var(--fs-body); padding: 0 var(--space-6); }

  /* Primary — the accent */
  .r-btn--primary{ background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }
  .r-btn--primary:hover:not([disabled]){ background: var(--accent-hover); border-color: var(--accent-hover); }
  .r-btn--primary:active:not([disabled]){ background: var(--accent-pressed); border-color: var(--accent-pressed); }

  /* Secondary — hairline on surface */
  .r-btn--secondary{ background: var(--surface-card); color: var(--text-strong); border-color: var(--border-strong); }
  .r-btn--secondary:hover:not([disabled]){ background: var(--surface-sunken); border-color: var(--ink-300); }
  .r-btn--secondary:active:not([disabled]){ background: var(--surface-inset); }

  /* Ghost — quiet */
  .r-btn--ghost{ background: transparent; color: var(--text-body); border-color: transparent; }
  .r-btn--ghost:hover:not([disabled]){ background: var(--surface-sunken); }
  .r-btn--ghost:active:not([disabled]){ background: var(--surface-inset); }

  /* Danger — payment / destructive */
  .r-btn--danger{ background: var(--surface-card); color: var(--danger-600); border-color: color-mix(in srgb, var(--danger-600) 40%, transparent); }
  .r-btn--danger:hover:not([disabled]){ background: var(--danger-100); border-color: var(--danger-600); }
  .r-btn--danger:active:not([disabled]){ background: color-mix(in srgb, var(--danger-100) 70%, var(--danger-600) 8%); }

  .r-btn__icon{ display: inline-flex; width: 1em; height: 1em; flex: none; }
  .r-btn__icon svg{ width: 100%; height: 100%; display: block; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'button');
  el.textContent = css;
  document.head.appendChild(el);
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  useButtonStyles();
  const cls = ['r-btn', `r-btn--${variant}`, size === 'sm' ? 'r-btn--sm' : size === 'lg' ? 'r-btn--lg' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "r-btn__icon",
    "aria-hidden": "true"
  }, iconLeft) : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "r-btn__icon",
    "aria-hidden": "true"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono IconButton — square, hairline-quiet icon control for toolbars,
   table rows, and dismiss affordances. Same motion rules as Button. */

let _injected = false;
function useIconButtonStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-iconbtn{
    --_s: var(--control-h);
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--_s); height: var(--_s);
    border-radius: var(--radius-sm);
    border: var(--bw-hairline) solid transparent;
    background: transparent; color: var(--text-muted);
    cursor: pointer; padding: 0;
    transition: background var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard);
  }
  .r-iconbtn:hover:not([disabled]){ background: var(--surface-sunken); color: var(--text-strong); }
  .r-iconbtn:active:not([disabled]){ transform: translateY(1px); background: var(--surface-inset); }
  .r-iconbtn:focus-visible{ outline: none; box-shadow: var(--ring); }
  .r-iconbtn[disabled]{ opacity: .45; cursor: not-allowed; }
  .r-iconbtn--bordered{ border-color: var(--border-strong); background: var(--surface-card); }
  .r-iconbtn--bordered:hover:not([disabled]){ border-color: var(--ink-300); }
  .r-iconbtn--sm{ --_s: var(--control-h-sm); }
  .r-iconbtn--lg{ --_s: var(--control-h-lg); }
  .r-iconbtn__icon{ display: inline-flex; width: 1.05em; height: 1.05em; font-size: var(--fs-body); }
  .r-iconbtn__icon svg{ width: 100%; height: 100%; display: block; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'iconbutton');
  el.textContent = css;
  document.head.appendChild(el);
}
function IconButton({
  children,
  label,
  size = 'md',
  bordered = false,
  disabled = false,
  className = '',
  ...rest
}) {
  useIconButtonStyles();
  const cls = ['r-iconbtn', bordered ? 'r-iconbtn--bordered' : '', size === 'sm' ? 'r-iconbtn--sm' : size === 'lg' ? 'r-iconbtn--lg' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label,
    title: label,
    disabled: disabled
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "r-iconbtn__icon",
    "aria-hidden": "true"
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Alert — inline banner for screen-level states (payment failed,
   update available). Explains what happened and what to do, no apology.
   Self-contained; tone drives the accent rail + icon colour. */

let _injected = false;
function useAlertStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-alert{ display: flex; gap: var(--space-3);
    padding: var(--space-4); border-radius: var(--radius-md);
    border: var(--bw-hairline) solid var(--border-default); background: var(--surface-card); }
  .r-alert__rail{ width: 3px; border-radius: var(--radius-full); flex: none; background: var(--text-subtle); }
  .r-alert__icon{ flex: none; display: inline-flex; color: var(--text-muted); margin-top: 1px; }
  .r-alert__icon svg{ width: 18px; height: 18px; }
  .r-alert__body{ display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1; }
  .r-alert__title{ font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
  .r-alert__msg{ font-size: var(--fs-body-sm); color: var(--text-muted); }
  .r-alert__actions{ display: flex; gap: var(--space-2); margin-top: var(--space-2); }
  .r-alert--error{ background: var(--status-error-bg); border-color: color-mix(in srgb, var(--danger-600) 30%, transparent); }
  .r-alert--error .r-alert__rail{ background: var(--danger-600); }
  .r-alert--error .r-alert__icon{ color: var(--danger-600); }
  .r-alert--warn{ background: var(--status-warn-bg); border-color: var(--ochre-200); }
  .r-alert--warn .r-alert__rail{ background: var(--ochre-600); }
  .r-alert--warn .r-alert__icon{ color: var(--ochre-700); }
  .r-alert--info{ background: var(--accent-tint-faint); border-color: var(--teal-200); }
  .r-alert--info .r-alert__rail{ background: var(--accent); }
  .r-alert--info .r-alert__icon{ color: var(--teal-600); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'alert');
  el.textContent = css;
  document.head.appendChild(el);
}
function Alert({
  tone = 'info',
  icon,
  title,
  children,
  actions,
  className = '',
  ...rest
}) {
  useAlertStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['r-alert', `r-alert--${tone}`, className].filter(Boolean).join(' '),
    role: "alert"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "r-alert__rail",
    "aria-hidden": "true"
  }), icon ? /*#__PURE__*/React.createElement("span", {
    className: "r-alert__icon",
    "aria-hidden": "true"
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    className: "r-alert__body"
  }, title ? /*#__PURE__*/React.createElement("span", {
    className: "r-alert__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("span", {
    className: "r-alert__msg"
  }, children) : null, actions ? /*#__PURE__*/React.createElement("div", {
    className: "r-alert__actions"
  }, actions) : null));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono EmptyState — empty screens are an invitation to act, not a mood.
   A quiet framed glyph slot, one-line explanation, a single primary action. */

let _injected = false;
function useEmptyStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-empty{ display: flex; flex-direction: column; align-items: center; text-align: center;
    gap: var(--space-4); padding: var(--space-16) var(--space-8);
    border: var(--bw-hairline) dashed var(--border-strong); border-radius: var(--radius-lg);
    background: var(--surface-raised); }
  .r-empty__icon{ display: inline-flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; border-radius: var(--radius-md);
    background: var(--surface-card); border: var(--bw-hairline) solid var(--border-default);
    color: var(--text-muted); }
  .r-empty__icon svg{ width: 22px; height: 22px; }
  .r-empty__title{ font-family: var(--font-display); font-size: var(--fs-title); font-weight: var(--fw-semibold);
    letter-spacing: var(--ls-tight); color: var(--text-strong); }
  .r-empty__body{ font-size: var(--fs-body-sm); color: var(--text-muted); max-width: 38ch; }
  .r-empty__actions{ display: flex; gap: var(--space-3); margin-top: var(--space-2); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'empty');
  el.textContent = css;
  document.head.appendChild(el);
}
function EmptyState({
  icon,
  title,
  children,
  actions,
  className = '',
  ...rest
}) {
  useEmptyStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['r-empty', className].filter(Boolean).join(' ')
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    className: "r-empty__icon",
    "aria-hidden": "true"
  }, icon) : null, title ? /*#__PURE__*/React.createElement("div", {
    className: "r-empty__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "r-empty__body"
  }, children) : null, actions ? /*#__PURE__*/React.createElement("div", {
    className: "r-empty__actions"
  }, actions) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Toast — terse confirmation of an action. Mirrors the action verb
   ("Pause" -> "Paused"). Quiet entrance, auto-dismiss handled by the host. */

let _injected = false;
function useToastStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-toast{ display: inline-flex; align-items: center; gap: var(--space-3);
    min-height: 42px; padding: var(--space-3) var(--space-4);
    background: var(--surface-inverse); color: var(--text-on-dark);
    border: var(--bw-hairline) solid #2A323C; border-radius: var(--radius-md);
    box-shadow: var(--shadow-pop); font-size: var(--fs-body-sm);
    animation: r-toast-in var(--dur-slow) var(--ease-entrance) both; }
  @keyframes r-toast-in{ from{ opacity:0; transform: translateY(8px); } to{ opacity:1; transform:none; } }
  .r-toast__dot{ width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--text-on-dark-muted); flex:none; }
  .r-toast--success .r-toast__dot{ background: var(--ok-500); }
  .r-toast--error .r-toast__dot{ background: var(--danger-500); }
  .r-toast__msg b{ color: var(--white); font-weight: var(--fw-medium); }
  .r-toast__action{ margin-left: var(--space-2); background: none; border: none; cursor: pointer;
    color: var(--teal-200); font: inherit; font-weight: var(--fw-medium); padding: 0; }
  .r-toast__action:hover{ color: #BFD9DD; }
  @media (prefers-reduced-motion: reduce){ .r-toast{ animation: none; } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'toast');
  el.textContent = css;
  document.head.appendChild(el);
}
function Toast({
  children,
  tone = 'neutral',
  actionLabel,
  onAction,
  className = '',
  ...rest
}) {
  useToastStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    className: ['r-toast', `r-toast--${tone}`, className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "r-toast__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r-toast__msg"
  }, children), actionLabel ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "r-toast__action",
    onClick: onAction
  }, actionLabel) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Checkbox — square, 2px radius, teal when checked. Crisp check stroke.
   Pairs label + optional description. */

let _injected = false;
function useCheckboxStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-check{ display: inline-flex; align-items: flex-start; gap: var(--space-3); cursor: pointer; }
  .r-check--disabled{ cursor: not-allowed; opacity: .55; }
  .r-check__input{ position: absolute; opacity: 0; width: 0; height: 0; }
  .r-check__box{ flex: none; width: 18px; height: 18px; margin-top: 1px;
    border: var(--bw-regular) solid var(--border-strong); border-radius: var(--radius-xs);
    background: var(--surface-card); display: inline-flex; align-items: center; justify-content: center;
    color: var(--white);
    transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard); }
  .r-check__box svg{ width: 13px; height: 13px; opacity: 0; transform: scale(.6); transition: opacity var(--dur-fast), transform var(--dur-fast) var(--ease-entrance); }
  .r-check__input:checked + .r-check__box{ background: var(--accent); border-color: var(--accent); }
  .r-check__input:checked + .r-check__box svg{ opacity: 1; transform: scale(1); }
  .r-check__input:focus-visible + .r-check__box{ box-shadow: var(--ring); }
  .r-check:hover .r-check__input:not(:checked):not(:disabled) + .r-check__box{ border-color: var(--ink-400); }
  .r-check__text{ display: flex; flex-direction: column; gap: 2px; }
  .r-check__label{ font-size: var(--fs-body-sm); color: var(--text-strong); line-height: 1.35; }
  .r-check__desc{ font-size: var(--fs-caption); color: var(--text-muted); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'checkbox');
  el.textContent = css;
  document.head.appendChild(el);
}
const Check = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 6 9 17l-5-5"
}));
let _uid = 0;
function Checkbox({
  label,
  description,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  useCheckboxStyles();
  const [fid] = React.useState(() => id || `r-check-${++_uid}`);
  return /*#__PURE__*/React.createElement("label", {
    className: ['r-check', disabled ? 'r-check--disabled' : '', className].filter(Boolean).join(' '),
    htmlFor: fid
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "checkbox",
    className: "r-check__input",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "r-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(Check, null)), label || description ? /*#__PURE__*/React.createElement("span", {
    className: "r-check__text"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "r-check__label"
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    className: "r-check__desc"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Input — text field for keys, domains, search. Hairline rest state,
   teal focus ring. Supports a leading slot (icon / "https://") and mono mode
   for keys and license fields. */

let _injected = false;
function useInputStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-field{ display: flex; flex-direction: column; gap: var(--space-2); }
  .r-field__label{ font-family: var(--font-body); font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
  .r-field__hint{ font-size: var(--fs-caption); color: var(--text-muted); }
  .r-field__hint--error{ color: var(--danger-600); }

  .r-input{ display: flex; align-items: center; gap: var(--space-2);
    height: var(--control-h); padding: 0 var(--space-3);
    background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-strong);
    border-radius: var(--radius-sm);
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard); }
  .r-input:hover{ border-color: var(--ink-300); }
  .r-input:focus-within{ border-color: var(--border-focus); box-shadow: var(--ring); }
  .r-input--lg{ height: var(--control-h-lg); }
  .r-input--error{ border-color: var(--danger-600); }
  .r-input--error:focus-within{ box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger-600) 24%, transparent); }
  .r-input--disabled{ background: var(--surface-sunken); border-color: var(--border-default); cursor: not-allowed; }

  .r-input__control{ flex: 1; min-width: 0; border: none; background: transparent; outline: none;
    font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-strong); }
  .r-input__control::placeholder{ color: var(--text-subtle); }
  .r-input--mono .r-input__control{ font-family: var(--font-mono); font-feature-settings: "zero" 1; letter-spacing: -0.01em; }
  .r-input__affix{ display: inline-flex; align-items: center; color: var(--text-subtle); font-size: var(--fs-body-sm); flex: none; }
  .r-input__affix--mono{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); }
  .r-input__affix svg{ width: 16px; height: 16px; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'input');
  el.textContent = css;
  document.head.appendChild(el);
}
let _uid = 0;
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  mono = false,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  useInputStyles();
  const [fid] = React.useState(() => id || `r-input-${++_uid}`);
  const boxCls = ['r-input', mono ? 'r-input--mono' : '', size === 'lg' ? 'r-input--lg' : '', error ? 'r-input--error' : '', disabled ? 'r-input--disabled' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ['r-field', className].filter(Boolean).join(' ')
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "r-field__label",
    htmlFor: fid
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: boxCls
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    className: `r-input__affix${mono ? ' r-input__affix--mono' : ''}`,
    "aria-hidden": "true"
  }, prefix) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "r-input__control",
    disabled: disabled,
    "aria-invalid": error ? 'true' : undefined
  }, rest)), suffix ? /*#__PURE__*/React.createElement("span", {
    className: "r-input__affix",
    "aria-hidden": "true"
  }, suffix) : null), error ? /*#__PURE__*/React.createElement("span", {
    className: "r-field__hint r-field__hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "r-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Select — native select dressed in the field shell, with a custom
   chevron. Same hairline + teal-focus language as Input. */

let _injected = false;
function useSelectStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-select{ position: relative; display: flex; align-items: center;
    height: var(--control-h);
    background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-strong);
    border-radius: var(--radius-sm);
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard); }
  .r-select:hover{ border-color: var(--ink-300); }
  .r-select:focus-within{ border-color: var(--border-focus); box-shadow: var(--ring); }
  .r-select__control{ appearance: none; -webkit-appearance: none; border: none; background: transparent; outline: none;
    width: 100%; height: 100%; padding: 0 calc(var(--space-8)) 0 var(--space-3);
    font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-strong); cursor: pointer; }
  .r-select__chev{ position: absolute; right: var(--space-3); pointer-events: none; color: var(--text-subtle); display: inline-flex; }
  .r-select__chev svg{ width: 16px; height: 16px; }
  .r-select--disabled{ background: var(--surface-sunken); }
  .r-select--disabled .r-select__control{ cursor: not-allowed; color: var(--text-disabled); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'select');
  el.textContent = css;
  document.head.appendChild(el);
}
const Chevron = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
let _uid = 0;
function Select({
  label,
  hint,
  options = [],
  children,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  useSelectStyles();
  const [fid] = React.useState(() => id || `r-select-${++_uid}`);
  return /*#__PURE__*/React.createElement("div", {
    className: ['r-field', className].filter(Boolean).join(' ')
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "r-field__label",
    htmlFor: fid
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: ['r-select', disabled ? 'r-select--disabled' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "r-select__control",
    disabled: disabled
  }, rest), children || options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "r-select__chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(Chevron, null))), hint ? /*#__PURE__*/React.createElement("span", {
    className: "r-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Switch — for binding toggles like auto-update. Track turns teal when
   on. Restrained throw, no bounce. */

let _injected = false;
function useSwitchStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-switch{ display: inline-flex; align-items: center; gap: var(--space-3); cursor: pointer; }
  .r-switch--disabled{ cursor: not-allowed; opacity: .55; }
  .r-switch__input{ position: absolute; opacity: 0; width: 0; height: 0; }
  .r-switch__track{ position: relative; flex: none; width: 38px; height: 22px;
    border-radius: var(--radius-full); background: var(--ink-200);
    transition: background var(--dur-normal) var(--ease-standard); }
  .r-switch__thumb{ position: absolute; top: 3px; left: 3px; width: 16px; height: 16px;
    border-radius: var(--radius-full); background: var(--white); box-shadow: var(--shadow-sm);
    transition: transform var(--dur-normal) var(--ease-standard); }
  .r-switch__input:checked + .r-switch__track{ background: var(--accent); }
  .r-switch__input:checked + .r-switch__track .r-switch__thumb{ transform: translateX(16px); }
  .r-switch__input:focus-visible + .r-switch__track{ box-shadow: var(--ring); }
  .r-switch__label{ font-size: var(--fs-body-sm); color: var(--text-strong); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'switch');
  el.textContent = css;
  document.head.appendChild(el);
}
let _uid = 0;
function Switch({
  label,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  useSwitchStyles();
  const [fid] = React.useState(() => id || `r-switch-${++_uid}`);
  return /*#__PURE__*/React.createElement("label", {
    className: ['r-switch', disabled ? 'r-switch--disabled' : '', className].filter(Boolean).join(' '),
    htmlFor: fid
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "checkbox",
    role: "switch",
    className: "r-switch__input",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "r-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "r-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Tabs — section navigation for the cabinet (Subscriptions, Licenses,
   Activations, Invoices, Payment method). Underline indicator in the accent;
   quiet hairline baseline. */

let _injected = false;
function useTabsStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-tabs{ display: flex; align-items: stretch; gap: var(--space-1);
    border-bottom: var(--bw-hairline) solid var(--border-default); }
  .r-tab{ position: relative; display: inline-flex; align-items: center; gap: var(--space-2);
    padding: var(--space-3) var(--space-3) calc(var(--space-3) - 1px);
    background: none; border: none; cursor: pointer; font: inherit;
    font-family: var(--font-body); font-size: var(--fs-body-sm); font-weight: var(--fw-medium);
    color: var(--text-muted); white-space: nowrap;
    transition: color var(--dur-fast) var(--ease-standard); }
  .r-tab:hover{ color: var(--text-strong); }
  .r-tab:focus-visible{ outline: none; box-shadow: var(--ring); border-radius: var(--radius-sm); }
  .r-tab::after{ content:""; position:absolute; left: var(--space-3); right: var(--space-3); bottom: -1px; height: 2px;
    background: var(--accent); border-radius: var(--radius-full) var(--radius-full) 0 0;
    transform: scaleX(0); transform-origin: center;
    transition: transform var(--dur-normal) var(--ease-standard); }
  .r-tab--active{ color: var(--text-strong); }
  .r-tab--active::after{ transform: scaleX(1); }
  .r-tab__count{ font-family: var(--font-mono); font-size: var(--fs-mono-xs); color: var(--text-subtle);
    background: var(--surface-sunken); border-radius: var(--radius-xs); padding: 1px 5px; }
  .r-tab--active .r-tab__count{ color: var(--teal-700); background: var(--accent-tint); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'tabs');
  el.textContent = css;
  document.head.appendChild(el);
}
function Tabs({
  items = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  useTabsStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['r-tabs', className].filter(Boolean).join(' '),
    role: "tablist"
  }, rest), items.map(it => {
    const id = typeof it === 'string' ? it : it.value;
    const label = typeof it === 'string' ? it : it.label;
    const count = typeof it === 'string' ? undefined : it.count;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      role: "tab",
      "aria-selected": active,
      className: ['r-tab', active ? 'r-tab--active' : ''].filter(Boolean).join(' '),
      onClick: () => onChange && onChange(id)
    }, label, count != null ? /*#__PURE__*/React.createElement("span", {
      className: "r-tab__count"
    }, count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/registry/LicenseCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono LicenseCard — a license rendered as a real artifact: the key as the
   hero, a semver tag, plan, and a live heartbeat. Self-contained (inlines its
   own status dot + version chip so it travels without dependencies). */

let _injected = false;
function useLicenseStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-lic{ position: relative; background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-strong);
    border-radius: var(--radius-lg); overflow: clip; box-shadow: var(--shadow-md);
    display: grid; grid-template-columns: 1fr; }
  .r-lic__top{ display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4);
    padding: var(--space-5) var(--space-5) var(--space-4); }
  .r-lic__id{ display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .r-lic__product{ font-family: var(--font-mono); font-size: var(--fs-mono); color: var(--text-strong);
    font-weight: var(--fw-medium); font-feature-settings: "zero" 1; }
  .r-lic__plan{ font-size: var(--fs-caption); color: var(--text-muted); }
  .r-lic__ver{ flex: none; display: inline-flex; align-items: center; height: 22px; padding: 0 var(--space-2);
    border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: var(--fs-mono-xs);
    font-weight: var(--fw-medium); background: var(--badge-version-bg); color: var(--badge-version-fg);
    border: var(--bw-hairline) solid var(--badge-version-border); }

  /* perforation divider */
  .r-lic__perf{ position: relative; height: 0; border-top: var(--bw-hairline) dashed var(--border-strong);
    margin: 0 var(--space-5); }
  .r-lic__perf::before, .r-lic__perf::after{ content:""; position:absolute; top: -7px; width: 14px; height: 14px;
    border-radius: var(--radius-full); background: var(--surface-page); border: var(--bw-hairline) solid var(--border-strong); }
  .r-lic__perf::before{ left: calc(-1 * var(--space-5) - 7px); }
  .r-lic__perf::after{ right: calc(-1 * var(--space-5) - 7px); }

  .r-lic__keyrow{ padding: var(--space-4) var(--space-5) var(--space-3); }
  .r-lic__keylabel{ font-family: var(--font-mono); font-size: var(--fs-mono-xs); letter-spacing: var(--ls-overline);
    text-transform: uppercase; color: var(--text-subtle); }
  .r-lic__key{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-top: 6px; }
  .r-lic__keyval{ font-family: var(--font-mono); font-size: var(--fs-mono-lg); letter-spacing: 0.02em;
    color: var(--text-strong); font-feature-settings: "zero" 1; }
  .r-lic__copy{ flex: none; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center;
    border: var(--bw-hairline) solid var(--border-default); border-radius: var(--radius-sm);
    background: var(--surface-card); color: var(--text-muted); cursor: pointer;
    transition: border-color var(--dur-fast), color var(--dur-fast); }
  .r-lic__copy:hover{ border-color: var(--ink-300); color: var(--text-strong); }
  .r-lic__copy svg{ width: 15px; height: 15px; }

  .r-lic__foot{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-3);
    padding: var(--space-3) var(--space-5) var(--space-5); }
  .r-lic__meta{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); color: var(--text-muted); }

  .r-lic__hb{ display: inline-flex; align-items: center; gap: var(--space-2);
    font-family: var(--font-mono); font-size: var(--fs-mono-sm); font-weight: var(--fw-medium); }
  .r-lic__dot{ position: relative; width: 8px; height: 8px; }
  .r-lic__dot::before{ content:""; position:absolute; inset:0; border-radius: var(--radius-full); background: currentColor; }
  .r-lic__dot::after{ content:""; position:absolute; inset:0; border-radius: var(--radius-full); background: currentColor;
    opacity:.5; animation: r-lic-pulse var(--dur-heartbeat) var(--ease-standard) infinite; }
  @keyframes r-lic-pulse{ 0%{transform:scale(1);opacity:.5} 70%{transform:scale(3.2);opacity:0} 100%{transform:scale(3.2);opacity:0} }
  .r-lic--active .r-lic__hb{ color: var(--ok-600); }
  .r-lic--idle .r-lic__hb{ color: var(--text-subtle); }
  .r-lic--idle .r-lic__dot::after{ display:none; }
  .r-lic--down .r-lic__hb{ color: var(--danger-600); }
  .r-lic--down .r-lic__dot::after{ display:none; }
  @media (prefers-reduced-motion: reduce){ .r-lic__dot::after{ display:none; } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'license');
  el.textContent = css;
  document.head.appendChild(el);
}
const CopyIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("rect", {
  width: "14",
  height: "14",
  x: "8",
  y: "8",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
}));
function LicenseCard({
  product = 'repono/acme-module',
  plan = 'Team plan',
  version = 'v2.4.1',
  licenseKey = 'RPN-9F2K-7T1A-QM4D',
  status = 'active',
  heartbeatMeta = 'active · 12s ago',
  meta,
  onCopy,
  className = '',
  ...rest
}) {
  useLicenseStyles();
  const cls = ['r-lic', `r-lic--${status}`, className].filter(Boolean).join(' ');
  const hbWord = status === 'active' ? 'active' : status === 'down' ? 'down' : 'idle';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "r-lic__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "r-lic__id"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-lic__product"
  }, product), /*#__PURE__*/React.createElement("span", {
    className: "r-lic__plan"
  }, plan)), /*#__PURE__*/React.createElement("span", {
    className: "r-lic__ver"
  }, version)), /*#__PURE__*/React.createElement("div", {
    className: "r-lic__perf",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "r-lic__keyrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-lic__keylabel"
  }, "License key"), /*#__PURE__*/React.createElement("div", {
    className: "r-lic__key"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-lic__keyval"
  }, licenseKey), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "r-lic__copy",
    "aria-label": "Copy license key",
    onClick: () => {
      onCopy && onCopy(licenseKey);
    }
  }, /*#__PURE__*/React.createElement(CopyIcon, null)))), /*#__PURE__*/React.createElement("div", {
    className: "r-lic__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-lic__hb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-lic__dot",
    "aria-hidden": "true"
  }), heartbeatMeta || hbWord), meta ? /*#__PURE__*/React.createElement("span", {
    className: "r-lic__meta"
  }, meta) : null));
}
Object.assign(__ds_scope, { LicenseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/registry/LicenseCard.jsx", error: String((e && e.message) || e) }); }

// components/registry/Terminal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Terminal — the signature surface. A real package manifest in a
   terminal window. Renders a list of lines (prompt / output / comment /
   success). Optional `typeCommand` types the first prompt, then reveals the
   output lines one by one — the only animation in the hero, and it serves
   meaning. Honors prefers-reduced-motion (shows the final state immediately). */

let _injected = false;
function useTerminalStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-term{ background: var(--surface-terminal); border: var(--bw-hairline) solid #232A33;
    border-radius: var(--radius-lg); overflow: clip; box-shadow: var(--shadow-lg);
    font-family: var(--font-mono); color: #C7D0DA; }
  .r-term__bar{ display: flex; align-items: center; gap: var(--space-3);
    height: 38px; padding: 0 var(--space-4);
    background: var(--surface-terminal-alt); border-bottom: var(--bw-hairline) solid #20262E; }
  .r-term__dots{ display: inline-flex; gap: 7px; }
  .r-term__dots i{ width: 11px; height: 11px; border-radius: var(--radius-full); background: #2E3742; display: inline-block; }
  .r-term__name{ font-size: var(--fs-mono-sm); color: #6B7682; letter-spacing: 0; }
  .r-term__body{ padding: var(--space-5) var(--space-5) var(--space-6);
    font-size: var(--fs-mono); line-height: var(--lh-mono); }
  .r-term__line{ white-space: pre-wrap; word-break: break-word; }
  .r-term__line + .r-term__line{ margin-top: 4px; }
  .r-term__prompt{ color: var(--teal-200); }
  .r-term__prompt b{ color: #E7ECF1; font-weight: var(--fw-medium); }
  .r-term__comment{ color: #5C6671; }
  .r-term__output{ color: #97A2AE; }
  .r-term__success{ color: #6FBF8C; }
  .r-term__pkg{ color: var(--ochre-200); }
  .r-term__cursor{ display: inline-block; width: 8px; height: 1.05em; vertical-align: text-bottom;
    background: var(--teal-200); margin-left: 2px; animation: r-term-blink 1.1s steps(1) infinite; }
  @keyframes r-term-blink{ 0%,50%{ opacity:1 } 50.01%,100%{ opacity:0 } }
  @media (prefers-reduced-motion: reduce){ .r-term__cursor{ animation: none } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'terminal');
  el.textContent = css;
  document.head.appendChild(el);
}
function Prompt({
  text
}) {
  // Highlight a package spec like repono/acme-module
  const m = text.match(/^(.*?)(\b[\w.-]+\/[\w.-]+)(.*)$/);
  if (!m) return /*#__PURE__*/React.createElement("span", {
    className: "r-term__prompt"
  }, /*#__PURE__*/React.createElement("b", null, "$"), " ", text);
  return /*#__PURE__*/React.createElement("span", {
    className: "r-term__prompt"
  }, /*#__PURE__*/React.createElement("b", null, "$"), " ", m[1], /*#__PURE__*/React.createElement("span", {
    className: "r-term__pkg"
  }, m[2]), m[3]);
}
function Terminal({
  name = 'bash — repono',
  lines = [],
  typeCommand = false,
  typeSpeed = 38,
  className = '',
  ...rest
}) {
  useTerminalStyles();
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const firstCmdIdx = lines.findIndex(l => l.type === 'command');
  const cmdText = firstCmdIdx >= 0 ? lines[firstCmdIdx].text : '';
  const [typed, setTyped] = React.useState(typeCommand && !reduced ? '' : cmdText);
  const [revealed, setRevealed] = React.useState(typeCommand && !reduced ? firstCmdIdx : lines.length);
  React.useEffect(() => {
    if (!typeCommand || reduced) {
      setTyped(cmdText);
      setRevealed(lines.length);
      return;
    }
    let i = 0;
    let timer;
    const tick = () => {
      i += 1;
      setTyped(cmdText.slice(0, i));
      if (i < cmdText.length) {
        timer = setTimeout(tick, typeSpeed);
      } else {
        // reveal output lines after the command finishes
        let j = firstCmdIdx + 1;
        const reveal = () => {
          setRevealed(j + 1);
          j += 1;
          if (j <= lines.length) timer = setTimeout(reveal, 220);
        };
        setRevealed(firstCmdIdx + 1);
        timer = setTimeout(reveal, 320);
      }
    };
    timer = setTimeout(tick, 380);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);
  const cls = ['r-term', className].filter(Boolean).join(' ');
  const typing = typeCommand && !reduced && typed.length < cmdText.length;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "r-term__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-term__dots",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "r-term__name"
  }, name)), /*#__PURE__*/React.createElement("div", {
    className: "r-term__body"
  }, lines.slice(0, revealed).map((l, idx) => {
    if (l.type === 'command') {
      const shown = idx === firstCmdIdx ? typed : l.text;
      return /*#__PURE__*/React.createElement("div", {
        className: "r-term__line",
        key: idx
      }, /*#__PURE__*/React.createElement(Prompt, {
        text: shown
      }), idx === firstCmdIdx && typing ? /*#__PURE__*/React.createElement("span", {
        className: "r-term__cursor"
      }) : null);
    }
    const tone = l.type === 'comment' ? 'r-term__comment' : l.type === 'success' ? 'r-term__success' : 'r-term__output';
    return /*#__PURE__*/React.createElement("div", {
      className: `r-term__line ${tone}`,
      key: idx
    }, l.text);
  })));
}
Object.assign(__ds_scope, { Terminal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/registry/Terminal.jsx", error: String((e && e.message) || e) }); }

// components/registry/VersionTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono VersionTable — the release history. Hairlines encode structure here
   (not decor). Each row is a semver release; clicking expands its changelog.
   Changelog expansion is a sanctioned motion. Self-contained. */

let _injected = false;
function useVersionStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-vt{ border: var(--bw-hairline) solid var(--border-default); border-radius: var(--radius-lg);
    overflow: clip; background: var(--surface-card); }
  .r-vt__row{ border-bottom: var(--bw-hairline) solid var(--border-subtle); }
  .r-vt__row:last-child{ border-bottom: none; }
  .r-vt__head{ display: grid; grid-template-columns: 132px 1fr auto; align-items: center; gap: var(--space-4);
    width: 100%; text-align: left; padding: var(--space-4) var(--space-5);
    background: transparent; border: none; cursor: pointer; font: inherit; color: inherit;
    transition: background var(--dur-fast) var(--ease-standard); }
  .r-vt__head:hover{ background: var(--surface-raised); }
  .r-vt__head:focus-visible{ outline: none; box-shadow: var(--ring); border-radius: var(--radius-sm); }
  .r-vt__verwrap{ display: inline-flex; align-items: center; gap: var(--space-2); }
  .r-vt__ver{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); font-weight: var(--fw-medium);
    color: var(--text-strong); font-feature-settings: "zero" 1; }
  .r-vt__chan{ display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border-radius: var(--radius-xs);
    font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--ls-wide); text-transform: uppercase; }
  .r-vt__chan--stable{ background: var(--accent-tint); color: var(--teal-700); }
  .r-vt__chan--rc{ background: var(--badge-version-bg); color: var(--badge-version-fg); }
  .r-vt__chan--beta{ background: var(--surface-inset); color: var(--text-muted); }
  .r-vt__summary{ font-size: var(--fs-body-sm); color: var(--text-body); min-width: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .r-vt__meta{ display: inline-flex; align-items: center; gap: var(--space-3);
    font-family: var(--font-mono); font-size: var(--fs-mono-sm); color: var(--text-subtle); }
  .r-vt__chev{ display: inline-flex; color: var(--text-subtle); transition: transform var(--dur-normal) var(--ease-standard); }
  .r-vt__chev svg{ width: 16px; height: 16px; }
  .r-vt__row--open .r-vt__chev{ transform: rotate(90deg); }

  .r-vt__panel{ display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-slow) var(--ease-standard); }
  .r-vt__row--open .r-vt__panel{ grid-template-rows: 1fr; }
  .r-vt__panelinner{ overflow: hidden; }
  .r-vt__changes{ list-style: none; margin: 0; padding: 0 var(--space-5) var(--space-5) calc(132px + var(--space-5) + var(--space-4)); }
  .r-vt__change{ display: grid; grid-template-columns: 64px 1fr; gap: var(--space-3); padding: 5px 0;
    font-size: var(--fs-body-sm); color: var(--text-body); }
  .r-vt__ctype{ font-family: var(--font-mono); font-size: var(--fs-mono-xs); text-transform: uppercase;
    letter-spacing: var(--ls-wide); padding-top: 2px; }
  .r-vt__ctype--added{ color: var(--ok-600); }
  .r-vt__ctype--fixed{ color: var(--teal-600); }
  .r-vt__ctype--changed{ color: var(--ochre-600); }
  .r-vt__ctype--removed{ color: var(--danger-600); }
  @media (max-width: 560px){
    .r-vt__head{ grid-template-columns: 1fr auto; }
    .r-vt__summary{ display: none; }
    .r-vt__changes{ padding-left: var(--space-5); }
  }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'versiontable');
  el.textContent = css;
  document.head.appendChild(el);
}
const Chevron = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "m9 18 6-6-6-6"
}));
function Row({
  release,
  open,
  onToggle
}) {
  const chan = release.channel || 'stable';
  return /*#__PURE__*/React.createElement("div", {
    className: ['r-vt__row', open ? 'r-vt__row--open' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "r-vt__head",
    "aria-expanded": open,
    onClick: onToggle
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-vt__verwrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r-vt__ver"
  }, release.version), /*#__PURE__*/React.createElement("span", {
    className: `r-vt__chan r-vt__chan--${chan}`
  }, chan)), /*#__PURE__*/React.createElement("span", {
    className: "r-vt__summary"
  }, release.summary), /*#__PURE__*/React.createElement("span", {
    className: "r-vt__meta"
  }, release.date, /*#__PURE__*/React.createElement("span", {
    className: "r-vt__chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(Chevron, null)))), /*#__PURE__*/React.createElement("div", {
    className: "r-vt__panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "r-vt__panelinner"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "r-vt__changes"
  }, (release.changes || []).map((c, i) => /*#__PURE__*/React.createElement("li", {
    className: "r-vt__change",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: `r-vt__ctype r-vt__ctype--${c.type}`
  }, c.type), /*#__PURE__*/React.createElement("span", null, c.text)))))));
}
function VersionTable({
  releases = [],
  defaultOpen = 0,
  className = '',
  ...rest
}) {
  useVersionStyles();
  const [open, setOpen] = React.useState(() => {
    const s = {};
    if (defaultOpen != null && releases[defaultOpen]) s[defaultOpen] = true;
    return s;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['r-vt', className].filter(Boolean).join(' ')
  }, rest), releases.map((r, i) => /*#__PURE__*/React.createElement(Row, {
    key: r.version || i,
    release: r,
    open: !!open[i],
    onToggle: () => setOpen(s => ({
      ...s,
      [i]: !s[i]
    }))
  })));
}
Object.assign(__ds_scope, { VersionTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/registry/VersionTable.jsx", error: String((e && e.message) || e) }); }

// components/status/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Badge — compact status & metadata label.
   The "version" tone is the ONLY place ochre appears: semver tags, build
   numbers. Everything else is neutral or a muted semantic tone. */

let _injected = false;
function useBadgeStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-badge{
    display: inline-flex; align-items: center; gap: var(--space-1);
    height: 22px; padding: 0 var(--space-2);
    border-radius: var(--radius-xs);
    border: var(--bw-hairline) solid transparent;
    font-family: var(--font-body);
    font-size: var(--fs-mono-xs); font-weight: var(--fw-medium);
    letter-spacing: var(--ls-wide); white-space: nowrap; line-height: 1;
  }
  .r-badge--mono{ font-family: var(--font-mono); letter-spacing: 0; font-feature-settings: "zero" 1; }
  .r-badge__dot{ width: 6px; height: 6px; border-radius: var(--radius-full); background: currentColor; flex: none; }

  .r-badge--neutral{ background: var(--surface-sunken); color: var(--text-muted); border-color: var(--border-subtle); }
  .r-badge--version{ background: var(--badge-version-bg); color: var(--badge-version-fg); border-color: var(--badge-version-border); }
  .r-badge--accent{ background: var(--accent-tint); color: var(--teal-700); border-color: var(--teal-200); }
  .r-badge--active{ background: var(--status-active-bg); color: var(--status-active-fg); border-color: color-mix(in srgb, var(--ok-600) 26%, transparent); }
  .r-badge--error{ background: var(--status-error-bg); color: var(--status-error-fg); border-color: color-mix(in srgb, var(--danger-600) 30%, transparent); }
  .r-badge--warn{ background: var(--status-warn-bg); color: var(--status-warn-fg); border-color: var(--ochre-200); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'badge');
  el.textContent = css;
  document.head.appendChild(el);
}
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  mono,
  className = '',
  ...rest
}) {
  useBadgeStyles();
  const isMono = mono ?? tone === 'version';
  const cls = ['r-badge', `r-badge--${tone}`, isMono ? 'r-badge--mono' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "r-badge__dot",
    "aria-hidden": "true"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Badge.jsx", error: String((e && e.message) || e) }); }

// components/status/Heartbeat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Heartbeat — the live activation status. A pulsing dot that signals a
   domain is checking in. This is one of the few places motion is allowed: it
   serves meaning (last heartbeat). Honors prefers-reduced-motion (ring drops,
   dot stays). */

let _injected = false;
function useHeartbeatStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-hb{ display: inline-flex; align-items: center; gap: var(--space-2);
    font-family: var(--font-mono); font-size: var(--fs-mono-sm); font-weight: var(--fw-medium);
    letter-spacing: 0; line-height: 1; }
  .r-hb__dot{ position: relative; width: 8px; height: 8px; flex: none; }
  .r-hb__dot::before{ content:""; position:absolute; inset:0; border-radius: var(--radius-full);
    background: currentColor; }
  .r-hb__dot::after{ content:""; position:absolute; inset:0; border-radius: var(--radius-full);
    background: currentColor; opacity:.55; animation: r-hb-pulse var(--dur-heartbeat) var(--ease-standard) infinite; }
  @keyframes r-hb-pulse{
    0%{ transform: scale(1); opacity:.5; }
    70%{ transform: scale(3.2); opacity:0; }
    100%{ transform: scale(3.2); opacity:0; }
  }
  .r-hb--active{ color: var(--ok-600); }
  .r-hb--idle{ color: var(--text-subtle); }
  .r-hb--idle .r-hb__dot::after{ animation: none; display:none; }
  .r-hb--stale{ color: var(--ochre-600); }
  .r-hb--down{ color: var(--danger-600); }
  .r-hb--down .r-hb__dot::after{ animation: none; display:none; }
  .r-hb__label{ color: var(--text-body); }
  .r-hb__meta{ color: var(--text-subtle); }
  @media (prefers-reduced-motion: reduce){ .r-hb__dot::after{ animation: none; display:none; } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'heartbeat');
  el.textContent = css;
  document.head.appendChild(el);
}
const LABELS = {
  active: 'active',
  idle: 'idle',
  stale: 'stale',
  down: 'down'
};
function Heartbeat({
  status = 'active',
  label,
  meta,
  className = '',
  ...rest
}) {
  useHeartbeatStyles();
  const text = label ?? LABELS[status] ?? status;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['r-hb', `r-hb--${status}`, className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "r-hb__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r-hb__label"
  }, text), meta ? /*#__PURE__*/React.createElement("span", {
    className: "r-hb__meta"
  }, "\xB7 ", meta) : null);
}
Object.assign(__ds_scope, { Heartbeat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Heartbeat.jsx", error: String((e && e.message) || e) }); }

// components/status/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Tag — a removable/selectable label for compatibility chips,
   filters, dependency markers. Quieter than Badge; hairline by default. */

let _injected = false;
function useTagStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-tag{ display: inline-flex; align-items: center; gap: var(--space-2);
    height: 26px; padding: 0 var(--space-3);
    border-radius: var(--radius-sm);
    border: var(--bw-hairline) solid var(--border-default);
    background: var(--surface-card); color: var(--text-body);
    font-family: var(--font-body); font-size: var(--fs-caption); font-weight: var(--fw-medium);
    line-height: 1; white-space: nowrap; }
  .r-tag--mono{ font-family: var(--font-mono); font-feature-settings: "zero" 1; }
  .r-tag--selected{ background: var(--accent-tint-faint); border-color: var(--teal-200); color: var(--teal-700); }
  .r-tag--button{ cursor: pointer; transition: border-color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard); }
  .r-tag--button:hover{ border-color: var(--ink-300); background: var(--surface-sunken); }
  .r-tag__remove{ display: inline-flex; width: 14px; height: 14px; margin-right: -2px;
    color: var(--text-subtle); cursor: pointer; border: none; background: none; padding: 0; }
  .r-tag__remove:hover{ color: var(--text-strong); }
  .r-tag__remove svg{ width: 100%; height: 100%; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'tag');
  el.textContent = css;
  document.head.appendChild(el);
}
const X = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18M6 6l12 12"
}));
function Tag({
  children,
  mono = false,
  selected = false,
  onRemove,
  onClick,
  className = '',
  ...rest
}) {
  useTagStyles();
  const interactive = !!onClick;
  const cls = ['r-tag', mono ? 'r-tag--mono' : '', selected ? 'r-tag--selected' : '', interactive ? 'r-tag--button' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    onClick: onClick
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "r-tag__remove",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement(X, null)) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Tag.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Repono Card — the default container. Sits on a hairline, not a shadow;
   shadow is reserved for floating surfaces. Optional header + footer slots. */

let _injected = false;
function useCardStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-card{ background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-default);
    border-radius: var(--radius-lg); overflow: clip; }
  .r-card--raised{ box-shadow: var(--shadow-md); border-color: var(--border-subtle); }
  .r-card--flush{ border-radius: 0; }
  .r-card--interactive{ cursor: pointer; transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard); }
  .r-card--interactive:hover{ border-color: var(--ink-300); box-shadow: var(--shadow-sm); }
  .r-card--accent{ border-color: var(--teal-200); }
  .r-card--accent::before{ content:""; display:block; height: 3px; background: var(--accent); }

  .r-card__header{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
    padding: var(--space-4) var(--space-5); border-bottom: var(--bw-hairline) solid var(--border-subtle); }
  .r-card__title{ font-family: var(--font-display); font-size: var(--fs-title); font-weight: var(--fw-semibold);
    letter-spacing: var(--ls-tight); color: var(--text-strong); }
  .r-card__body{ padding: var(--space-5); }
  .r-card__body--flush{ padding: 0; }
  .r-card__footer{ padding: var(--space-4) var(--space-5); border-top: var(--bw-hairline) solid var(--border-subtle);
    background: var(--surface-raised); display: flex; align-items: center; gap: var(--space-3); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'card');
  el.textContent = css;
  document.head.appendChild(el);
}
function Card({
  children,
  title,
  headerAction,
  footer,
  raised = false,
  accent = false,
  interactive = false,
  flushBody = false,
  className = '',
  ...rest
}) {
  useCardStyles();
  const cls = ['r-card', raised ? 'r-card--raised' : '', accent ? 'r-card--accent' : '', interactive ? 'r-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), title || headerAction ? /*#__PURE__*/React.createElement("div", {
    className: "r-card__header"
  }, title ? /*#__PURE__*/React.createElement("span", {
    className: "r-card__title"
  }, title) : /*#__PURE__*/React.createElement("span", null), headerAction ? /*#__PURE__*/React.createElement("span", null, headerAction) : null) : null, /*#__PURE__*/React.createElement("div", {
    className: ['r-card__body', flushBody ? 'r-card__body--flush' : ''].filter(Boolean).join(' ')
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    className: "r-card__footer"
  }, footer) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/repono/Cabinet.jsx
try { (() => {
/* Repono UI kit — Buyer cabinet. Tabs for the things a buyer manages, plus the
   required states: populated, empty, payment error, loading. Interactions:
   pause a subscription (verb mirrored in the toast), copy a key, fix payment. */
(function () {
  const {
    Tabs,
    Card,
    Badge,
    Button,
    Switch,
    Input,
    Heartbeat,
    LicenseCard,
    EmptyState,
    Alert,
    Toast,
    Tag
  } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = {
    maxWidth: 'var(--container-wide)',
    margin: '0 auto',
    padding: '0 24px'
  };
  const TABS = [{
    value: 'subs',
    label: 'Subscriptions',
    count: 2
  }, {
    value: 'licenses',
    label: 'Licenses',
    count: 2
  }, {
    value: 'activations',
    label: 'Activations',
    count: 4
  }, {
    value: 'invoices',
    label: 'Invoices'
  }, {
    value: 'payment',
    label: 'Payment method'
  }];
  function StateSwitch({
    state,
    setState
  }) {
    const opts = [['live', 'Populated'], ['empty', 'Empty'], ['error', 'Payment error'], ['loading', 'Loading']];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 2,
        padding: 2,
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)'
      }
    }, opts.map(([v, l]) => /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => setState(v),
      style: {
        font: 'inherit',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        padding: '5px 10px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        border: 'none',
        background: state === v ? 'var(--surface-card)' : 'transparent',
        boxShadow: state === v ? 'var(--shadow-xs)' : 'none',
        color: state === v ? 'var(--text-strong)' : 'var(--text-muted)',
        fontWeight: 500
      }
    }, l)));
  }
  function SkeletonRow() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 10,
        padding: '18px 20px',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-card)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rep-skel",
      style: {
        width: '40%',
        height: 14
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "rep-skel",
      style: {
        width: '70%',
        height: 12
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "rep-skel",
      style: {
        width: '25%',
        height: 12
      }
    }));
  }
  function SubRow({
    sub,
    onToast
  }) {
    const [paused, setPaused] = React.useState(sub.status === 'paused');
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono)',
        fontWeight: 500,
        color: 'var(--text-strong)'
      }
    }, sub.product), /*#__PURE__*/React.createElement(Badge, {
      tone: "version"
    }, sub.version), paused ? /*#__PURE__*/React.createElement(Badge, {
      tone: "warn",
      dot: true
    }, "paused") : /*#__PURE__*/React.createElement(Badge, {
      tone: "active",
      dot: true
    }, "active")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)'
      }
    }, sub.plan, " \xB7 renews ", sub.renews)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      label: paused ? 'Resume' : 'Pause',
      checked: !paused,
      onChange: () => {
        const next = !paused;
        setPaused(next);
        onToast(next ? {
          tone: 'neutral',
          msg: 'Subscription paused'
        } : {
          tone: 'success',
          msg: 'Subscription resumed'
        });
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "Manage"))));
  }
  function Th({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("th", {
      style: {
        textAlign: 'left',
        padding: '10px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)',
        fontWeight: 500,
        borderBottom: '1px solid var(--border-default)',
        ...style
      }
    }, children);
  }
  function Td({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 16px',
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-body)',
        borderBottom: '1px solid var(--border-subtle)',
        ...style
      }
    }, children);
  }
  function Cabinet() {
    const [tab, setTab] = React.useState('subs');
    const [state, setState] = React.useState('live');
    const [toast, setToast] = React.useState(null);
    const fireToast = t => {
      setToast(t);
      clearTimeout(window.__repToast);
      window.__repToast = setTimeout(() => setToast(null), 2600);
    };
    const subs = [{
      product: 'acme/commerce-sync',
      version: 'v2.4.1',
      plan: 'Team plan · 5 domains',
      renews: '12 Jul 2026',
      status: 'active'
    }, {
      product: 'acme/seo-redirects',
      version: 'v1.8.0',
      plan: 'Solo plan · 1 domain',
      renews: '03 Jul 2026',
      status: 'active'
    }];
    const isEmpty = state === 'empty';
    const isLoading = state === 'loading';
    const isError = state === 'error';
    function Panel() {
      if (isLoading) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'grid',
            gap: 14
          }
        }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement(SkeletonRow, {
          key: i
        })));
      }
      if (isEmpty) {
        return /*#__PURE__*/React.createElement(EmptyState, {
          icon: /*#__PURE__*/React.createElement(I.Package, null),
          title: "No modules connected yet",
          actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
            iconLeft: /*#__PURE__*/React.createElement(I.Plug, null)
          }, "Connect module"), /*#__PURE__*/React.createElement(Button, {
            variant: "secondary"
          }, "Paste a license key"))
        }, "Run a ", /*#__PURE__*/React.createElement("span", {
          className: "r-mono"
        }, "composer require"), " on any module you've bought, or paste a license key to activate your first one. Subscriptions and activations show up here.");
      }
      if (tab === 'subs') {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'grid',
            gap: 14
          }
        }, isError ? /*#__PURE__*/React.createElement(Alert, {
          tone: "error",
          icon: /*#__PURE__*/React.createElement(I.Card, null),
          title: "Payment failed \u2014 update your card to keep auto-updates",
          actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
            size: "sm",
            variant: "danger",
            onClick: () => setTab('payment')
          }, "Update payment method"), /*#__PURE__*/React.createElement(Button, {
            size: "sm",
            variant: "ghost",
            onClick: () => setTab('invoices')
          }, "View invoice"))
        }, "Your card ending 4242 was declined on 12 Jun. Modules keep working for 7 days \u2014 until 19 Jun \u2014 while you fix this.") : null, subs.map(s => /*#__PURE__*/React.createElement(SubRow, {
          key: s.product,
          sub: s,
          onToast: fireToast
        })));
      }
      if (tab === 'licenses') {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 18
          }
        }, D.licenses.map(l => /*#__PURE__*/React.createElement(LicenseCard, {
          key: l.key,
          product: l.product,
          plan: l.plan,
          version: l.version,
          licenseKey: l.key,
          status: l.status,
          heartbeatMeta: l.heartbeat,
          meta: l.meta,
          onCopy: () => fireToast({
            tone: 'success',
            msg: 'License key copied'
          })
        })));
      }
      if (tab === 'activations') {
        return /*#__PURE__*/React.createElement(Card, {
          flushBody: true
        }, /*#__PURE__*/React.createElement("table", {
          style: {
            width: '100%',
            borderCollapse: 'collapse'
          }
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(Th, null, "Domain"), /*#__PURE__*/React.createElement(Th, null, "Environment"), /*#__PURE__*/React.createElement(Th, null, "License"), /*#__PURE__*/React.createElement(Th, null, "Heartbeat"), /*#__PURE__*/React.createElement(Th, {
          style: {
            textAlign: 'right'
          }
        }, "\xB7"))), /*#__PURE__*/React.createElement("tbody", null, D.activations.map(a => /*#__PURE__*/React.createElement("tr", {
          key: a.domain
        }, /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-strong)'
          }
        }, a.domain)), /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement(Tag, null, a.env)), /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)'
          }
        }, a.license)), /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement(Heartbeat, {
          status: a.status,
          meta: a.last
        })), /*#__PURE__*/React.createElement(Td, {
          style: {
            textAlign: 'right'
          }
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          size: "sm"
        }, "Deactivate")))))));
      }
      if (tab === 'invoices') {
        return /*#__PURE__*/React.createElement(Card, {
          flushBody: true
        }, /*#__PURE__*/React.createElement("table", {
          style: {
            width: '100%',
            borderCollapse: 'collapse'
          }
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(Th, null, "Invoice"), /*#__PURE__*/React.createElement(Th, null, "Date"), /*#__PURE__*/React.createElement(Th, null, "Description"), /*#__PURE__*/React.createElement(Th, null, "Amount"), /*#__PURE__*/React.createElement(Th, {
          style: {
            textAlign: 'right'
          }
        }, "\xB7"))), /*#__PURE__*/React.createElement("tbody", null, D.invoices.map(v => /*#__PURE__*/React.createElement("tr", {
          key: v.id
        }, /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-strong)'
          }
        }, v.id)), /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)'
          }
        }, v.date)), /*#__PURE__*/React.createElement(Td, null, v.desc), /*#__PURE__*/React.createElement(Td, null, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'var(--font-mono)'
          }
        }, v.amount), " ", /*#__PURE__*/React.createElement(Badge, {
          tone: "active"
        }, v.status)), /*#__PURE__*/React.createElement(Td, {
          style: {
            textAlign: 'right'
          }
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          size: "sm",
          iconLeft: /*#__PURE__*/React.createElement(I.Download, null)
        }, "PDF")))))));
      }
      // payment
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 24,
          alignItems: 'start'
        },
        className: "rep-pay"
      }, /*#__PURE__*/React.createElement(Card, {
        title: "Payment method"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gap: 16
        }
      }, isError ? /*#__PURE__*/React.createElement(Alert, {
        tone: "error",
        icon: /*#__PURE__*/React.createElement(I.Card, null),
        title: "Card declined"
      }, "The card on file was declined. Add a new one to restore auto-updates.") : null, /*#__PURE__*/React.createElement(Input, {
        label: "Card number",
        mono: true,
        prefix: /*#__PURE__*/React.createElement(I.Card, null),
        defaultValue: "4242 4242 4242 4242"
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16
        }
      }, /*#__PURE__*/React.createElement(Input, {
        label: "Expiry",
        mono: true,
        placeholder: "MM / YY",
        defaultValue: "08 / 27"
      }), /*#__PURE__*/React.createElement(Input, {
        label: "CVC",
        mono: true,
        placeholder: "123"
      })), /*#__PURE__*/React.createElement(Input, {
        label: "Billing email",
        defaultValue: "ops@acme.example"
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 12,
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement(Button, {
        onClick: () => fireToast({
          tone: 'success',
          msg: 'Payment method updated'
        })
      }, "Save card"), /*#__PURE__*/React.createElement(Button, {
        variant: "ghost"
      }, "Cancel")))), /*#__PURE__*/React.createElement(Card, {
        title: "Current card",
        headerAction: isError ? /*#__PURE__*/React.createElement(Badge, {
          tone: "error",
          dot: true
        }, "declined") : /*#__PURE__*/React.createElement(Badge, {
          tone: "active",
          dot: true
        }, "valid")
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-mono-lg)',
          color: 'var(--text-strong)',
          letterSpacing: '0.04em'
        }
      }, "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4242"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-mono-sm)',
          color: 'var(--text-muted)'
        }
      }, /*#__PURE__*/React.createElement("span", null, "Visa \xB7 ops@acme.example"), /*#__PURE__*/React.createElement("span", null, "exp 08/27")))));
    }
    return /*#__PURE__*/React.createElement("main", {
      style: {
        ...wrap,
        paddingTop: 28,
        paddingBottom: 80,
        minHeight: '70vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--fs-display-sm)'
      }
    }, "Account"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)'
      }
    }, "Manage your subscriptions, licenses and activations.")), /*#__PURE__*/React.createElement(StateSwitch, {
      state: state,
      setState: setState
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      items: TABS,
      value: tab,
      onChange: setTab
    })), /*#__PURE__*/React.createElement(Panel, null), toast ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 60
      }
    }, /*#__PURE__*/React.createElement(Toast, {
      tone: toast.tone
    }, toast.msg)) : null);
  }
  window.RepCabinet = Cabinet;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/Cabinet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/repono/Chrome.jsx
try { (() => {
/* Repono UI kit — shared chrome: Logo lockup, marketing header, app header,
   footer. Reads design-system components from the global namespace. */
(function () {
  const {
    Button,
    Badge
  } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  function Logo({
    dark = false,
    size = 26
  }) {
    const ink = dark ? '#EAEEF2' : '#171B21';
    const node = dark ? '#9DC4CA' : '#0E5A66';
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      style: {
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3.4",
      y: "3.4",
      width: "17.2",
      height: "17.2",
      rx: "3.1",
      stroke: ink,
      strokeWidth: "1.8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.4 11.6 H20.6",
      stroke: ink,
      strokeWidth: "1.4"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "13.7",
      y: "14.1",
      width: "4",
      height: "4",
      rx: "0.8",
      fill: node
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size * 0.82,
        letterSpacing: '-0.03em',
        color: ink
      }
    }, "Repono"));
  }
  function NavLink({
    children,
    active,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        font: 'inherit',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-body-sm)',
        fontWeight: 500,
        color: active ? 'var(--text-strong)' : 'var(--text-muted)',
        padding: '6px 2px'
      }
    }, children);
  }
  function MarketingHeader({
    route,
    go
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--surface-page)',
        borderBottom: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        height: 64,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => go('landing'),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 22
      },
      className: "rep-navlinks"
    }, /*#__PURE__*/React.createElement(NavLink, {
      active: route === 'product',
      onClick: () => go('product')
    }, "Product"), /*#__PURE__*/React.createElement(NavLink, {
      active: route === 'pricing',
      onClick: () => go('pricing')
    }, "Pricing"), /*#__PURE__*/React.createElement(NavLink, {
      onClick: () => go('product')
    }, "Changelog"), /*#__PURE__*/React.createElement(NavLink, {
      onClick: () => go('product')
    }, "Docs"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(NavLink, {
      onClick: () => go('cabinet')
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => go('pricing')
    }, "Start free trial"))));
  }
  function AppHeader({
    go
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        height: 60,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => go('landing'),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 24
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        height: 22,
        background: 'var(--border-default)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono-sm)',
        color: 'var(--text-muted)'
      }
    }, "acme", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-subtle)'
      }
    }, " / "), "account")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)'
      }
    }, "ops@acme.example"), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 'var(--radius-full)',
        background: 'var(--ink-800)',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 600
      }
    }, "A"))));
  }
  function Footer({
    go
  }) {
    const col = (title, links) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 10,
        alignContent: 'start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)'
      }
    }, title), links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      onClick: () => go && go('product'),
      style: {
        cursor: 'pointer',
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)'
      }
    }, l)));
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        borderTop: '1px solid var(--border-default)',
        background: 'var(--surface-raised)',
        marginTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '48px 24px 36px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 12,
        alignContent: 'start'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 24
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)',
        maxWidth: 240
      }
    }, "The self-hosted registry for selling and licensing the modules you build.")), col('Product', ['Overview', 'Changelog', 'Pricing', 'Status']), col('Developers', ['Docs', 'CLI reference', 'Webhooks', 'License API']), col('Company', ['About', 'Contact', 'Terms', 'Privacy'])), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '16px 24px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, "\xA9 2026 Repono"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, "self-hosted \xB7 v2.4.1")));
  }
  Object.assign(window, {
    RepLogo: Logo,
    RepMarketingHeader: MarketingHeader,
    RepAppHeader: AppHeader,
    RepFooter: Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/repono/Landing.jsx
try { (() => {
/* Repono UI kit — Landing. Left-aligned editorial hero; the signature is the
   live terminal + license artifact. No centered blob, no 3 identical cards. */
(function () {
  const {
    Terminal,
    LicenseCard,
    VersionTable,
    Button,
    Badge,
    Heartbeat,
    Tag
  } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 24px'
  };
  function StepRow({
    n,
    icon,
    title,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '44px 1fr',
        gap: 18,
        alignItems: 'start',
        padding: '22px 0',
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-subtle)',
        paddingTop: 2
      }
    }, "0", n), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        fontSize: 18,
        display: 'inline-flex'
      }
    }, icon), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--fs-title)',
        margin: 0
      }
    }, title)), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--fs-body)',
        maxWidth: '52ch'
      }
    }, children)));
  }
  function Landing({
    go
  }) {
    return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 72,
        paddingBottom: 64,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
        alignItems: 'center'
      },
      className: "rep-hero"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "r-eyebrow"
    }, "Self-hosted package registry"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'clamp(40px, 5vw, 60px)',
        lineHeight: 1.02,
        letterSpacing: '-0.03em'
      }
    }, "Sell your modules.", /*#__PURE__*/React.createElement("br", null), "Ship updates with one\xA0line."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-body-lg)',
        color: 'var(--text-muted)',
        maxWidth: '46ch'
      }
    }, "Repono is the registry for the Drupal modules, WordPress plugins and apps you build. Buyers run one ", /*#__PURE__*/React.createElement("span", {
      className: "r-mono",
      style: {
        color: 'var(--text-body)'
      }
    }, "composer require"), " and stay current automatically \u2014 on your release schedule, behind your license keys."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(I.Plug, null),
      onClick: () => go('pricing')
    }, "Start free trial"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "secondary",
      iconRight: /*#__PURE__*/React.createElement(I.ArrowRight, null),
      onClick: () => go('product')
    }, "See a live module")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginTop: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono-sm)',
        color: 'var(--text-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "1,240 installs"), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: .4
      }
    }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Drupal 10 \xB7 11"), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: .4
      }
    }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "composer + git"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 20,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Terminal, {
      name: "bash \u2014 acme.example",
      typeCommand: true,
      lines: [{
        type: 'comment',
        text: '# add the registry once, then require any module you\u2019ve bought'
      }, {
        type: 'command',
        text: 'composer require repono/acme-commerce'
      }, {
        type: 'output',
        text: 'Resolving dependencies from repono.dev …'
      }, {
        type: 'output',
        text: 'Verifying license RPN-9F2K-7T1A-QM4D …'
      }, {
        type: 'success',
        text: '\u2713 Installed acme/commerce v2.4.1 — license active, auto-update on'
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 360,
        maxWidth: '100%',
        marginLeft: 'auto'
      }
    }, /*#__PURE__*/React.createElement(LicenseCard, {
      product: "repono/acme-commerce",
      plan: "Team plan \xB7 5 domains",
      version: "v2.4.1",
      licenseKey: "RPN-9F2K-7T1A-QM4D",
      status: "active",
      heartbeatMeta: "active \xB7 12s ago",
      meta: "acme.example"
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--surface-raised)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)'
      }
    }, "Speaks your stack"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      mono: true
    }, "composer.json"), /*#__PURE__*/React.createElement(Tag, {
      mono: true
    }, "semver"), /*#__PURE__*/React.createElement(Tag, {
      mono: true
    }, "git tags"), /*#__PURE__*/React.createElement(Tag, {
      mono: true
    }, "SHA-256 checksums"), /*#__PURE__*/React.createElement(Tag, {
      mono: true
    }, "license API"), /*#__PURE__*/React.createElement(Tag, {
      mono: true
    }, "webhooks")))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 72,
        paddingBottom: 40,
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 48
      },
      className: "rep-how"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 88,
        alignSelf: 'start',
        display: 'grid',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "r-eyebrow"
    }, "From publish to paid"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-display-md)'
      }
    }, "Built around the manifest, not a marketplace."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        maxWidth: '36ch'
      }
    }, "Every release is a signed, versioned artifact. Buyers consume it the way they consume everything else \u2014 through the package manager they already trust.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepRow, {
      n: 1,
      icon: /*#__PURE__*/React.createElement(I.GitBranch, null),
      title: "Tag a release"
    }, "Push a git tag. Repono builds the artifact, computes its checksum, and writes the manifest. Stable, RC and beta channels map to your branches."), /*#__PURE__*/React.createElement(StepRow, {
      n: 2,
      icon: /*#__PURE__*/React.createElement(I.Key, null),
      title: "Set a price and a license"
    }, "Choose per-domain or per-seat. Each buyer gets a license key that gates installs and activations \u2014 no key, no update."), /*#__PURE__*/React.createElement(StepRow, {
      n: 3,
      icon: /*#__PURE__*/React.createElement(I.Refresh, null),
      title: "Updates ship themselves"
    }, "Buyers on auto-update pull the next stable release on your schedule. You see every activation and its last heartbeat in real time."))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 40,
        paddingBottom: 80
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "r-eyebrow"
    }, "Release history"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-display-sm)'
      }
    }, "Every version, every changelog \u2014 in the open.")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconRight: /*#__PURE__*/React.createElement(I.ArrowRight, null),
      onClick: () => go('product')
    }, "View full changelog")), /*#__PURE__*/React.createElement(VersionTable, {
      defaultOpen: 0,
      releases: D.releases.slice(0, 3)
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--surface-inverse)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        padding: '64px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 32,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        color: 'var(--white)',
        fontSize: 'var(--fs-display-md)'
      }
    }, "Put your first module on the registry."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-on-dark-muted)',
        maxWidth: '44ch'
      }
    }, "Free while you set it up. You only pay once buyers do.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      onClick: () => go('pricing')
    }, "Start free trial"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "ghost",
      onClick: () => go('cabinet'),
      className: "rep-cta-ghost"
    }, "Open your account")))));
  }
  window.RepLanding = Landing;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/repono/Pricing.jsx
try { (() => {
/* Repono UI kit — Pricing. Three plans, asymmetric emphasis on Team. Real
   feature copy, per-domain framing. */
(function () {
  const {
    Button,
    Badge,
    Card
  } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 24px'
  };
  function Plan({
    plan,
    go
  }) {
    const featured = plan.featured;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'grid',
        gap: 18,
        alignContent: 'start',
        background: 'var(--surface-card)',
        border: featured ? '1.5px solid var(--teal-600)' : '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '26px 24px',
        boxShadow: featured ? 'var(--shadow-md)' : 'none'
      }
    }, featured ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -11,
        left: 24
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "Most agencies pick this")) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-title)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, plan.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)'
      }
    }, plan.blurb)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 44,
        fontWeight: 600,
        letterSpacing: '-0.03em',
        color: 'var(--text-strong)'
      }
    }, "$", plan.price), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono-sm)',
        color: 'var(--text-subtle)'
      }
    }, plan.cadence), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono-xs)',
        color: 'var(--ochre-700)',
        background: 'var(--ochre-100)',
        border: '1px solid var(--ochre-200)',
        borderRadius: 'var(--radius-xs)',
        padding: '3px 7px'
      }
    }, plan.domains)), /*#__PURE__*/React.createElement(Button, {
      variant: featured ? 'primary' : 'secondary',
      onClick: () => go('cabinet')
    }, featured ? 'Start free trial' : 'Choose ' + plan.name), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: 'grid',
        gap: 11,
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 18
      }
    }, plan.features.map(f => /*#__PURE__*/React.createElement("li", {
      key: f,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        marginTop: 1,
        display: 'inline-flex',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(I.Check, null)), f))));
  }
  function Pricing({
    go
  }) {
    return /*#__PURE__*/React.createElement("main", {
      style: {
        paddingBottom: 88
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 64,
        paddingBottom: 16,
        display: 'grid',
        gap: 14,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "r-eyebrow"
    }, "Pricing"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--fs-display-lg)',
        maxWidth: '18ch'
      }
    }, "Priced per active domain. Staging is free."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-body-lg)',
        color: 'var(--text-muted)',
        maxWidth: '54ch'
      }
    }, "Every plan includes auto-updates, the license API, and the activation dashboard. Review and beta domains never count toward your seats.")), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        alignItems: 'start'
      },
      className: "rep-plans"
    }, D.plans.map(p => /*#__PURE__*/React.createElement(Plan, {
      key: p.id,
      plan: p,
      go: go
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 56
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-raised)',
        padding: '24px 26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-title)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(I.Shield, null)), "Self-hosted, on your terms"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--text-muted)',
        maxWidth: '60ch'
      }
    }, "Run the registry on your own infrastructure. Annual invoicing, SSO and a private channel for unreleased builds are available on Agency.")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconRight: /*#__PURE__*/React.createElement(I.ArrowRight, null),
      onClick: () => go('product')
    }, "Talk to us"))));
  }
  window.RepPricing = Pricing;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/repono/ProductPage.jsx
try { (() => {
/* Repono UI kit — Product page. Description, compatibility, install, plans link,
   and the full release history with expandable changelog. */
(function () {
  const {
    Terminal,
    VersionTable,
    Button,
    Badge,
    Tag,
    Card,
    Heartbeat
  } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 24px'
  };
  const P = D.product;
  function Meta({
    icon,
    label,
    value
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '11px 0',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--text-muted)',
        fontSize: 'var(--fs-body-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        fontSize: 15,
        color: 'var(--text-subtle)'
      }
    }, icon), label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono-sm)',
        color: 'var(--text-strong)'
      }
    }, value));
  }
  function ProductPage({
    go
  }) {
    return /*#__PURE__*/React.createElement("main", {
      style: {
        paddingBottom: 80
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--surface-card)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        padding: '40px 24px 32px',
        display: 'grid',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-mono-lg)',
        fontWeight: 500,
        color: 'var(--text-strong)'
      }
    }, P.owner, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-subtle)'
      }
    }, "/"), P.name), /*#__PURE__*/React.createElement(Badge, {
      tone: "version"
    }, P.latest), /*#__PURE__*/React.createElement(Badge, {
      tone: "active",
      dot: true
    }, "maintained")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-display-sm)',
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        color: 'var(--text-strong)',
        maxWidth: '20ch',
        lineHeight: 1.12
      }
    }, P.tagline), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, P.compat.map(c => /*#__PURE__*/React.createElement(Tag, {
      key: c,
      mono: true
    }, c))))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        paddingTop: 40,
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 40,
        alignItems: 'start'
      },
      className: "rep-product-grid"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 36,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-display-sm)'
      }
    }, "What it does"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-body-lg)',
        color: 'var(--text-body)',
        maxWidth: '64ch'
      }
    }, P.summary), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: '6px 0 0',
        padding: 0,
        listStyle: 'none',
        display: 'grid',
        gap: 10
      }
    }, ['Idempotent webhooks — replays never double-write', 'Per-store field mapping for multi-store Commerce', 'Replayable sync log you can audit and re-run', 'Signed releases with SHA-256 checksums'].map(t => /*#__PURE__*/React.createElement("li", {
      key: t,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        fontSize: 'var(--fs-body)',
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        marginTop: 2,
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(I.Check, null)), t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-display-sm)'
      }
    }, "Release history"), /*#__PURE__*/React.createElement(VersionTable, {
      defaultOpen: 0,
      releases: D.releases
    }))), /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'sticky',
        top: 84,
        display: 'grid',
        gap: 20
      },
      className: "rep-product-aside"
    }, /*#__PURE__*/React.createElement(Card, {
      raised: true,
      flushBody: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-5)',
        display: 'grid',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)'
      }
    }, "Install"), /*#__PURE__*/React.createElement(Terminal, {
      name: "bash",
      lines: [{
        type: 'command',
        text: 'composer require repono/acme-commerce'
      }]
    }), /*#__PURE__*/React.createElement(Button, {
      iconLeft: /*#__PURE__*/React.createElement(I.Plug, null),
      onClick: () => go('pricing')
    }, "Connect module"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-caption)',
        color: 'var(--text-subtle)',
        margin: 0
      }
    }, "Requires a license key. Start a free trial to get one."))), /*#__PURE__*/React.createElement(Card, {
      title: "Details"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid'
      }
    }, /*#__PURE__*/React.createElement(Meta, {
      icon: /*#__PURE__*/React.createElement(I.Layers, null),
      label: "Platform",
      value: P.platform
    }), /*#__PURE__*/React.createElement(Meta, {
      icon: /*#__PURE__*/React.createElement(I.Terminal, null),
      label: "Runtime",
      value: P.php
    }), /*#__PURE__*/React.createElement(Meta, {
      icon: /*#__PURE__*/React.createElement(I.Download, null),
      label: "Installs",
      value: P.installs
    }), /*#__PURE__*/React.createElement(Meta, {
      icon: /*#__PURE__*/React.createElement(I.Key, null),
      label: "License",
      value: "Per-domain"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--fs-body-sm)'
      }
    }, "Latest build"), /*#__PURE__*/React.createElement(Heartbeat, {
      status: "active",
      label: "passing",
      meta: "2h ago"
    })))))));
  }
  window.RepProductPage = ProductPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/ProductPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/repono/data.js
try { (() => {
/* Repono UI kit — sample data. Attached to window.RepData. Real, concrete copy
   (no lorem). One illustrative publisher: "acme/commerce-sync". */
window.RepData = {
  product: {
    owner: 'acme',
    name: 'commerce-sync',
    slug: 'acme/commerce-sync',
    tagline: 'Two-way order & stock sync between Drupal Commerce and your ERP.',
    summary: 'Keeps orders, stock levels and fulfilment status in lockstep across Drupal Commerce and SAP, NetSuite or a custom ERP. Idempotent webhooks, replayable sync log, zero double-writes.',
    latest: 'v2.4.1',
    platform: 'Drupal 10 · 11',
    php: 'PHP 8.2+',
    license: 'Per-domain subscription',
    installs: '1,240',
    compat: ['drupal/core ^10.2', 'drupal/commerce ^2.38', 'PHP 8.2', 'PHP 8.3']
  },
  releases: [{
    version: 'v2.4.1',
    date: '2026-06-02',
    channel: 'stable',
    summary: 'Fix license refresh race on slow networks',
    changes: [{
      type: 'fixed',
      text: 'License key refresh no longer double-fires when the heartbeat is delayed past 30s'
    }, {
      type: 'fixed',
      text: 'Stock deltas below 1 unit are no longer rounded to zero'
    }, {
      type: 'changed',
      text: 'Heartbeat interval relaxed from 30s to 60s to cut activation noise'
    }]
  }, {
    version: 'v2.4.0',
    date: '2026-05-12',
    channel: 'stable',
    summary: 'Replayable sync log + per-store mapping',
    changes: [{
      type: 'added',
      text: 'Replay any failed sync from the admin log without re-importing the order'
    }, {
      type: 'added',
      text: 'Per-store field mapping for multi-store Commerce setups'
    }, {
      type: 'changed',
      text: 'Webhook signing now uses SHA-256 (HS256 deprecated, removed in v3)'
    }]
  }, {
    version: 'v3.0.0-rc.2',
    date: '2026-05-20',
    channel: 'rc',
    summary: 'Drupal 11 compatibility, second candidate',
    changes: [{
      type: 'added',
      text: 'Drupal 11 support behind the d11_compat flag'
    }, {
      type: 'removed',
      text: 'HS256 webhook signing (deprecated since v2.4.0)'
    }]
  }, {
    version: 'v2.3.0',
    date: '2026-04-28',
    channel: 'stable',
    summary: 'Per-domain activation limits',
    changes: [{
      type: 'added',
      text: 'Cap activations per license and see which domain holds each seat'
    }]
  }],
  plans: [{
    id: 'solo',
    name: 'Solo',
    price: 19,
    cadence: '/mo',
    domains: '1 domain',
    blurb: 'For a single production site you maintain yourself.',
    features: ['1 active domain', 'Auto-updates on the stable channel', 'Email support, 2 business days', 'Replayable sync log']
  }, {
    id: 'team',
    name: 'Team',
    price: 59,
    cadence: '/mo',
    domains: '5 domains',
    featured: true,
    blurb: 'For agencies running a handful of client sites.',
    features: ['5 active domains', 'Stable + RC channels', 'Priority support, same business day', 'Per-store field mapping', 'Staging activations don\u2019t count']
  }, {
    id: 'agency',
    name: 'Agency',
    price: 149,
    cadence: '/mo',
    domains: '25 domains',
    blurb: 'For shops shipping at scale across many clients.',
    features: ['25 active domains', 'All channels incl. beta', 'Shared license keys for your team', 'SSO heartbeat dashboard', 'Invoiced annually on request']
  }],
  licenses: [{
    product: 'acme/commerce-sync',
    plan: 'Team plan \u00b7 5 domains',
    version: 'v2.4.1',
    key: 'RPN-9F2K-7T1A-QM4D',
    status: 'active',
    meta: 'acme.example',
    heartbeat: 'active \u00b7 12s ago'
  }, {
    product: 'acme/seo-redirects',
    plan: 'Solo plan \u00b7 1 domain',
    version: 'v1.8.0',
    key: 'RPN-3J7P-5M2C-W8XR',
    status: 'idle',
    meta: 'staging.acme.example',
    heartbeat: 'idle \u00b7 4h ago'
  }],
  activations: [{
    domain: 'acme.example',
    env: 'production',
    license: 'RPN-9F2K\u2026QM4D',
    status: 'active',
    last: '12s ago'
  }, {
    domain: 'www.acme.example',
    env: 'production',
    license: 'RPN-9F2K\u2026QM4D',
    status: 'active',
    last: '31s ago'
  }, {
    domain: 'staging.acme.example',
    env: 'staging',
    license: 'RPN-9F2K\u2026QM4D',
    status: 'stale',
    last: '4h ago'
  }, {
    domain: 'review-812.acme.dev',
    env: 'review',
    license: 'RPN-9F2K\u2026QM4D',
    status: 'down',
    last: '6d ago'
  }],
  invoices: [{
    id: 'RPN-2026-0612',
    date: '2026-06-12',
    amount: '$59.00',
    status: 'paid',
    desc: 'Team plan \u00b7 Jun 2026'
  }, {
    id: 'RPN-2026-0512',
    date: '2026-05-12',
    amount: '$59.00',
    status: 'paid',
    desc: 'Team plan \u00b7 May 2026'
  }, {
    id: 'RPN-2026-0412',
    date: '2026-04-12',
    amount: '$59.00',
    status: 'paid',
    desc: 'Team plan \u00b7 Apr 2026'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/data.js", error: String((e && e.message) || e) }); }

// ui_kits/repono/icons.jsx
try { (() => {
/* Repono UI kit — shared icon set (Lucide-style line icons, 1.75 stroke).
   Attached to window.RepIcons so every screen script can read them. */
(function () {
  const S = paths => props => React.createElement('svg', Object.assign({
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    width: '1em',
    height: '1em'
  }, props), paths.map((d, i) => React.createElement('path', {
    key: i,
    d
  })));
  const Multi = children => props => React.createElement('svg', Object.assign({
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    width: '1em',
    height: '1em'
  }, props), children);
  window.RepIcons = {
    Terminal: S(['m7 11 2-2-2-2', 'M11 13h4']).bind ? S(['m4 17 6-6-6-6', 'M12 19h8']) : null,
    Package: Multi([React.createElement('path', {
      key: 1,
      d: 'm7.5 4.27 9 5.15'
    }), React.createElement('path', {
      key: 2,
      d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'
    }), React.createElement('path', {
      key: 3,
      d: 'm3.3 7 8.7 5 8.7-5'
    }), React.createElement('path', {
      key: 4,
      d: 'M12 22V12'
    })]),
    Key: Multi([React.createElement('path', {
      key: 1,
      d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L21 5'
    }), React.createElement('path', {
      key: 2,
      d: 'm21 2-9.6 9.6'
    }), React.createElement('circle', {
      key: 3,
      cx: '7.5',
      cy: '15.5',
      r: '5.5'
    })]),
    Shield: Multi([React.createElement('path', {
      key: 1,
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'
    }), React.createElement('path', {
      key: 2,
      d: 'm9 12 2 2 4-4'
    })]),
    Refresh: Multi([React.createElement('path', {
      key: 1,
      d: 'M3 12a9 9 0 0 1 15-6.7L21 8'
    }), React.createElement('path', {
      key: 2,
      d: 'M21 3v5h-5'
    }), React.createElement('path', {
      key: 3,
      d: 'M21 12a9 9 0 0 1-15 6.7L3 16'
    }), React.createElement('path', {
      key: 4,
      d: 'M3 21v-5h5'
    })]),
    Check: S(['M20 6 9 17l-5-5']),
    ArrowRight: Multi([React.createElement('path', {
      key: 1,
      d: 'M5 12h14'
    }), React.createElement('path', {
      key: 2,
      d: 'm12 5 7 7-7 7'
    })]),
    ChevronDown: S(['m6 9 6 6 6-6']),
    ChevronRight: S(['m9 18 6-6-6-6']),
    Copy: Multi([React.createElement('rect', {
      key: 1,
      width: '14',
      height: '14',
      x: '8',
      y: '8',
      rx: '2'
    }), React.createElement('path', {
      key: 2,
      d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
    })]),
    Card: Multi([React.createElement('rect', {
      key: 1,
      width: '20',
      height: '14',
      x: '2',
      y: '5',
      rx: '2'
    }), React.createElement('path', {
      key: 2,
      d: 'M2 10h20'
    })]),
    Globe: Multi([React.createElement('circle', {
      key: 1,
      cx: '12',
      cy: '12',
      r: '10'
    }), React.createElement('path', {
      key: 2,
      d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20'
    }), React.createElement('path', {
      key: 3,
      d: 'M2 12h20'
    })]),
    Receipt: Multi([React.createElement('path', {
      key: 1,
      d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z'
    }), React.createElement('path', {
      key: 2,
      d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8'
    }), React.createElement('path', {
      key: 3,
      d: 'M12 17.5v1.5M12 6v1.5'
    })]),
    Layers: Multi([React.createElement('path', {
      key: 1,
      d: 'm12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z'
    }), React.createElement('path', {
      key: 2,
      d: 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65'
    }), React.createElement('path', {
      key: 3,
      d: 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'
    })]),
    GitBranch: Multi([React.createElement('line', {
      key: 1,
      x1: '6',
      x2: '6',
      y1: '3',
      y2: '15'
    }), React.createElement('circle', {
      key: 2,
      cx: '18',
      cy: '6',
      r: '3'
    }), React.createElement('circle', {
      key: 3,
      cx: '6',
      cy: '18',
      r: '3'
    }), React.createElement('path', {
      key: 4,
      d: 'M18 9a9 9 0 0 1-9 9'
    })]),
    Plug: Multi([React.createElement('path', {
      key: 1,
      d: 'M12 22v-5'
    }), React.createElement('path', {
      key: 2,
      d: 'M9 7V2'
    }), React.createElement('path', {
      key: 3,
      d: 'M15 7V2'
    }), React.createElement('path', {
      key: 4,
      d: 'M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z'
    })]),
    Zap: S(['M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z']),
    Gauge: Multi([React.createElement('path', {
      key: 1,
      d: 'm12 14 4-4'
    }), React.createElement('path', {
      key: 2,
      d: 'M3.34 19a10 10 0 1 1 17.32 0'
    })]),
    Lock: Multi([React.createElement('rect', {
      key: 1,
      width: '18',
      height: '11',
      x: '3',
      y: '11',
      rx: '2'
    }), React.createElement('path', {
      key: 2,
      d: 'M7 11V7a5 5 0 0 1 10 0v4'
    })]),
    Search: Multi([React.createElement('circle', {
      key: 1,
      cx: '11',
      cy: '11',
      r: '8'
    }), React.createElement('path', {
      key: 2,
      d: 'm21 21-4.3-4.3'
    })]),
    Download: Multi([React.createElement('path', {
      key: 1,
      d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'
    }), React.createElement('path', {
      key: 2,
      d: 'M7 10l5 5 5-5'
    }), React.createElement('path', {
      key: 3,
      d: 'M12 15V3'
    })]),
    Clock: Multi([React.createElement('circle', {
      key: 1,
      cx: '12',
      cy: '12',
      r: '10'
    }), React.createElement('path', {
      key: 2,
      d: 'M12 6v6l4 2'
    })])
  };
  // Fix Terminal icon (clean prompt glyph)
  window.RepIcons.Terminal = Multi([React.createElement('path', {
    key: 1,
    d: 'm4 17 6-6-6-6'
  }), React.createElement('path', {
    key: 2,
    d: 'M12 19h8'
  })]);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/repono/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.LicenseCard = __ds_scope.LicenseCard;

__ds_ns.Terminal = __ds_scope.Terminal;

__ds_ns.VersionTable = __ds_scope.VersionTable;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Heartbeat = __ds_scope.Heartbeat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Card = __ds_scope.Card;

})();
