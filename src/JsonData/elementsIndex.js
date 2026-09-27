import OveronElementsCategories from "./OveronElementsCategories.json";
import ElementsGroups from "./ElementsGroups.json";

const groupColorByCategory = new Map(
    ElementsGroups.elementsGroups.map(group => [group.name, group.groupColor])
);

const elementsByName = new Map();

OveronElementsCategories.forEach(category => {
    category.actions.forEach(action => {
        elementsByName.set(action.name.trim().toLowerCase(), {
            ...action,
            category: category.category,
            groupColor: groupColorByCategory.get(category.category)
        });
    });
});

export default elementsByName;