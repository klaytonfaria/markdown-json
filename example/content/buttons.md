---
section: Elements
title: buttons
date: 2012-12-07
device: desktop, tablet
styles: https://static.wmobjects.com.br/webstore/style/structure.min.css
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
