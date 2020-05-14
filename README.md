# pipeline-node-demo

Beispiel einer Pipeline, die folgendes kann:
 - Outdated Check
 - CSS Lint mit `PostCSS` & `stylelint`
 - Tests mit `Jest` & `SuperTest`
 - Security Check mit NodeJsScan
 - Erstellung eines Docker Images

> **Hinweis**: 
> - `stylelint` produziert standardmäßig nur Warnungen, die die Pipeline nicht fehlschlagen lassen. `postcss-reporter` konvertiert die Warnungen zu Fehlern, damit die Pipeline entsprechend reagiert.
> - `NodeJsScan` endet unabhängig vom Ergebnis immer mit Exit Code `0`, damit die Pipeline entsprechend reagiert wurde der Befehl im Folgenden erweitert.

```
name: Standard Pipeline

on:
  push:
  pull_request:

jobs:
  outdated:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: 12.16.3

    - name: npm ci
      run: npm ci

    - name: outdated
      run: npm outdated

  lint:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: 12.16.3
        
    - name: npm ci
      run: npm ci

    - name: outdated
      run: npx postcss styles.css -c .

  test:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: 12.16.3
        
    - name: npm ci
      run: npm ci

    - name: outdated
      run: npm test

  security:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-python@v2
      with:
        python-version: 3.8.2

    - name: pip install nodejsscan
      run: pip install nodejsscan==3.7

    - name: nodejsscan
      run: nodejsscan -f server.js -o report.json && grep -q "\[\]" report.json && echo "Nothing found" || cat report.json && exit 1

    - name: show report
      if:  ${{ success() || failure() }}
      run: cat report.json

    - name: upload report
      if:  ${{ success() || failure() }}
      uses: actions/upload-artifact@v2
      with:
        name: Nodejsscan Security Report
        path: report.json

  docker:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2

    - name: docker build
      run: docker build -t node-demo .
```

## Referenzen
- npm outdated: https://docs.npmjs.com/cli-commands/outdated.html
- PostCSS: https://postcss.org/
- stylelint: https://stylelint.io/
- postcss-reporter: https://github.com/postcss/postcss-reporter
- Jest: https://jestjs.io/
- SuperTest: https://github.com/visionmedia/supertest
- NodeJsScan: https://github.com/ajinabraham/nodejsscan

- Docker Pipeline: https://partner.bdr.de/gitlab/kfe-devops/docker-demo
