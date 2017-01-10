---
section: Elements
title: buttons
date: 2012-12-07
device: 
- desktop
- mobile
tags:
- tag1
- tag2
- tag3
- tag4
- tag5
styles: 
- https://lalao.com/styles/structure.min.css
- https://lalao.com/styles/app.min.css
---

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


Base button layout sample:

<button type="button" class="buy-button btn btn-warning">
  <span class="icon"></span>
  <span class="text">Button</span>
</button>

~~~scss
.btn-warning {
  @include states(#F6B428, #E3A522);
}
~~~

~~~html
<button type="button" class="buy-button btn btn-warning">
  <span class="icon"></span>
  <span class="text">Button</span>
</button>
~~~
