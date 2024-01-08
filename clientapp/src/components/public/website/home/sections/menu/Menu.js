import RestaurantMenu from "components/sharedUI/restaurantMenu/RestaurantMenu";
import React from "react";

function Menu({categories,lang,dir}){
    return <React.Fragment>
            <RestaurantMenu categories={categories} blnOnSaveCategory={true} lang={lang} dir={dir} />
    </React.Fragment>
}

export default Menu;