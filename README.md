# @bigbinary/neeto-hotkeys

The `neeto-hotkeys` package provides the `useHotKeys` hook, a versatile utility for managing hotkeys in an application.
This hook allows you to define specific hotkey combinations and associate them with corresponding handler functions.
The associated handler is invoked upon pressing the configured hotkey(s), enabling you to execute actions in response to keyboard input.

## Installation

```zsh
yarn add @bigbinary/neeto-hotkeys
```

### Arguments that the `useHotKeys` hook accepts:

- `hotkey`: A string specifying the hotkey(s) to listen for. Hotkeys can be
  defined in three formats: `sequential`, `simultaneous` & `single`.

  1.  Sequential: Any keys separated by a space are considered sequential. The
      handler is invoked when the user presses the keys in sequence. For
      example, `s r` means that when the user presses `s` followed by an `r` the
      corresponding `handler` will be invoked.
  2.  Simultaneous: Simultaneous hotkeys require all specified keys to be
      pressed at the same time to trigger the handler. For example,
      `command+shift+r` means that when `command`, `shift`, `r` are pressed at
      the same time the handler will be invoked.
  3.  Single: As the name indicates, this denotes single keys like `r` , `k`,
      `return` etc. Whenever `r` is pressed its corresponding handler will be
      called.

  The hotkey should be in MacOS format, the hook will take care of converting it
  to the users platform(eg: command -> ctrl for windows).

  If we want to bind multiple hotkeys to the same handler we can pass in an
  array like so `useHotkeys(['a', 'b'], handler)`.

- `handler`: The function that should be invoked when the hotkey is pressed.

  Handler will receive the original key `event`. This can be used to stop the
  default browser action like so `event.preventDefault()`.

- `config`: A config object which has 3 properties `mode`, `unbindOnUnmount` &
  `enabled`.
  1.  mode: The available values for mode are `default`, `global` & `scoped`.
      - default: It is the default mode. Handlers will only be called if the
        user is outside of a textarea, input, or select element.
      - global: Handlers will be fired even if the user is inside form elements
        like textarea.
      - scoped: It is used for scoping a hotkey to a DOM element. You can use
        this option if you want to invoke the handlers only if the user is
        focused in a specific `div`, `button`, `textarea` and so on. When this
        mode is set the hook will return a `ref`, you need to attached that
        `ref` to the element to which you need to scope the hotkey.
  2.  unbindOnUnmount: By default its value will be `true`. If you don't want a
      handler to be unregistered when a component is unmounted then set the
      value to `false`.
  3.  enabled: By default its value will be `true`. Setting this to `false` will
      not register the hotkey.

- `externalDocument`: This is an optional argument. If you want to listen to
  hotkeys on an external document(eg: iframe) then you can pass the reference of
  the document here. If this is not passed then the hook will listen to the
  hotkeys on the current document only.

### Return value:

- `inputRef`: A `ref` which needs to be attached to the input element to be
  listened to.

### Usage:

Following illustrates the usage of `useHotKeys` hook in implementing shortcut for
Sidebar opening.

```jsx
import useHotKeys from "@bigbinary/neeto-hotkeys";

// openSidebar function will only be called if the user is focused inside the textarea and performs the key combination.
const ref = useHotKeys("command+shift+r", openSidebar, {
  mode: "scoped",
});

return (
  <div>
    <div>Hello world</div>
    <textarea ref={ref}></textarea>
  </div>
);
```

Hotkeys are a fundamental aspect of many applications, enhancing user efficiency
and interactivity. The useHotKeys hook simplifies the implementation of these
hotkeys by allowing you to specify the hotkey combinations in various formats,
associated handlers, and configuration options.
