import ListItem from './ListItem';
import classes from './ItemList.module.css';

const ItemList = (props) => {
    
    const listOfItems = props.items.map(item => <ListItem item={item} key={item.id} />);
    
    return (
        <ul className={classes['item-list']}>
            {listOfItems}
        </ul>
    );
};

export default ItemList;