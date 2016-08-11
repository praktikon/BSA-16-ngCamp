import {app} from '../index';
import {notFoundComponent} from './notFound/notFound.component.js';
import {userComponent} from './user/user.component.js';
import {trashComponent} from './trash/trash.component.js';
import {rootComponent} from './root/root.component.js';
import {mainComponent} from './main/main.component.js';
import {messageBoardComponent} from './messageBoard/messageBoard.component.js';
import {projectComponent} from './project/project.component.js';
import {checkinsComponent} from './checkins/checkins.component.js';
import {menuComponent} from "./menu/menu.component";
import {commentsComponent} from "./comments/comments.component";
import {reportsComponent} from "./reports/reports.component";
import {eventsComponent} from "./events/events.component.js";
import {eventListComponent} from "./events/eventList.component.js";
import {eventEditComponent} from "./events/eventEdit.component.js";

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
app.component(commentsComponent.selector, commentsComponent);
app.component(reportsComponent.selector, reportsComponent);
app.component(eventEditComponent.selector,eventEditComponent);
app.component(eventListComponent.selector,eventListComponent);