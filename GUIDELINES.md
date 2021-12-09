# Guidelines

## Git

### Branch

We have adopted rules on the use and nomenclature of branches. These rules are inspired from the [Gitflow](https://nvie.com/posts/a-successful-git-branching-model) and [GitHub flow](https://guides.github.com/introduction/flow) workflows.

#### main

This is the main branch of the project containing the most stable version.
This branch is subject to restrictions.

#### develop

This is the secondary branch of the project containing the version under development.
This branch is subject to restrictions.

It is created from and merge in `main`.

#### hotfix/

These branches correspond to the correction of a critical bug.

They are created from and merge in `main`.

#### bugfix/

These branches correspond to the correction of a bug.

They are created from and merge in `develop`.

#### feature/

These branches correspond to the development of a feature or an improvement.

They are created from and merge in `develop`.

#### docs/

These branches correspond to the writing of the documentation.

They are created from and merge in `develop`.

### Commit

We have adopted the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) as our commit message standard. It helps maintain a clear and accurate history of changes made.

The commit message will be structured as follows:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Where elements between `<>` are required and elements between `[]` are optional.

The types are those proposed by Angular: [Commit Message Format Type](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).

The scopes are the names of each project.

## Code Style

The global code style is defined by [ESLint](https://eslint.org/) and [Prettier](prettier.io).

## Variables and properties

Variables and properties must be named following the camelCase format. Their names should describe precisely their purpose, without being too long.

## Functions and methods

Functions and methods must be named following the camelCase format. Their name must start with a verb and describe precisely their purpose.

## Components (React)

Components must be named following the UpperCamelCase format. They must not be exported by default.
