(function() {
  const eventNodes = new WeakMap();

  function parseEvents(events = '') {
    return events
      ? events.split(' ').filter((val, i, arr) => arr.indexOf(val) === i)
      : [];
  }

  function trigger(eventList, options) {
    const events = parseEvents(eventList);
    this.forEach((node) => {
      events.forEach((event) => {
        // eslint-disable-next-line no-undef
        const createdEvent = new Event(event, options);
        node.dispatchEvent(createdEvent);
      });
    });
  }

  function removeEvents(eventList) {
    const events = parseEvents(eventList);
    this.forEach((node) => {
      const nodeEvents = eventNodes.get(node);
      for (const event in nodeEvents) {
        if (!events.length || events.includes(event)) {
          nodeEvents[event].forEach((handler) => {
            node.removeEventListener(event, handler);
          });
          delete nodeEvents[event];
        }
      }
    });
  }

  function addEvent(node, event, handler, {once, delegateSelector}) {
    function callback(ev) {
      if (delegateSelector && !ev.target.matches(delegateSelector)) {
        return;
      }

      handler(ev);

      if (once) {
        node.removeEventListener(event, callback);
      }
    }

    node.addEventListener(event, callback);

    if (!once) {
      const nodeEvents = eventNodes.get(node) || {};
      nodeEvents[event] = nodeEvents[event] || [];
      nodeEvents[event].push(callback);
      eventNodes.set(node, nodeEvents);
    }
  }

  function addEvents(options, ...args) {
    const argLen = args.length;
    const events = parseEvents(args[0]);
    const handler = args[argLen - 1];
    let delegateSelector;

    if (argLen === 3) {
      delegateSelector = args[1];
    }

    this.forEach((node) => {
      events.forEach((event) => {
        addEvent(
          node,
          event,
          handler,
          Object.assign({}, options, {delegateSelector}),
        );
      });
    });
  }

  function addNodes(selector) {
    // eslint-disable-next-line no-undef
    const nodes = document.querySelectorAll(selector);
    if (!nodes) {
      return;
    }

    for (const node of nodes) {
      this.nodes.add(node);
    }
  }

  function Eventing(selector) {
    this.nodes = new Set();
    this.add(selector);
    return this;
  }

  Eventing.prototype.forEach = function(cb) {
    this.nodes.forEach(cb);
    return this;
  };

  Eventing.prototype.add = function(selector) {
    addNodes.call(this, selector);
    return this;
  };

  Eventing.prototype.on = function(...args) {
    addEvents.call(this, {}, ...args);
    return this;
  };

  Eventing.prototype.off = function(events) {
    removeEvents.call(this, events);
    return this;
  };

  Eventing.prototype.once = function(...args) {
    addEvents.call(this, {once: true}, ...args);
    return this;
  };

  Eventing.prototype.trigger = function(events, options) {
    trigger.call(this, events, options);
    return this;
  };

  function eventing(selector) {
    return new Eventing(selector);
  }

  this.eventing = eventing;
  return eventing;
})();
