# MunichJS

Installation guide
<br/>
(it is needed because it is not allowed to upload source code of ExtJS to GitHub)

1) Download ExtJS 6 (https://www.sencha.com/products/extjs/evaluate/) and Sencha Cmd 6 (https://www.sencha.com/products/extjs/cmd-download/)
<br/>
2) Install Sencha Cmd 6
<br/>
3) Run command from the root folder of your website:
    sencha --beta -sdk {path to ExtJS 6 sdk}  generate app MunichJS munichJS/
<br/>
4) Copy app, classic, modern, overrides and resources folders into munichJS folder (created at step 3)
<br/>
5) Edit app.json file - override build, classic, modern and css sections with the following:


    "builds": {
        "classic": {
            "toolkit": "classic",
            "theme": "theme-triton",
            "requires": [
                "charts"
            ]
        },

        "modern": {
            "toolkit": "modern",
            "theme": "theme-neptune",
            "requires": [
                "charts"
            ]
        }
    },



    "classic": {
        "js": [

        ]
    },


    "modern": {
        "js": [

        ]
    },



    "css": [
        {
            // this entry uses an ant variable that is the calculated
            // value of the generated output css file for the app,
            // defined in .sencha/app/defaults.properties
            "path": "${build.out.css.path}",
            "bundle": true,
            "exclude": ["fashion"]
        },
        {
            "path": "resources/css/style.css"
        }

    ],
<br/>
6) Run command from munichJS folder
    sencha app build
<br/>
7) munichJS application will be available under:
    http://{your_web_site_url}/munichJS
<br/>
8) Copy munichJS/app/data/meetup.json file to munichJS/build/production/MunichJS/app/data/ folder
<br/>
9) Minified version of your app will be available under:
    http://{your web site url}/munichJS/build/production/MunichJS/