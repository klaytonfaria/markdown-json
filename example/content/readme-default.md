# AzkabanStore.com
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum cum similique assumenda sit nam officiis culpa ipsum fugit explicabo, commodi molestiae, quibusdam, unde voluptatum doloribus. Eius quidem, blanditiis dolorum qui.
 Nemo blanditiis eos voluptates doloremque maiores excepturi tempore, rerum quas provident iste repudiandae laborum, veniam illo, distinctio non assumenda doloribus? Eum ad labore temporibus accusantium unde reiciendis quos officiis veniam.
 Quibusdam sunt explicabo illo quam ipsam, provident, voluptate ea corporis blanditiis magni vitae adipisci suscipit error nulla doloremque corrupti tempora labore. Enim illum repellendus ipsa, tempore ducimus iusto voluptatem dolore.

## Some tips

### Clonning repository

To clone the main repository and all of your submodules, type the code on terminal:

```sh
mkdir -p /app/AzkabanStore-frontend/
cd /app/AzkabanStore-frontend/
git clone --recursive https://gitlab.wmxp.com.br/webstore-frontend/webstore.git
```

### Adding a new submodule
```sh
git submodule add <repository.git> <target path>
git add <target path>
git commit -m "Creating your commit message for a new submodule"
```

### Remove a submodule
* Delete the section from the .gitmodules file. Like this:
```
[submodule "vendor"]
	path = vendor
	url = git://repo.com/some-project/some-repo.git
```
* Stage the .gitmodules changes.
```sh
git add .gitmodules
```

* Delete the section from .git/config. Like this:
```
[submodule "vendor"]
	url = git://repo.com/some-project/some-repo.git
```
* Remove cache from .git
```sh
git rm --cached path/to/submodule .
```
* Remove module from .git
```sh
.git/modules/submodule_name
```
* Commit the changes
* Delete the untracked submodule files
```sh
rm -rf path/to/submodule
```

### Updating submodules
```sh
cd /app/AzkabanStore-frontend/webstore
git submodule update --init --recursive
```

### Updating submodules flow
* Make the commit on submodule repository and push it to remote branch
* Create npm tag on submodule repository (semver)
* Go to webstore repository (/app/AzkabanStore-frontend/webstore) and commit (and push) the new submodule commit reference

```sh
cd /app/AzkabanStore-frontend/webstore/assets/components/checkout
git add some-file.js
git commit -m "Creating your commit message"
git push origin master
cd ../../../
git status
git add assets/components/checkout
git commit -m "Creating your commit message"
git push origin master
```
