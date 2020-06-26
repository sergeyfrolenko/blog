# Aim is create blog

<ul>
  <li>Setting environment</li>
  <li>
    <ol>
      <li> npm init -> package.json </li>
      <li> .gitignore -> node_modules </li>
      <li> ESLint - check correct style code during writing  code 
        <ul>
          <li> npm install --save-dev eslint eslint-plugin-node </li>
          <li> .eslintrc
            <pre>
              {
                "plugins": ["node"],
                "extends": ["eslint:recommended", "plugin:node/recommended"],
                "rules": {
                  "node/exports-style": ["error", "module.exports"],
                  "no-console": 0
                }
              }
            </pre>
          </li>
          <li> write to package.json for eslint, that eslint know what rules use for ckecking
            <pre>
              "engines": {
                "node": ">=8.10.0"
              }
            </pre>
          </li>
        </ul>
      </li>
    </ol>
  </li>
</ul>
 <br>

 <br>
 
