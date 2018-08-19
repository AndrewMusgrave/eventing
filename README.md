# Eventing

A lightweight, minimal (~.650kb) JavaScript events library mimicking jquery. But Eventing well let you keep your blazing fast loading speeds.

## TODO

- Fix pack imports
- Add tests
- Improve docs

## Installation

Use `npm` or `yarn`.

```
yarn add eventing
```

```
npm i -s eventing
```

Usage by CDN

```
https://unpkg.com/eventing@0.1.0/lib/eventing.js
```

## Api

The core of `eventing` runs on a few main functions; `eventing`, `add`, `on`, `off`, `once`, and `trigger`.

#### Eventing

Used to created `eventing` objects.

```js
const buttons = eventing('button');
```

###### Type

`selector` - A selector used to query the document

```ts
eventing(selector: string): Eventing
```

#### Add

Used to add nodes to an `eventing` object.

```js
const buttons = eventing();
buttons.add('button');
```

###### Type

`selector` - A selector used to query the document

```ts
add(selector: string): Eventing
```

#### On / Once

Registers a single or multiple events.

```js
const buttons = eventing('button').on('click', () => console.log('clicked'));
const input = eventing('div').once('click focus', 'button', () =>
  console.log('clicked or focused'),
);
```

###### Type

`events` - A string of events to register
`delegatedTarget` - Optional selector for a delegated target
`handler` - Handler registered for the event or events

```ts
on(events: string, delegatedTarget?: string, handler: Function): Eventing
```

#### Off

Unregisters events

```js
buttons.off();
buttons.off('click');
buttons.off('click focus');
```

###### Type

`NO ARGS` - Unregisters all events associated with an eventing object
`events` - A string of events to unregister

```ts
off(events?: string): Eventing
```

#### Trigger

Triggers events

```js
eventing('button')
  .on('click', () => console.log('clicked'))
  .trigger('click');
```

###### Type

`events` - A string of events to unregister
`options` - Options used to created

```ts
trigger(events: string, options: Object): Eventing
```
