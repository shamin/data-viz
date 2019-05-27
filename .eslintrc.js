module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "never"
      ]
  },
  "settings": {
    "react": {
      "createClass": "createReactClass", 
      "pragma": "React",
      "version": "detect",
      "flowVersion": "0.53"
    },
    "propWrapperFunctions": [
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  }
};
