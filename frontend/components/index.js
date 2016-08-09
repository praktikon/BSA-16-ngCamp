import {app} from '../index';
import {notFoundComponent} from './notFound.component.js';
import {userComponent} from './user/user.component.js';
import {trashComponent} from './trash/trash.component.js';
import {rootComponent} from './root/root.component.js';
import {mainComponent} from './main/main.component.js';
import {messageBoardComponent} from './messageBoard/messageBoard.component.js';
import {projectComponent} from './project/project.component.js';
import {checkinsComponent} from './checkins/checkins.component.js';
import {menuComponent} from "./menu/menu.component";
import {eventsComponent} from "./events/events.Component";
import {eventEditComponent} from "./events/eventEdit.component";

app.component(messageBoardComponent.selector, messageBoardComponent);
app.component(rootComponent.selector, rootComponent);
app.component(userComponent.selector, userComponent);
app.component(mainComponent.selector, mainComponent);
app.component(trashComponent.selector, trashComponent);
app.component(checkinsComponent.selector, checkinsComponent);
app.component(menuComponent.selector, menuComponent);
app.component(notFoundComponent.selector, notFoundComponent);
app.component(projectComponent.selector, projectComponent);
app.component(eventsComponent.selector, eventsComponent);
app.component(eventEditComponent.selector,eventEditComponent);