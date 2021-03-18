<br />
<p align="center">
  
  <h3 align="center">CodeQL Scanner</h3>

  <p align="center">
    FYP Project ultizing CodeQL for code analysis
    <br />
    <a href="https://github.com/ISnackable/DISMFYP2021GRP8/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github/codeql">CodeQL</a>
    ·
    <a href="https://www.youtube.com/watch?v=Y6PjAaZKNYk">View Demo</a>
    ·
    <a href="#">NILL</a>
</p>


## Dependencies

The following tools should be installed before starting:
* [Visual Studio Code](https://code.visualstudio.com/)
* [CodeQL VSCode Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-codeql)
* [CodeQL](https://github.com/github/codeql)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Clone this repository on the latest version using git and update all submodules to the latest version.
* git
```sh
$ git clone https://github.com/ISnackable/DISMFYP2021GRP8/ --recursive
$ git submodule update --init --remote --recursive
```

### Installation

1. [Download](https://github.com/github/codeql-cli-binaries/releases) the CodeQL CLI zip package.
2. Create a new CodeQL directory where you can place the CLI and any queries and libraries you want to use. For example, `D:/programs/codeql-home`.
3. Extract the zip archive in the CodeQL directory; `D:/Programs/codeql-home/codeql`
4. Add CodeQL to Path.
    1. Go to `Control Panel\System and Security\System`
    2. Click on `Advance System Settings`
    3. Click on `Enviroment Variables`
    4. Edit `Path` for both User variables and System variables
    5. Click on `New` and add the CodeQL directory; `D:/Programs/codeql-home/codeql`

5. Verify your CodeQL CLI setup.

    ```
    $ codeql --help
    ```
6. Download & Install the [CodeQL VSCode Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-codeql).

### Usage

To start trying out the project, follow the steps below.

1. Navigate to the cloned repository directory; for example, `D:/Downloads/DISMFYP2021GRP8`
2. Create a CodeQL databases for the project.

    ```
    $ codeql database create new-database --source-root=src --language=javascript
    ```
3. Open VSCode and click on `Open Workspace...` and select `workspace.code-workspace`.
4. In VSCode, click on the CodeQL Extension tab, and add the CodeQL database; `D:/Downloads/DISMFYP2021GRP8/new-database`.
5. Make sure to click `Set current database` on the database added.
6. Right click and run a custom CodeQL query; `DISMFYP2021GRP8/vscode-codeql-starter/codeql-custom-queries-javascript/example.ql`

## Acknowledgements

- [NodeGoat](https://github.com/OWASP/NodeGoat)
- [vulnerable-node](https://github.com/cr0hn/vulnerable-node)
