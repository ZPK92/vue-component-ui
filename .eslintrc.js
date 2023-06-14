module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-recommended", //vue3解析 https://eslint.vuejs.org/  多看官网
        "plugin:@typescript-eslint/recommended",
        "@vue/typescript/recommenede" //这个插件 帮忙校验setup语法的
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser":"@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/html-self-closing":"off",
        "vue/max-attributes-per-line":"off",
        "vue/singleline-html-element-content-newline":"off",
        "vue/multi-word-component-names":"off"
    },
    "globals":{
        defineProps:"readonly",
        defineOptions:"readonly"
    }
}
