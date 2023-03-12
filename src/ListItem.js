import { useEffect } from 'react';
import classes from './ListItem.module.css';

function swap(a, b) {
	let p1 = a.parentNode,
		p2 = b.parentNode,
		i1,
		i2;

	if (!p1 || !p2 || p1.isEqualNode(b) || p2.isEqualNode(a)) return;

	for (let i = 0; i < p1.children.length; i++) {
		if (p1.children[i].isEqualNode(a)) {
			i1 = i;
		}
	}
	for (let i = 0; i < p2.children.length; i++) {
		if (p2.children[i].isEqualNode(b)) {
			i2 = i;
		}
	}

	if (p1.isEqualNode(p2) && i1 < i2) {
		i2++;
	}
	p1.insertBefore(b, p1.children[i1]);
	p2.insertBefore(a, p2.children[i2]);
}



let clickX, clickY;
let elementBeingDragged = null;
let dummyElement = null;

const ListItem = (props) => {
    const { item } = props;


    useEffect(() => {
        document.addEventListener('mousemove', e => {
            const pointToDrawX = e.clientX - clickX;
            const pointToDrawY = e.clientY - clickY;

            if (elementBeingDragged) {
                elementBeingDragged.style.left = pointToDrawX + 'px';
                elementBeingDragged.style.top = pointToDrawY + 'px';
            }

            const liElements = document.querySelectorAll('.' + classes['list-item']);

            for (let el of liElements) {
                if (el !== elementBeingDragged && !el.classList.contains('dummy')) {
                    const boundingBox = el.getBoundingClientRect();        
                    if (e.clientX >= boundingBox.x && e.clientX <= boundingBox.x + boundingBox.width && e.clientY >= boundingBox.y && e.clientY <= boundingBox.y + boundingBox.height) {
                        if (dummyElement && el) {
                            swap(el, dummyElement)
                        }
                    }
                }

            }
        });

        document.addEventListener('mouseup', () => {
            // At this point we should also update the state. How the hell are we going to do that? How do we know what's happened?
            if (elementBeingDragged && dummyElement) {
                swap(elementBeingDragged, dummyElement);
                elementBeingDragged.style.position = 'static';
                elementBeingDragged.style.width = 'unset';
                
                
                
                
                dummyElement.remove();
                console.log(Array.prototype.indexOf.call(elementBeingDragged.parentNode.children, elementBeingDragged));
                dummyElement = null;
                elementBeingDragged = null;
            }
        });
    }, []);

    const itemDragStarted = e => {

        const element = e.target;
        
        const x = e.pageX - e.currentTarget.offsetLeft; 
        const y = e.pageY - e.currentTarget.offsetTop; 

        clickX = x;
        clickY = y;

        // So you can grab the element
        element.style.position = 'absolute';

        console.log(Array.prototype.indexOf.call(element.parentNode.children, element));
        if (!dummyElement) {
            dummyElement = document.createElement('li');
            dummyElement.classList.add(classes['list-item']);
            dummyElement.classList.add('dummy');
            dummyElement.innerText = 'dummy';
        }

        // Insert the dummy element
        element.parentNode.insertBefore(dummyElement, element);

        element.style.left = e.clientX - x + 'px';
        element.style.top = e.clientY - y + 'px';
        element.style.width = '40%';
        elementBeingDragged = element;
        
        // Find where the li sites
        
    };





    return (
        <li onMouseDown={itemDragStarted} className={classes['list-item']}>{item.text}</li>
    );
};

export default ListItem;