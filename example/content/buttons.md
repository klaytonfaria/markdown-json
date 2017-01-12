---
section: Elements
title: buttons
device: 
- desktop
- mobile
styles: 
- https://lalao.com/styles/structure.min.css
- https://lalao.com/styles/app.min.css
---

Follow some application examples of buttons

Types
============

### Base

Base button layout sample:

<button type="button" class="buy-button btn btn-success">
  <span class="icon"></span>
  <span class="text">Button</span>
</button>

~~~scss
.btn-primary {
  @include states(#1A75CE, #086B9C);
}
~~~

~~~html
<button type="button" class="buy-button btn btn-success">
  <span class="icon"></span>
  <span class="text">Button</span>
</button>
~~~
