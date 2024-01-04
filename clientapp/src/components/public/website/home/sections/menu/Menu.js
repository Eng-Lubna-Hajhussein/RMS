import RestaurantMenu from "components/sharedUI/restaurantMenu/RestaurantMenu";
import React from "react";

const categories = [
    {
        "bigID": 3891922142,
        "strName": "desert",
        "bigParentID": 0,
        "jsnProductInfo": null,
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 3156578173,
        "strName": "steak",
        "bigParentID": 0,
        "jsnProductInfo": null,
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 9723164333,
        "strName": "coffee",
        "bigParentID": 0,
        "jsnProductInfo": null,
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 7087331728,
        "strName": "pizza",
        "bigParentID": 0,
        "jsnProductInfo": null,
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 8129351047,
        "strName": "burger",
        "bigParentID": 0,
        "jsnProductInfo": null,
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 3013919779,
        "strName": "Four Chease Garlic Bread",
        "bigParentID": 3891922142,
        "jsnProductInfo": {
            "strPrice": "9.00",
            "strDescription": "Toested french bread topped with romano\n"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 9559275219,
        "strName": "Rastrami Roll",
        "bigParentID": 3891922142,
        "jsnProductInfo": {
            "strPrice": "16.00",
            "strDescription": "Spreadable cream cheese, blue cheese"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 8033919014,
        "strName": "Caprese Salad Kabobs",
        "bigParentID": 3891922142,
        "jsnProductInfo": {
            "strPrice": "34.00",
            "strDescription": "Cherry-size fresh mozzarella cheese balls"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 8052907570,
        "strName": "Peachy Jalepeno Guacomole",
        "bigParentID": 3891922142,
        "jsnProductInfo": {
            "strPrice": "40.00",
            "strDescription": "Ground cumin, avocados, peeled and cubed"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 1806513103,
        "strName": "Four Chease Garlic Bread",
        "bigParentID": 3156578173,
        "jsnProductInfo": {
            "strPrice": "9.00",
            "strDescription": "Toested french bread topped with romano\n"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 2710287289,
        "strName": "Rastrami Roll",
        "bigParentID": 3156578173,
        "jsnProductInfo": {
            "strPrice": "16.00",
            "strDescription": "Spreadable cream cheese, blue cheese"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 7547915806,
        "strName": "Caprese Salad Kabobs",
        "bigParentID": 3156578173,
        "jsnProductInfo": {
            "strPrice": "34.00",
            "strDescription": "Cherry-size fresh mozzarella cheese balls"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 2818883117,
        "strName": "Peachy Jalepeno Guacomole",
        "bigParentID": 3156578173,
        "jsnProductInfo": {
            "strPrice": "40.00",
            "strDescription": "Ground cumin, avocados, peeled and cubed\n\n"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 5119732624,
        "strName": "Espresso Macchiato",
        "bigParentID": 9723164333,
        "jsnProductInfo": {
            "strPrice": "9.00",
            "strDescription": "Chicken / Apple / Tomatos"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 6976723630,
        "strName": "Mocha Whipped Cream",
        "bigParentID": 9723164333,
        "jsnProductInfo": {
            "strPrice": "16.00",
            "strDescription": "Bacon / Shrimp / Garlic"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 7629450130,
        "strName": "Cold Coffee",
        "bigParentID": 9723164333,
        "jsnProductInfo": {
            "strPrice": "34.00",
            "strDescription": "Pork / Tomatoes / Veggies"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 9177008033,
        "strName": "Caramel Macchiato",
        "bigParentID": 9723164333,
        "jsnProductInfo": {
            "strPrice": "40.00",
            "strDescription": "Prawn / Sausage / Totatos"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    },
    {
        "bigID": 9785069374,
        "strName": "Four Chease Garlic Bread",
        "bigParentID": 7087331728,
        "jsnProductInfo": {
            "strPrice": "9.00",
            "strDescription": "Toested french bread topped with romano"
        },
        "blnWithLimit": 0,
        "dtmFrom": null,
        "dtmTo": null
    }
]

function Menu(){
    return <React.Fragment>
            <RestaurantMenu categories={categories} blnOnSaveCategory={true} />
    </React.Fragment>
}

export default Menu;