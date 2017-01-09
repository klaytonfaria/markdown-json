---
section: Grunt
title: Tasks and modules
description: All of Grunt tasks and modules used on Webstore app
---

All of our grunt tasks are registered by yaml pattern (founds on /app/AzkabanStore-frontend/webstore/config/grunt/aliases.yaml). Follow bellow the table with all registered tasks:

# Environment variables

Some tasks needs of environment variables values to know the target, version or device that should be executed.  

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Variable name</th>

<th class="confluenceTh">description</th>

<th colspan="1" class="confluenceTh">applicable values</th>

<th colspan="1" class="confluenceTh">default value</th>

<th class="confluenceTh">attribution example</th>

</tr>

<tr>

<td class="confluenceTd">env</td>

<td class="confluenceTd">Set current environment </td>

<td colspan="1" class="confluenceTd">dev | qa | stg | prod</td>

<td colspan="1" class="confluenceTd">qa</td>

<td class="confluenceTd">--env=dev</td>

</tr>

<tr>

<td class="confluenceTd">device</td>

<td class="confluenceTd">Set current device</td>

<td colspan="1" class="confluenceTd">desktop | mobile</td>

<td colspan="1" class="confluenceTd">desktop,mobile</td>

<td class="confluenceTd">--device=desktop</td>

</tr>

<tr>

<td class="confluenceTd">builderVersion</td>

<td class="confluenceTd">Set assets package version</td>

<td colspan="1" class="confluenceTd">semver tag</td>

<td colspan="1" class="confluenceTd">NONE</td>

<td class="confluenceTd">--bulderVersion=2.5.6</td>

</tr>

</tbody>

</table>

**  
Grunt task with params example:**  

The example bellow, should build all assets with the development path and properties and with your assets package on 2.2.2 version.

<table class="wysiwyg-macro" data-macro-name="code" data-macro-parameters="language=bash|linenumbers=true|theme=Midnight|title=Grunt task example" style="background-image: url(/plugins/servlet/confluence/placeholder/macro-heading?definition=e2NvZGU6dGl0bGU9R3J1bnQgdGFzayBleGFtcGxlfHRoZW1lPU1pZG5pZ2h0fGxpbmVudW1iZXJzPXRydWV8bGFuZ3VhZ2U9YmFzaH0&amp;locale=en_GB&amp;version=2); background-repeat: no-repeat;" data-macro-body-type="PLAIN_TEXT">

<tbody>

<tr>

<td class="wysiwyg-macro-body">

<pre>grunt build --env=dev --builderVersion=2.2.2</pre>

</td>

</tr>

</tbody>

</table>

# Common tasks

<span style="color: rgb(0,0,0);">Tasks used for others tasks and process.  
 </span>

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Task name</th>

<th colspan="1" class="confluenceTh"><span style="color: rgb(0,0,0);">Task description</span></th>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Sub-tasks</span></th>

</tr>

<tr>

<td class="confluenceTd">default</td>

<td colspan="1" class="confluenceTd"><span>Run the default task when call grunt without a task name.</span></td>

<td class="confluenceTd">

<table style="line-height: 1.42857;" class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span>Sub-task name</span></th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd"><span>watch</span></td>

<td class="confluenceTd"><span>Run predefined tasks whenever watched files change.</span></td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td class="confluenceTd">preCommit</td>

<td colspan="1" class="confluenceTd">

<span>Run when the pre-commit git hook is called</span>

</td>

<td class="confluenceTd">

<table style="line-height: 1.42857;" class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Sub-task name</th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd"><span>jshint</span></td>

<td class="confluenceTd">Validate js with jshint</td>

</tr>

<tr>

<td class="confluenceTd"><span>plato:global</span></td>

<td class="confluenceTd">

Generate complexity analysis reports with plato

</td>

</tr>

<tr>

<td class="confluenceTd"><span>karma:desktop</span></td>

<td class="confluenceTd">Karma test runer for desktop scripts device</td>

</tr>

<tr>

<td class="confluenceTd"><span>karma:mobile</span></td>

<td class="confluenceTd"><span>Karma test runer for mobile scripts device</span></td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">notify:test</td>

<td colspan="1" class="confluenceTd">Notify when karma has finished</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">postInstall</td>

<td colspan="1" class="confluenceTd">Run after npm modules has installed</td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Sub-task name</span></th>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">sub-task description</span></th>

</tr>

<tr>

<td class="confluenceTd">clean:hooks</td>

<td class="confluenceTd">Clean all local git hooks</td>

</tr>

<tr>

<td class="confluenceTd">shell:environment</td>

<td class="confluenceTd">Install all environments dependencies</td>

</tr>

<tr>

<td class="confluenceTd">build:env=dev</td>

<td class="confluenceTd">Run the development build taks</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">preInstall</td>

<td colspan="1" class="confluenceTd"><span>Run before npm modules installation</span></td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Sub-task name</span></th>

<th class="confluenceTh"><span>sub-task description</span></th>

</tr>

<tr>

<td class="confluenceTd">shell:installDependencies</td>

<td class="confluenceTd">Install all app dependencies. (Ex. fontforge)</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">test</td>

<td colspan="1" class="confluenceTd">Run karma tests</td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span>Sub-task name</span></th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd">karma:desktop</td>

<td class="confluenceTd"><span>Karma test runer for desktop scripts device</span></td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">karma:mobile</td>

<td colspan="1" class="confluenceTd"><span>Karma test runer for mobile scripts device</span></td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">notify:test</td>

<td colspan="1" class="confluenceTd"><span>Notify when karma has finished</span></td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">report</td>

<td colspan="1" class="confluenceTd">Build all analyses and documentation reports</td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Sub-task name</th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd">karma</td>

<td class="confluenceTd">Karma test runer</td>

</tr>

<tr>

<td class="confluenceTd">plato</td>

<td class="confluenceTd"><span>Generate complexity analysis reports with plato</span></td>

</tr>

<tr>

<td class="confluenceTd">yuidoc</td>

<td class="confluenceTd">Generate YUIdocs</td>

</tr>

</tbody>

</table>

</td>

</tr>

</tbody>

</table>

# Vendor tasks

Tasks to build all vendor assets  

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Task name</th>

<th class="confluenceTh">description</th>

<th colspan="1" class="confluenceTh">Sub-tasks</th>

</tr>

<tr>

<td class="confluenceTd">buildOmniture</td>

<td class="confluenceTd">Build all omniture scripts</td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Sub-task name</th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd">concat:desktopOmniture</td>

<td class="confluenceTd">Concat all omniture desktop scripts</td>

</tr>

<tr>

<td class="confluenceTd">concat:mobileOmniture</td>

<td class="confluenceTd"><span>Concat all omniture mobile scripts</span></td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">uglify:desktopOmniture</td>

<td colspan="1" class="confluenceTd"><span>Uglify all omniture desktop scripts</span></td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">uglify:mobileOmniture</td>

<td colspan="1" class="confluenceTd"><span>Uglify all omniture mobile scripts</span></td>

</tr>

</tbody>

</table>

</td>

</tr>

</tbody>

</table>

# Dist tasks

Table with tasks that give support to build tasks creating our distribution files

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Task name</span></th>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">description</span></th>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Sub-tasks</span></th>

</tr>

<tr>

<td class="confluenceTd">dist</td>

<td class="confluenceTd"><span>Create a dist of Webstore assets and templates   
for all environments  <span>(</span>_qa_<span>,</span> _stg_ <span>and</span> _prod_<span>)</span></span></td>

<td class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Sub-task name</span></th>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">sub-task description</span></th>

</tr>

<tr>

<td class="confluenceTd">build:scripts</td>

<td class="confluenceTd">Run build tasks to scripts</td>

</tr>

<tr>

<td class="confluenceTd">replace:templateEnvironment</td>

<td class="confluenceTd">Replace environment label on script</td>

</tr>

<tr>

<td class="confluenceTd">copy:distStaticDesktop</td>

<td class="confluenceTd">Create desktop dist directory for statics</td>

</tr>

<tr>

<td class="confluenceTd">copy:distStaticMobile</td>

<td class="confluenceTd"><span>Create mobile dist directory <span>for statics</span></span></td>

</tr>

<tr>

<td class="confluenceTd">copy:distTemplate</td>

<td class="confluenceTd"><span>Create dist directory</span> <span>for templates</span></td>

</tr>

<tr>

<td class="confluenceTd">replace:stylePathsDesktop</td>

<td class="confluenceTd">Replace styles path on templates for desktop</td>

</tr>

<tr>

<td class="confluenceTd">replace:stylePathsMobile</td>

<td class="confluenceTd"><span>Replace styles path on templates for mobile</span></td>

</tr>

<tr>

<td class="confluenceTd">replace:insertTag</td>

<td class="confluenceTd"><span>Replace package version on templates</span></td>

</tr>

<tr>

<td class="confluenceTd">dustjs</td>

<td class="confluenceTd">Compile dust templates for all environments</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td class="confluenceTd">dist:dev</td>

<td class="confluenceTd"><span>Create a dist of Webstore assets and templates</span>   
<span>for development environment</span></td>

</tr>

<tr>

<td class="confluenceTd">dist:qa</td>

<td class="confluenceTd"><span>Create a dist of Webstore assets and templates</span>   
<span>for qa environment</span></td>

</tr>

<tr>

<td class="confluenceTd">dist:stg</td>

<td class="confluenceTd"><span>Create a dist of Webstore assets and templates</span>   
<span>for staging environment</span></td>

</tr>

<tr>

<td class="confluenceTd">dist:prod</td>

<td class="confluenceTd"><span>Create a dist of Webstore assets and templates</span>   
<span>for production environment</span></td>

</tr>

</tbody>

</table>

# Build tasks

Table with all tasks that should build Webstore assets  

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Task name</th>

<th class="confluenceTh">description</th>

<th colspan="1" class="confluenceTh">Sub-tasks</th>

</tr>

<tr>

<td class="confluenceTd">build</td>

<td class="confluenceTd">Build Webstore assets and templates</td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Sub-task name</th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd">build:desktop</td>

<td class="confluenceTd"><span>Build all Webstore assets and templates for desktop device</span></td>

</tr>

<tr>

<td class="confluenceTd">build:mobile</td>

<td class="confluenceTd"><span>Build all Webstore assets and templates for mobile device</span></td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">dist</td>

<td colspan="1" class="confluenceTd">Generate dist folder with built files</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">buildAssets</td>

<td colspan="1" class="confluenceTd">Run build task for all environments (_qa_, _stg_ and _prod_)</td>

<td colspan="1" class="confluenceTd">

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh"><span style="color: rgb(0,0,0);">Sub-task name</span></th>

<th class="confluenceTh">sub-task description</th>

</tr>

<tr>

<td class="confluenceTd">shell:buildAssets</td>

<td class="confluenceTd"><span>Run build task for all environments <span>(</span>_qa_<span>,</span> _stg_ <span>and</span> _prod_<span>)</span></span></td>

</tr>

</tbody>

</table>

</td>

</tr>

</tbody>

</table>

<div><span style="white-space: pre-wrap;">  
</span></div>
