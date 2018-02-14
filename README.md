# Node Web App

 Design a Node web app

## Goal

I want to track some forex rates. Typical use cases:
- Fetch currency rates
- Set forex levels on selected pairs
- Update set forex levels
- Alert when level reaches mark
- Delete set levels

## Setup

- Install angular-cli: npm install -g @angular/cli
- Install express: npm install express body-parser --save
- Install mongo: npm install mongodb --save

## Development

- Given the bootstrapped node server (index.js), create endpoints for **C**reating, **R**eading, **U**pdating and **D**eleting
- Use a **local database** to store forex level objects
- **Simple interface** to set, update, delete forex levels

## Boundaries

- No user authentication
- Limit to 5 set forex levels
- Node version 8.9.0 or higher
- Commit to **(Insert your name)** branch

## Resource

- Use [Fixer API](http://fixer.io/) to fetch Forex rates